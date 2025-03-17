// const express = require('express');
// const router = express.Router();
// const connection = require('../config/db');
// const { authenticateToken } = require('../middleware/auth');
// const multer = require('multer');
// const path = require('path');

// // 📂 Configuration de Multer pour stocker les fichiers PDF
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // 📁 Dossier où stocker les fichiers
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Nom unique du fichier
//   }
// });

// const upload = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype === 'application/pdf') {
//       cb(null, true);
//     } else {
//       cb(new Error('Seuls les fichiers PDF sont autorisés !'), false);
//     }
//   }
// });

// //Soumission d'une réponse d'examen par un étudiant
// router.post('/', authenticateToken, upload.single('pdfFile'), (req, res) => {
//   if (req.user.role !== 'student') {
//     return res.status(403).json({ message: 'Accès refusé' });
//   }
  
//   const { examId } = req.body;
//   if (!examId || !req.file) {
//     return res.status(400).json({ message: 'ExamId et un fichier PDF sont requis.' });
//   }

//   const fileUrl = `/uploads/${req.file.filename}`;

//   const query = "INSERT INTO submissions (exam_id, student_id, file_url) VALUES (?, ?, ?)";
//   connection.query(query, [examId, req.user.id, fileUrl], (err, results) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ message: 'Erreur base de données' });
//     }
//     res.json({ message: 'Soumission reçue', fileUrl, submissionId: results.insertId });
//   });
// });

// //Récupération des soumissions pour un examen donné (accessible aux enseignants)
// router.get('/exam/:examId', authenticateToken, (req, res) => {
//   if (req.user.role !== 'teacher') {
//     return res.status(403).json({ message: 'Accès refusé' });
//   }

//   const examId = req.params.examId;
//   const query = "SELECT * FROM submissions WHERE exam_id = ?";
//   connection.query(query, [examId], (err, results) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ message: 'Erreur base de données' });
//     }
//     res.json(results);
//   });
// });

// module.exports = router;


// routes/submissions.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const pool = require('../config/db');

// Configuration de multer pour l'upload des copies
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Soumission d'une copie : POST /api/etudiants/submit
router.post('/submit', upload.single('file'), async (req, res) => {
  const { name, className, examId } = req.body;
  const file = req.file;
  try {
    const query = `
      INSERT INTO submissions (exam_id, student_name, student_class, file_path)
      VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [examId, name, className, file ? file.path : null];
    const result = await pool.query(query, values);
    // Vous pouvez déclencher un job pour lancer en arrière-plan la correction automatique
    res.status(200).json({ success: true, submission: result.rows[0] });
  } catch (error) {
    console.error('Erreur lors de la soumission:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

// Récupération des résultats (toutes les soumissions) : GET /api/etudiants/results
router.get('/results', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM submissions ORDER BY submitted_at DESC');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des résultats:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
