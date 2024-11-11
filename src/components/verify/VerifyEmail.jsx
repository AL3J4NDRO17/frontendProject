import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "../../styles/verifyAccount/verifyAccount.css";


import { verifyEmail } from '../../services/authService';


function VerifyEmail() {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email;
    const query = new URLSearchParams(location.search);
    const token = query.get('token');
    const [isResending, setIsResending] = useState(false);

    useEffect(() => {
        const verifyAccount = async () => {
            try {
                await axios.get(`http://localhost:5000/api/auth/verify/${token}`);
                navigate('/account-verified');
            } catch (error) {
                toast.error("Error al verificar la cuenta. El token puede ser inválido o haber expirado.");
            }
        };

        if (token) {
            verifyAccount();
        }
    }, [token, navigate]);

    const handleResendEmail = async () => {
        setIsResending(true);
        try {
            await axios.post('http://localhost:5000/api/auth/resend-verification', { email });
            toast.success("Correo de verificación reenviado. Por favor revisa tu bandeja de entrada.");
        } catch (error) {
            toast.error("Error al reenviar el correo de verificación.");
        } finally {
            setIsResending(false);
        }
    };

    return (
        <div className="verify-email-container">
            <img src="/path/to/envelope-image.png" alt="Email Verification" className="verify-email-image" />
            <h1 className="verify-email-title">Verifica tu correo para finalizar el registro</h1>
            <p className="verify-email-message">
                Gracias por registrarte. Confirma que <strong>{email}</strong> es tu dirección de correo
                electrónico haciendo clic en el enlace del correo que te hemos enviado. Si no has recibido el correo,
                puedes reenviarlo utilizando el botón de abajo.
            </p>
            <button
                onClick={handleResendEmail}
                className="resend-email-button"
                disabled={isResending}
            >
                {isResending ? "Reenviando..." : "Reenviar correo de verificación"}
            </button>
        </div>
    );
}

export default VerifyEmail;
