const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const jwt = require('jsonwebtoken');
const { secret } = require('../middleware/auth');
const bcrypt = require('bcrypt');

// Enregistrement d'un utilisateur
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body; // role : 'teacher' ou 'student'
  if (!username || !password || !role) {
    return res.status(400).json({ message: 'Veuillez fournir username, password et role.' });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = "INSERT INTO users (username, password, role) VALUES (?, ?, ?)";
    connection.query(query, [username, hashedPassword, role], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erreur base de données' });
      }
      res.json({ message: 'Utilisateur enregistré avec succès' });
    });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de l’enregistrement' });
  }
});

// Connexion
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT * FROM users WHERE username = ?";
  connection.query(query, [username], async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erreur base de données' });
    }
    if (results.length === 0) {
      return res.status(400).json({ message: 'Utilisateur non trouvé' });
    }
    const user = results[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Mot de passe invalide' });
    }
    // Création du token JWT
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, secret, { expiresIn: '1h' });
    res.json({ token });
  });
});

module.exports = router;
