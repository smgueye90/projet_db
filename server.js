const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Import des routes
const authRoutes = require('./routes/auth');
const examRoutes = require('./routes/exams');
const submissionRoutes = require('./routes/submissions');

// Définition des endpoints
app.use('/api/auth', authRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/uploads', express.static('uploads'));


app.get('/', (req, res) => {
  res.send("Plateforme de gestion d'examens - Backend");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
