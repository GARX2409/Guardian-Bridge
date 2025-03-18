import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        // Si no hay token, redirige al login
        return <Navigate to="/" replace />;
    }

    // Si hay token, permite el acceso al componente hijo
    return children;
};

export default ProtectedRoute;