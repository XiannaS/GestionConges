import React from 'react';
import '../styles/Button.css'; // Chemin relatif pour le fichier CSS

const Button = ({ label, onClick, type = 'button', className = '' }) => {
    return (
        <button type={type} className={`custom-button ${className}`} onClick={onClick}>
            {label}
        </button>
    );
};

export default Button;
