// const express = require('express');
// const router = express.Router();
// const connection = require('../config/db');
// const { authenticateToken } = require('../middleware/auth');

// // Ajout d'un sujet d'examen (accessible aux enseignants)
// router.post('/', authenticateToken, (req, res) => {
//   if (req.user.role !== 'teacher') {
//     return res.status(403).json({ message: 'Accès refusé' });
//   }
//   const { title, description, fileUrl } = req.body;
//   if (!title || !description) {
//     return res.status(400).json({ message: 'Le titre et la description sont requis.' });
//   }
//   const query = "INSERT INTO exams (title, description, file_url, teacher_id) VALUES (?, ?, ?, ?)";
//   connection.query(query, [title, description, fileUrl || null, req.user.id], (err, results) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ message: 'Erreur base de données' });
//     }
//     res.json({ message: 'Sujet ajouté', examId: results.insertId });
//   });
// });

// // Récupération de tous les sujets d'examen (pour les étudiants)
// router.get('/', authenticateToken, (req, res) => {
//   const query = "SELECT * FROM exams";
//   connection.query(query, (err, results) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ message: 'Erreur base de données' });
//     }
//     res.json(results);
//   });
// });

// module.exports = router;


// routes/exams.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const multer = require('multer');

// Configuration de multer pour l'upload des sujets d'examen
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

// Création d'un examen : POST /api/exams
router.post('/', upload.single('sujetPdf'), async (req, res) => {
  const { matiere, sujetText, submissionDeadline, teacher_id } = req.body;
  const file = req.file;
  const exam_pdf_path = file ? file.path : null;
  try {
    const query = `
      INSERT INTO exams (subject, exam_text, exam_pdf_path, submission_deadline, teacher_id)
      VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [matiere, sujetText, exam_pdf_path, submissionDeadline, teacher_id];
    const result = await pool.query(query, values);
    // Vous pouvez déclencher ici la génération du corrigé type via DeepSeek si nécessaire
    res.status(200).json({ success: true, examId: result.rows[0].id, exam: result.rows[0] });
  } catch (error) {
    console.error('Erreur lors de la création de l\'examen:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

// Récupération des détails d'un examen : GET /api/exams/details/:examId
router.get('/details/:examId', async (req, res) => {
  const { examId } = req.params;
  try {
    const result = await pool.query('SELECT * FROM exams WHERE id = $1', [examId]);
    if (result.rows.length > 0) {
      const exam = result.rows[0];
      res.json({
        time: Math.floor((new Date(exam.submission_deadline) - new Date()) / 1000),
        subject: {
          type: exam.exam_pdf_path ? 'pdf' : 'text',
          content: exam.exam_pdf_path || exam.exam_text,
        },
      });
    } else {
      res.status(404).json({ message: "Examen non trouvé" });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des détails:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
