import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import "../../styles/auth/register.css";

import { register } from '../../services/authService';

import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';

function Register() {
    const [formData, setFormData] = useState({
        correo: '',
        contraseña: '',
        confirmarContraseña: '',
        nombreCompleto: '',

    });


    //Constantes para la contraseña 
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [passwordTooltip, setPasswordTooltip] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        symbol: false
    });
    //Constante spara el tooltip
    const [showTooltip, setShowTooltip] = useState(false);
    const [isMatch, setIsMatch] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const [captchaToken, setCaptchaToken] = useState(null);

    const handleCaptchaChange = (token) => {
        setCaptchaToken(token); // Guarda el token de reCAPTCHA
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'contraseña') {
            checkPasswordStrength(value);
        } else if (name === 'confirmarContraseña') {
            setIsMatch(value === formData.contraseña);
        }

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const checkPasswordStrength = (password) => {
        const strengthCriteria = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password),
            symbol: /[\W_]/.test(password),
        };

        setPasswordTooltip(strengthCriteria);

        const strength = Object.values(strengthCriteria).reduce((acc, cur) => acc + (cur ? 1 : 0), 0);
        setPasswordStrength(strength);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!captchaToken) {
            toast.error("Por favor, completa el reCAPTCHA");
            return;
        }

        if (formData.contraseña !== formData.confirmarContraseña) {
            toast.error("Las contraseñas no coinciden");
            return;
        }

        const { confirmarContraseña, ...dataToSend } = formData;
        console.log("Datos enviados al backend:", dataToSend); // <-- Revisa aquí los datos antes de enviarlos

        try {
            await register({ ...dataToSend, captchaToken }); // Enviar token al backend
            toast.success("Registro exitoso. Por favor verifica tu correo electrónico.");
            navigate('/verify-email', { state: { email: formData.correo } });
        } catch (error) {
            if (error.response && error.response.status === 400 && error.response.data.errors) {
                // Mostrar cada mensaje de error específico
                error.response.data.errors.forEach(err => {
                    toast.error(err.msg);
                });
            } else {
                // Error genérico en caso de otro tipo de error
                toast.error(error.response?.data?.msg || "Error en el servidor");
            }
        }

    };
    return (
        <div className="auth-container fade-in">
            <div className="auth-form register-form">
                <h2>Registro</h2>
                <form onSubmit={handleSubmit}>
                    <label className="register-label">Correo Electrónico</label>
                    <input
                        type="text"
                        name="correo"
                        placeholder="Correo Electrónico"
                        className="register-input"
                        value={formData.correo}
                        onChange={handleChange}
                        required
                    />

                    <label className="register-label">Contraseña</label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="contraseña"
                            placeholder="Contraseña"
                            className="register-input"
                            value={formData.contraseña}
                            onChange={handleChange}
                            onFocus={() => setShowTooltip(true)}
                            onBlur={() => setShowTooltip(false)}
                            required
                        />
                        {/* Icono para mostrar/ocultar contraseña */}
                        <span onClick={() => setShowPassword(!showPassword)} className="eye-icon">
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>

                        {/* Tooltip flotante de requisitos de contraseña */}
                        {showTooltip && (
                            <div className="password-tooltip">
                                <p style={{ color: passwordTooltip.length ? 'green' : 'red' }}>• Al menos 8 caracteres</p>
                                <p style={{ color: passwordTooltip.uppercase ? 'green' : 'red' }}>• Una letra mayúscula</p>
                                <p style={{ color: passwordTooltip.lowercase ? 'green' : 'red' }}>• Una letra minúscula</p>
                                <p style={{ color: passwordTooltip.number ? 'green' : 'red' }}>• Un número</p>
                                <p style={{ color: passwordTooltip.symbol ? 'green' : 'red' }}>• Un símbolo</p>
                            </div>
                        )}
                    </div>

                    {/* Barra de fortaleza de contraseña */}
                    <div className="password-strength">
                        <div
                            style={{
                                width: `${(passwordStrength / 5) * 100}%`,
                                height: '8px',
                                backgroundColor: passwordStrength >= 4 ? 'green' : 'orange',
                                transition: 'width 0.3s',
                            }}
                        />
                    </div>

                    <label className="register-label">Confirmar Contraseña</label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmarContraseña"
                            placeholder="Confirmar Contraseña"
                            className="register-input"
                            value={formData.confirmarContraseña}
                            onChange={handleChange}
                            required
                        />
                        {!isMatch && <FaTimes className="error-icon" />}
                        <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="eye-icon">
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    <label className="register-label">Nombre Completo</label>
                    <input
                        type="text"
                        name="nombreCompleto"
                        placeholder="Nombre Completo"
                        className="register-input"
                        value={formData.nombreCompleto}
                        onChange={handleChange}
                        required
                    />


                    <ReCAPTCHA
                        sitekey="6LdFN18qAAAAAB5WT437-hRS9w4jTFRoGKjIdIBe" // Reemplaza con tu clave del sitio (Site Key) de reCAPTCHA
                        onChange={handleCaptchaChange}
                    />
                    <button type="submit" className="auth-button register-button">Registrarse</button>
                </form>
            </div>
            <div className="auth-image register-image">
                <img src="ruta_a_tu_imagen_register.jpg" alt="Registro" />
            </div>
        </div>
    );
}

export default Register;
