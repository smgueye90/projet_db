import React from 'react';

const Dashboard = ({ userType }) => {
    return (
        <div>
            <h1>Tableau de bord {userType === 'teacher' ? 'Enseignant' : 'Étudiant'}</h1>
            {userType === 'teacher' && (
                <section>
                    <h2>Examens Planifiés</h2>
                    <ul>
                        <li>Examen de Mathématiques - 2023-10-15</li>
                        <li>Examen de Physique - 2023-10-20</li>
                    </ul>
                </section>
            )}
            {userType === 'student' && (
                <section>
                    <h2>Mes Résultats</h2>
                    <ul>
                        <li>Mathématiques: 85/100</li>
                        <li>Physique: 90/100</li>
                    </ul>
                </section>
            )}
        </div>
    );
};

export default Dashboard;