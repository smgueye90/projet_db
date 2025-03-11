import React from 'react';
import { useLocation } from 'react-router-dom';

const ResultsPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const score = searchParams.get('score');

    return (
        <div>
            <h1>Résultats de l'Examen</h1>
            <section>
                <h2>Vos Résultats</h2>
                <p>Score: <span id="score">{score}</span>/100</p>
                <p>Statut: <span id="status">{score >= 50 ? 'Réussi' : 'Échoué'}</span></p>
            </section>
        </div>
    );
};

export default ResultsPage;