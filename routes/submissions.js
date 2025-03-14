const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const { authenticateToken } = require('../middleware/auth');

// Soumission d'une réponse d'examen par un étudiant
router.post('/', authenticateToken, (req, res) => {
  if (req.user.role !== 'student') {
    return res.status(403).json({ message: 'Accès refusé' });
  }
  const { examId, fileUrl } = req.body;
  if (!examId || !fileUrl) {
    return res.status(400).json({ message: 'ExamId et fileUrl sont requis.' });
  }
  const query = "INSERT INTO submissions (exam_id, student_id, file_url) VALUES (?, ?, ?)";
  connection.query(query, [examId, req.user.id, fileUrl], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erreur base de données' });
    }
    res.json({ message: 'Soumission reçue', submissionId: results.insertId });
  });
});

// Récupération des soumissions pour un examen donné (accessible aux enseignants)
router.get('/exam/:examId', authenticateToken, (req, res) => {
  if (req.user.role !== 'teacher') {
    return res.status(403).json({ message: 'Accès refusé' });
  }
  const examId = req.params.examId;
  const query = "SELECT * FROM submissions WHERE exam_id = ?";
  connection.query(query, [examId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erreur base de données' });
    }
    res.json(results);
  });
});

module.exports = router;
