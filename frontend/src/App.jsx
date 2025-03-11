import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TeacherDashboard from './pages/TeacherDashboard';
import ExamPage from './pages/ExamPage';
import ResultsPage from './pages/ResultsPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
                <Route path="/exam" element={<ExamPage />} />
                <Route path="/results" element={<ResultsPage />} />
            </Routes>
        </Router>
    );
};

export default App;