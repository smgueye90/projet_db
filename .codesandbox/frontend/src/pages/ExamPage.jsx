import React from 'react';
import { useNavigate } from 'react-router-dom';

const ExamPage = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simuler un score (à remplacer par une logique réelle)
        const score = 85;
        navigate(`/results?score=${score}`);
    };

    return (
        <div>
            <h1>Examen en Ligne</h1>
            <section>
                <h2>Examen de Mathématiques</h2>
                <form onSubmit={handleSubmit}>
                    <div className="question">
                        <p>1. Quelle est la racine carrée de 16?</p>
                        <input type="radio" name="q1" value="4" /> 4<br />
                        <input type="radio" name="q1" value="5" /> 5<br />
                        <input type="radio" name="q1" value="6" /> 6<br />
                    </div>
                    <div className="question">
                        <p>2. Combien font 2 + 2?</p>
                        <input type="radio" name="q2" value="3" /> 3<br />
                        <input type="radio" name="q2" value="4" /> 4<br />
                        <input type="radio" name="q2" value="5" /> 5<br />
                    </div>
                    <button type="submit">Soumettre l'examen</button>
                </form>
            </section>
        </div>
    );
};

export default ExamPage;