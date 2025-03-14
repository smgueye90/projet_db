const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const { authenticateToken } = require('../middleware/auth');

// Ajout d'un sujet d'examen (accessible aux enseignants)
router.post('/', authenticateToken, (req, res) => {
  if (req.user.role !== 'teacher') {
    return res.status(403).json({ message: 'Accès refusé' });
  }
  const { title, description, fileUrl } = req.body;
  if (!title || !description) {
    return res.status(400).json({ message: 'Le titre et la description sont requis.' });
  }
  const query = "INSERT INTO exams (title, description, file_url, teacher_id) VALUES (?, ?, ?, ?)";
  connection.query(query, [title, description, fileUrl || null, req.user.id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erreur base de données' });
    }
    res.json({ message: 'Sujet ajouté', examId: results.insertId });
  });
});

// Récupération de tous les sujets d'examen (pour les étudiants)
router.get('/', authenticateToken, (req, res) => {
  const query = "SELECT * FROM exams";
  connection.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erreur base de données' });
    }
    res.json(results);
  });
});

module.exports = router;
