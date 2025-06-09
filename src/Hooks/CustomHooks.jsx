import { useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../Provider/AuthProvider';
import { useNavigate } from 'react-router-dom';

// Create axios instance
export const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
});

// Custom hook for authentication state
export const useAuth = () => {
    const auth = useContext(AuthContext);
    return auth;
};

// Custom hook for protected routes
export const useRequireAuth = (redirectTo = '/auth/login') => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            navigate(redirectTo);
        }
    }, [user, loading, navigate, redirectTo]);

    return { user, loading };
};

// Custom hook for handling API requests
export const useApi = () => {
    const makeRequest = async (method, url, data = null) => {
        try {
            const response = await axiosInstance[method](url, data);
            return { data: response.data, error: null };
        } catch (error) {
            return {
                data: null,
                error: error.response?.data?.error || 'Something went wrong'
            };
        }
    };

    return { makeRequest };
}; 