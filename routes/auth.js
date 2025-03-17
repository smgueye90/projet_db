// const express = require('express');
// const router = express.Router();
// const connection = require('../config/db');
// const jwt = require('jsonwebtoken');
// const { secret } = require('../middleware/auth');
// const bcrypt = require('bcrypt');

// // Enregistrement d'un utilisateur
// router.post('/register', async (req, res) => {
//   const { username, password, role } = req.body; // role : 'teacher' ou 'student'
//   if (!username || !password || !role) {
//     return res.status(400).json({ message: 'Veuillez fournir username, password et role.' });
//   }
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const query = "INSERT INTO users (username, password, role) VALUES (?, ?, ?)";
//     connection.query(query, [username, hashedPassword, role], (err, results) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ message: 'Erreur base de données' });
//       }
//       res.json({ message: 'Utilisateur enregistré avec succès' });
//     });
//   } catch (err) {
//     res.status(500).json({ message: 'Erreur lors de l’enregistrement' });
//   }
// });

// // Connexion
// router.post('/login', (req, res) => {
//   const { username, password } = req.body;
//   const query = "SELECT * FROM users WHERE username = ?";
//   connection.query(query, [username], async (err, results) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ message: 'Erreur base de données' });
//     }
//     if (results.length === 0) {
//       return res.status(400).json({ message: 'Utilisateur non trouvé' });
//     }
//     const user = results[0];
//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword) {
//       return res.status(400).json({ message: 'Mot de passe invalide' });
//     }
//     // Création du token JWT
//     const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, secret, { expiresIn: '1h' });
//     res.json({ token });
//   });
// });

// module.exports = router;


// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../config/db');

// Endpoint d'inscription : POST /api/auth/register
router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const query = `
      INSERT INTO users (email, password, role, name)
      VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [email, hashedPassword, 'teacher', name];
    const result = await pool.query(query, values);
    res.status(201).json({ success: true, user: result.rows[0] });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

// Endpoint de connexion : POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        // Vous pouvez générer un token JWT ici pour sécuriser les endpoints réservés
        return res.status(200).json({ success: true, userId: user.id });
      }
    }
    res.status(401).json({ success: false, message: 'Identifiants invalides' });
  } catch (error) {
    console.error('Erreur lors du login:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

module.exports = router;
