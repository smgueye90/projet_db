const jwt = require('jsonwebtoken');
const secret = 'Babaking240202@@'; // Changez cette clé secrète

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token absent' });
  
  jwt.verify(token, secret, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token invalide' });
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken, secret };
