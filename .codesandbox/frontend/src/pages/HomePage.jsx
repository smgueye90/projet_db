// import React from "react";
// import { Link } from "react-router-dom";

// const HomePage = () => {
//   return (
//     <div>
//       <h1>Bienvenue sur la Plateforme de Gestion des Examens</h1>
//       <section>
//         <h2>Connexion</h2>
//         <form>
//           <label htmlFor="username">Nom d'utilisateur:</label>
//           <input type="text" id="username" name="username" required />
//           <label htmlFor="password">Mot de passe:</label>
//           <input type="password" id="password" name="password" required />
//           <button type="submit">Se connecter</button>
//         </form>
//       </section>
//       {/* <nav>
//                 <Link to="/teacher-dashboard">Tableau de bord Enseignant</Link> |{' '}
//                 <Link to="/exam">Passer un Examen</Link>
//             </nav> */}
//     </div>
//   );
// };

// export default HomePage;
// pages/HomePage.jsx
import * as React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const providers = [{ id: "credentials", name: "Email and Password" }];

const signIn = async (provider, formData, navigate) => {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      alert(
        `Signing in with "${provider.name}" and credentials: ${formData.get("email")}, ${formData.get("password")}`
      );
      resolve();
      navigate("/teacher-dashboard"); // Redirection vers le tableau de bord
    }, 300);
  });
  return promise;
};

export default function CredentialsSignInPage() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <AppProvider theme={theme}>
      <SignInPage
        signIn={(provider, formData) => signIn(provider, formData, navigate)}
        providers={providers}
        slotProps={{
          emailField: { autoFocus: false },
          form: { noValidate: true },
        }}
      />
    </AppProvider>
  );
}
