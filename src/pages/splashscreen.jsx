// src/components/SplashScreen.jsx
import React from 'react';
import '../styles/pages/splashscreen.css';

const SplashScreen = () => {
    return (
        <div className="splash-screen">
            <div className="splash-logo">
                {/* Agrega aquí un logo, ícono, o cualquier mensaje */}
                <h1>PROphysio</h1>
            </div>
            <p>Cargando...</p>
        </div>
    );
};

export default SplashScreen;