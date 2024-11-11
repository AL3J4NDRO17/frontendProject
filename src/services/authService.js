// src/services/authService.js
import axios from 'axios';
import axiosInstance from './axiosConfig';
import { jwtDecode } from 'jwt-decode'

// Base URL de la API (asegúrate de definir `API_URL` en tu archivo de configuración)

// Obtener el token CSRF y configurarlo en axiosInstance
export const getCsrfToken = async () => {
    const response= await  axiosInstance.get(`/get-csrf-token`);
    axiosInstance.defaults.headers.post['X-CSRF-Token'] = response.data.csrfToken;
};

// Iniciar sesión
export const login = async (formData) => {
    await getCsrfToken(); 
    const response = await axiosInstance.post(`/auth/login`, formData, {
        withCredentials: true,
    });
    return response.data;
};

// Verificar OTP
export const verifyOtp = async (userId, otp) => {
    await getCsrfToken();
    const response = await axiosInstance.post(`/auth/verify-otp`, { userId, otp }, {
        withCredentials: true,
    });

    return response.data;
};

// Registrar usuario
export const register = async (userData) => {
    await getCsrfToken(); // Llama a getCsrfToken antes de la solicitud de registro
    const response = await axiosInstance.post(`/auth/register`, userData, {
        withCredentials: true,
    });
    return response.data;
};

// Cerrar sesión
export const logout = async () => {
    await getCsrfToken();
    const response = await axiosInstance.post('/auth/logout', {}, { withCredentials: true });
    return response.data;
};
// Verificar cuenta de correo electrónico
export const verifyEmail = async (token) => {
    const response = await axiosInstance.get(`/auth/verify`, {
        params: { token },
        withCredentials: true,
    });
    return response.data;
};

// Reenviar correo de verificación
export const resendVerificationEmail = async (email) => {
    const response = await axiosInstance.post(`/auth/resend-verification`, { email }, {
        withCredentials: true,
    });
    return response.data;
};

export const getRoleFromToken = () => {
    const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('authToken='))
        ?.split('=')[1];

    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        return decoded.role;
    } catch (error) {
        console.error("Error al decodificar el token:", error);
        return null;
    }
};