import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Conges from './pages/Conges';
import Employes from './pages/Employes'; // Renommé de Utilisateurs à Employes
import CertificatsPage from './pages/CertificatsPage';
import { ThemeProvider, useTheme } from './styles/ThemeContext';

const AppContent = () => {
    const { darkMode } = useTheme();

    return (
        <div style={{ background: darkMode ? '#333' : '#fff', color: darkMode ? '#fff' : '#000', minHeight: '100vh' }}>
            <Router>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/conges" element={<Conges />} />
                    <Route path="/employes" element={<Employes />} /> {/* Route mise à jour */}
                    <Route path="/certificats" element={<CertificatsPage />} />
                </Routes>
            </Router>
        </div>
    );
};

const App = () => {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
};

export default App;