// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const API_URL = "http://localhost:5000";

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Función para obtener datos del usuario
    const fetchUserData = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${API_URL}/api/auth/user-data`, { withCredentials: true });
            setIsAuthenticated(true);
            setUserRole(response.data.role);
        } catch (error) {
            setIsAuthenticated(false);
            setUserRole(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Cargar los datos del usuario al montar
    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);


    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, isLoading, setIsAuthenticated, setUserRole, fetchUserData }}>
            {children}
        </AuthContext.Provider>
    );
};
