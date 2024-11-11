import React from 'react';
import { Navigate } from 'react-router-dom';

function AuthRoute({ children, isAuthenticated }) {
    return isAuthenticated ? children : <Navigate to="/login" />;
}

export default AuthRoute;