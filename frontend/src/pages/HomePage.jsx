import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div>
            <h1>Bienvenue sur la Plateforme de Gestion des Examens</h1>
            <section>
                <h2>Connexion</h2>
                <form>
                    <label htmlFor="username">Nom d'utilisateur:</label>
                    <input type="text" id="username" name="username" required />
                    <label htmlFor="password">Mot de passe:</label>
                    <input type="password" id="password" name="password" required />
                    <button type="submit">Se connecter</button>
                </form>
            </section>
            <nav>
                <Link to="/teacher-dashboard">Tableau de bord Enseignant</Link> |{' '}
                <Link to="/exam">Passer un Examen</Link>
            </nav>
        </div>
    );
};

export default HomePage;