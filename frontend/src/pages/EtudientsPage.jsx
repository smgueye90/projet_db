import React, { useState, useEffect } from 'react';
import axios from 'axios'; // <-- Import d'axios
import { Card, CardContent, Button, TextField, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function ExamSubmissionPage() {
  const { examId } = useParams(); 
  // examId peut servir à identifier l’examen spécifique (si besoin)
  
  const [step, setStep] = useState('info'); // info, exam, or submitted
  const [studentInfo, setStudentInfo] = useState({ name: '', className: '' });
  const [timeLeft, setTimeLeft] = useState(0); // Temps récupéré du planificateur
  const [examSubject, setExamSubject] = useState(null); // Sujet récupéré du planificateur
  const [submission, setSubmission] = useState(null);

  // Fonction pour récupérer les détails depuis le planificateur
  const fetchExamDetails = async () => {
    try {
      // Exemple d'appel GET à l'API
      const response = await axios.get(`http://localhost:5000/api/planificateur/exam-details/${examId}`);
      const data = response.data;

      // Mise à jour des détails de l'examen
      setTimeLeft(data.time);
      setExamSubject(data.subject);
    } catch (error) {
      console.error('Erreur lors de la récupération des détails de l’examen :', error);
      alert('Impossible de récupérer les détails de l’examen.');
    }
  };

  useEffect(() => {
    // Récupérer les détails de l'examen au chargement de la page
    fetchExamDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (step === 'exam' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, step]);

  const handleStartExam = () => {
    if (studentInfo.name && studentInfo.className) {
      if (examSubject && timeLeft > 0) {
        setStep('exam');
      } else {
        alert('Les détails de l’examen ne sont pas disponibles.');
      }
    } else {
      alert('Veuillez entrer votre nom et votre classe.');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSubmission(file);
  };

  const handleSubmit = async () => {
    if (submission) {
      try {
        // On construit un FormData pour envoyer le fichier
        const formData = new FormData();
        formData.append('file', submission);
        formData.append('name', studentInfo.name);
        formData.append('className', studentInfo.className);
        formData.append('examId', examId);

        // Appel POST pour la soumission
        await axios.post('http://localhost:5000/api/etudiants/submit', formData);

        alert('Votre travail a été soumis avec succès !');
        setStep('submitted');
      } catch (error) {
        console.error('Erreur lors de la soumission :', error);
        alert('Une erreur est survenue lors de la soumission de votre travail.');
      }
    } else {
      alert('Veuillez télécharger votre travail avant de soumettre.');
    }
  };

  return (
    <Card sx={{ maxWidth: 600, margin: '2rem auto', padding: '1rem', borderRadius: '12px', boxShadow: 3 }}>
      <CardContent>
        {step === 'info' && (
          <div>
            <Typography variant="h5" align="center" gutterBottom>
              Informations de l'étudiant
            </Typography>
            <TextField
              label="Nom"
              fullWidth
              margin="normal"
              value={studentInfo.name}
              onChange={(e) => setStudentInfo({ ...studentInfo, name: e.target.value })}
            />
            <TextField
              label="Classe"
              fullWidth
              margin="normal"
              value={studentInfo.className}
              onChange={(e) => setStudentInfo({ ...studentInfo, className: e.target.value })}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleStartExam}
              sx={{ marginTop: '1rem' }}
            >
              Commencer l'examen
            </Button>
          </div>
        )}

        {step === 'exam' && timeLeft > 0 && (
          <div>
            <Typography variant="h5" align="center" gutterBottom>
              Sujet de l'examen
            </Typography>
            {examSubject?.type === 'pdf' ? (
              <a
                href={examSubject.content}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'block', marginBottom: '1rem', color: 'blue' }}
              >
                Télécharger le sujet
              </a>
            ) : (
              <Typography>{examSubject?.content}</Typography>
            )}
            <Typography align="right" color="textSecondary">
              Temps restant : {Math.floor(timeLeft / 60)} minutes {timeLeft % 60} secondes
            </Typography>
            <Typography variant="body1" gutterBottom>
              Déposez votre travail ci-dessous :
            </Typography>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              style={{ marginBottom: '1rem' }}
            />
            {submission && (
              <Typography variant="body2" color="textSecondary">
                Fichier sélectionné : {submission.name}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
              sx={{ marginTop: '1rem' }}
            >
              Soumettre le travail
            </Button>
          </div>
        )}

        {step === 'exam' && timeLeft <= 0 && (
          <div>
            <Typography variant="h5" align="center" gutterBottom>
              Temps écoulé
            </Typography>
            <Typography variant="body1" color="error" gutterBottom>
              Vous ne pouvez plus soumettre votre travail. Le délai est expiré.
            </Typography>
          </div>
        )}

        {step === 'submitted' && (
          <div>
            <Typography variant="h5" align="center" gutterBottom>
              Travail soumis
            </Typography>
            <Typography gutterBottom>
              Merci, {studentInfo.name}, pour votre soumission. Bonne chance !
            </Typography>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
