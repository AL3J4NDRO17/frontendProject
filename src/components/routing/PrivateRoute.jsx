// src/components/routing/PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const PrivateRoute = ({ allowedRoles }) => {
    const { isAuthenticated, userRole, isLoading} = useContext(AuthContext);
    
    if (isLoading) return <p>Loading...</p>; // Puedes agregar un componente de carga personalizado aquí

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/error" />; // Página de acceso denegado
    }

    return <Outlet />;
};

export default PrivateRoute;
