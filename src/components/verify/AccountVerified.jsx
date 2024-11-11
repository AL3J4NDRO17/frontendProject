import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/verifyAccount/accountVerified.css"; // Asegúrate de tener este archivo CSS

function AccountVerified() {
    const navigate = useNavigate();

    useEffect(() => {
        // Redirige al usuario al login después de 3 segundos
        const timer = setTimeout(() => {
            navigate('/login');
        }, 3000);

        // Limpiar el temporizador cuando se desmonta el componente
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="account-verified-container">
            <img src="/path/to/success-image.png" alt="Success" className="account-verified-image" />
            <h1 className="account-verified-title">¡Cuenta verificada con éxito!</h1>
            <p className="account-verified-message">
                Serás redirigido al inicio de sesión en unos momentos. ¡Gracias por verificar tu cuenta!
            </p>
        </div>
    );
}

export default AccountVerified;
