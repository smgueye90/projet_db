// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/AuthPage";
import TeacherDashboard from "./pages/TeacherDashboard";
import ExamPage from "./pages/ExamPage";
import ResultsPage from "./pages/ResultsPage";
import EtudientsPage from "./pages/EtudientsPage";

import ProtectedRoute from "./ProtectedRoute"; // Le composant créé plus haut

function App() {
  // État pour savoir si le prof est connecté
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Cette fonction sera appelée quand le prof se connecte avec succès
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  // Cette fonction pourra être appelée si on veut déconnecter l'utilisateur
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // return (
  //   <Router>
  //     <Routes>
  //       {/*
  //         Page de connexion : 
  //         on transmet la fonction handleLoginSuccess en prop pour la déclencher
  //         quand le login est validé côté AuthPage.jsx
  //       */}
  //       <Route
  //         path="/connexion"
  //         element={<HomePage onLoginSuccess={handleLoginSuccess} />}
  //       />

  //       {/*
  //         Page étudient (publique) : pas besoin d'authentification
  //       */}
  //       <Route
  //         path="/etudients/:examId"
  //         element={<EtudientsPage />}
  //       />

  //       {/*
  //         Routes réservées au professeur : protégées par ProtectedRoute
  //         Si isAuthenticated === false, redirection automatique vers /connexion
  //       */}
  //       <Route
  //         path="/teacher-dashboard"
  //         element={
  //           <ProtectedRoute isAuthenticated={isAuthenticated}>
  //             <TeacherDashboard onLogout={handleLogout} />
  //           </ProtectedRoute>
  //         }
  //       />
  //       <Route
  //         path="/exam"
  //         element={
  //           <ProtectedRoute isAuthenticated={isAuthenticated}>
  //             <ExamPage />
  //           </ProtectedRoute>
  //         }
  //       />
  //       <Route
  //         path="/results"
  //         element={
  //           <ProtectedRoute isAuthenticated={isAuthenticated}>
  //             <ResultsPage />
  //           </ProtectedRoute>
  //         }
  //       />

  //       {/*
  //         Route par défaut : on peut renvoyer vers teacher-dashboard si connecté,
  //         ou vers /connexion sinon. Ici on la protège aussi pour le prof.
  //       */}
  //       <Route
  //         path="/"
  //         element={
  //           <ProtectedRoute isAuthenticated={isAuthenticated}>
  //             <TeacherDashboard />
  //           </ProtectedRoute>
  //         }
  //       />
  //     </Routes>
  //   </Router>
  // );

  return (
    <Router>
      <Routes>
        <Route path="/connexion" element={<HomePage />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/" element={<TeacherDashboard />} />
        <Route path="/exam" element={<ExamPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/etudients/:examId" element={<EtudientsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
