// src/services/axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api', // Cambia a la URL de tu backend
    withCredentials: true,               // Habilita el envío de cookies en las solicitudes
});

export default axiosInstance;
