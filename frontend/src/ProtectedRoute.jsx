// src/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    // Si l'utilisateur n'est pas connecté, on le redirige vers la page de connexion
    return <Navigate to="/connexion" replace />;
  }
  // Sinon, on affiche la page protégée
  return children;
}
