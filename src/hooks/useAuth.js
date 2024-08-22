import { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';

const useAuth = () => {
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwt.decode(token);
                setRole(decoded.role);
            } catch (error) {
                console.error('Error decoding token', error);
            }
        }
        setLoading(false);
    }, []);

    return { role, loading };
};

export default useAuth;
