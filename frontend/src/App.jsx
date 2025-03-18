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
