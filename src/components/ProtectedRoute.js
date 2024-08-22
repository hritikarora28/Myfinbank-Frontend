import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, allowedRoles }) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const isAuthenticated = !!token;
    const isAllowed = allowedRoles.includes(role);

    return isAuthenticated && isAllowed ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
