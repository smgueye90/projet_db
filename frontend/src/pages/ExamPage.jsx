import * as React from "react";
import { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import LogoutIcon from '@mui/icons-material/Logout';
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import { Card, CardContent, Button, TextField, Typography } from '@mui/material';
import axios from 'axios'; // <-- Import d'axios

const NAVIGATION = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "teacher-dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "exam",
    title: "Examen",
    icon: <DescriptionIcon />,
  },
  {
    segment: "results",
    title: "Notes",
    icon: <DescriptionIcon />,
  },
  {
    segment: "connexion",
    title: "Deconnexion",
    icon: <LogoutIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function ExamForm({ onSubmit }) {
  const [examDetails, setExamDetails] = useState({
    matiere: '',
    sujetPdf: '',
    submissionDeadline: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExamDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setExamDetails((prevDetails) => ({
      ...prevDetails,
      sujetPdf: file,
    }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(examDetails);
      }}
    >
      <TextField
        label="Matière"
        name="matiere"
        value={examDetails.matiere}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />

      <Typography variant="body2" color="textSecondary" gutterBottom>
        Téléverser un fichier PDF :
      </Typography>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        style={{ marginBottom: '1rem' }}
      />

      <TextField
        label="Délai de soumission"
        name="submissionDeadline"
        type="datetime-local"
        value={examDetails.submissionDeadline}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />

      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: '1rem' }}>
        Planifier l'examen
      </Button>
    </form>
  );
}

function ExamDetails({ examDetails }) {
  const [examLink, setExamLink] = useState('');

  // Génération d’un lien local (ex : /etudients/xxx) ou récupération depuis le backend
  // On suppose ici qu’on a reçu un examId depuis la réponse du backend
  useEffect(() => {
    if (examDetails.examId) {
      // exemple : /etudients/:examId
      setExamLink(`/etudients/${examDetails.examId}`);
    }
  }, [examDetails]);

  const handleShareLink = () => {
    if (examLink) {
      navigator.clipboard.writeText(window.location.origin + examLink);
      alert("Lien d'examen copié dans le presse-papiers !");
    } else {
      alert("Lien d'examen introuvable !");
    }
  };

  return (
    <div>
      <Typography variant="h6" align="center" gutterBottom>
        Détails de l'examen planifié
      </Typography>
      <Typography>
        <strong>Matière :</strong> {examDetails.matiere}
      </Typography>
      {examDetails.sujetText && (
        <Typography>
          <strong>Sujet (texte) :</strong> {examDetails.sujetText}
        </Typography>
      )}
      {examDetails.sujetPdf && (
        <Typography>
          <strong>Sujet (PDF) :</strong>{' '}
          <a
            href={URL.createObjectURL(examDetails.sujetPdf)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Télécharger le sujet
          </a>
        </Typography>
      )}
      <Typography>
        <strong>Délai de soumission :</strong> {examDetails.submissionDeadline}
      </Typography>

      <Button
        onClick={handleShareLink}
        variant="contained"
        color="secondary"
        fullWidth
        sx={{ marginTop: '1rem' }}
      >
        Partager le lien d'examen
      </Button>
    </div>
  );
}

function DemoPageContent({ pathname }) {
  const [examDetails, setExamDetails] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [cardHeight, setCardHeight] = useState(window.innerHeight * 0.8); // 80% de la hauteur de la fenêtre

  const handleResize = () => {
    setCardHeight(window.innerHeight * 0.8);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSubmit = async (details) => {
    try {
      // Construction d’un FormData pour inclure le fichier PDF
      const formData = new FormData();
      formData.append('matiere', details.matiere);
      if (details.sujetPdf) {
        formData.append('sujetPdf', details.sujetPdf);
      }
      formData.append('submissionDeadline', details.submissionDeadline);

      // Appel POST vers le backend pour planifier l’examen
      const response = await axios.post('http://localhost:3000/api/exams', formData);

      // On récupère l’ID généré (par exemple)
      const examId = response.data.examId;

      setExamDetails({
        ...details,
        examId, // on stocke l’ID pour générer le lien
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Erreur lors de la planification de l’examen :', error);
      alert('Une erreur est survenue lors de la planification de l’examen.');
    }
  };

  const resetForm = () => {
    setExamDetails({});
    setSubmitted(false);
  };

  return (
    <Card
      sx={{
        maxWidth: 600,
        margin: '2rem auto',
        padding: '1rem',
        borderRadius: '12px',
        boxShadow: 3,
        maxHeight: `${cardHeight}px`,
        overflow: 'hidden',
      }}
    >
      <CardContent
        sx={{
          maxHeight: `${cardHeight - 50}px`,
          overflowY: 'auto',
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Planification d'un examen
        </Typography>
        {!submitted ? (
          <ExamForm onSubmit={handleSubmit} />
        ) : (
          <ExamDetails examDetails={examDetails} onReset={resetForm} />
        )}
      </CardContent>
    </Card>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigationClick = (item) => {
    if (item.segment) {
      navigate(`/${item.segment}`);
    }
  };

  return (
    <AppProvider
      navigation={NAVIGATION.map((item) => ({
        ...item,
        onClick: () => handleNavigationClick(item),
      }))}
      branding={{
        title: "Dashboard",
      }}
      theme={demoTheme}
    >
      <DashboardLayout>
        <Routes>
          <Route path="/exam" element={<DemoPageContent pathname={location.pathname} />} />
          <Route path="/" element={<DemoPageContent pathname={location.pathname} />} />
          <Route path="*" element={<Typography variant="h4">Page non trouvée</Typography>} />
        </Routes>
      </DashboardLayout>
    </AppProvider>
  );
}

export default App;
