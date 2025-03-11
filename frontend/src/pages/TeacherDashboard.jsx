import React from 'react';

const TeacherDashboard = () => {
    return (
        <div>
            <h1>Tableau de bord Enseignant</h1>
            <section>
                <h2>Planifier un Examen</h2>
                <form>
                    <label htmlFor="examName">Nom de l'examen:</label>
                    <input type="text" id="examName" name="examName" required />
                    <label htmlFor="examDate">Date de l'examen:</label>
                    <input type="date" id="examDate" name="examDate" required />
                    <label htmlFor="examDuration">Durée (en minutes):</label>
                    <input type="number" id="examDuration" name="examDuration" required />
                    <button type="submit">Planifier l'examen</button>
                </form>
            </section>
        </div>
    );
};

export default TeacherDashboard;