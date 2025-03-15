// AuthPage.jsx
import React from 'react';
import axios from 'axios';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// On récupère onLoginSuccess en prop
export default function CredentialsSignInPage({ onLoginSuccess }) {
  const theme = useTheme();
  const navigate = useNavigate();

  const providers = [{ id: 'credentials', name: 'Email and password' }];

  const signIn = async (provider, formData) => {
    try {
      const email = formData?.get('email');
      const password = formData?.get('password');

      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      if (response.status === 200 && response.data.success) {
        // Connexion validée côté serveur
        // On informe App.jsx qu'on est authentifié
        onLoginSuccess();

        // Redirection vers la page TeacherDashboard
        navigate('/teacher-dashboard');
      } else {
        // Gérer l'erreur
        return {
          type: 'CredentialsSignin',
          error: 'Identifiants invalides.',
        };
      }
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      return {
        type: 'CredentialsSignin',
        error: 'Une erreur est survenue lors de la connexion.',
      };
    }
  };

  return (
    <AppProvider theme={theme}>
      <SignInPage
        signIn={(provider, formData) => signIn(provider, formData)}
        providers={providers}
        slotProps={{ emailField: { autoFocus: false }, form: { noValidate: true } }}
      />
    </AppProvider>
  );
}
