import React, { useState, useContext } from 'react';
import "../../styles/auth/login.css";



import { login, verifyOtp } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';

function Login() {
    const { setIsAuthenticated, setUserRole, isLoading, setIsLoading, fetchUserData } = useContext(AuthContext); // Asegúrate de incluir setIsLoading

    const [formData, setFormData] = useState({ correo: '', pass: '' });
    const [otp, setOtp] = useState('');
    const [isOtpStep, setIsOtpStep] = useState(false); // Controla si estamos en la fase de OTP
    const [userId, setUserId] = useState(null); // Almacena el ID del usuario después de iniciar sesión
    const [showPassword, setShowPassword] = useState(false); // Controla la visibilidad de la pass
    const navigate = useNavigate();

    // Maneja el cambio de los campos del formulario de inicio de sesión
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Maneja el cambio del campo OTP
    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    // Envío del formulario de inicio de sesión
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(formData); // Llama a la función `login` del `authService`
            setUserId(response.userId); // Guarda el userId para usarlo en la verificación OTP
            toast.success("OTP enviado. Verifica tu correo para continuar.");
            setIsOtpStep(true); // Cambia a la fase de OTP
        } catch (error) {
            toast.error(error.response?.data?.msg || "Usuario o pass incorrectos.");
        }
    };

    // Envío del formulario de OTP
    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        try {
            await verifyOtp(userId, otp); // Verifica OTP
            await fetchUserData();   
            
            // Actualiza el rol del usuario y el estado de autenticación
            toast.success("Inicio de sesión exitoso.");
            navigate('/');
        } catch (error) {
            console.error("Error en la verificación de OTP:", error); // Verifica el error exacto
            toast.error("Código OTP incorrecto o expirado.");
        }
    };

    return (
        <div className="auth-container fade-in">
            {!isOtpStep ? (
                // Formulario de inicio de sesión
                <div className="auth-form login-form">
                    <h2>Iniciar Sesión</h2>
                    <form onSubmit={handleLoginSubmit}>
                        <label className="login-label">Correo</label>
                        <input
                            type="email"
                            name="correo"
                            placeholder="Correo electrónico"
                            className="login-input"
                            value={formData.correo}
                            onChange={handleChange}
                            required
                        />

                        <label className="login-label">pass</label>
                        <div className="password-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="pass"
                                placeholder="pass"
                                className="login-input"
                                value={formData.pass}
                                onChange={handleChange}
                                required
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="eye-icon"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>

                        <button type="submit" className="auth-button login-button">Entrar</button>
                        <a href="#" className="forgot-password">¿Olvidaste tu pass?</a>
                    </form>
                </div>
            ) : (
                // Formulario de verificación de OTP
                <div className="auth-form otp-form">
                    <h2>Verificación de identidad</h2>
                    <p>Ingrese el código de verificación enviado a su correo.</p>
                    <form onSubmit={handleOtpSubmit}>
                        <input
                            type="text"
                            value={otp}
                            onChange={handleOtpChange}
                            placeholder="000000"
                            maxLength="6"
                            className="otp-input"
                            required
                        />
                        <button type="submit" className="auth-button otp-button">Verificar</button>
                    </form>
                    <a href="#" className="recovery-code-link">Usar código de recuperación</a>
                </div>
            )}
            <div className="auth-image login-image">
                <img src="ruta_a_tu_imagen_login.jpg" alt="Login" />
            </div>
        </div>
    );
}

export default Login;
