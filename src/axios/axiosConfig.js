import axios from 'axios';
import { getAuth } from 'firebase/auth';
import app from '../Provider/firebase.init';
// import { useNavigate } from 'react-router-dom';

// Create axios instance with default config
const axiosInstance = axios.create({
    baseURL: 'https://restaurant-management-server-rust.vercel.app',
    timeout: 10000,
});

// Request interceptor to attach Firebase ID token when available
const auth = getAuth(app);
axiosInstance.interceptors.request.use(async (config) => {
    try {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const token = await currentUser.getIdToken();
            config.headers = config.headers || {};
            if (!config.headers.Authorization) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
    } catch {
        // Ignore token errors here; let the request proceed and be handled by response interceptor or callers
    }
    return config;
});

// Response interceptor for handling errors
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // Redirect to unauthorized page
                    window.location.href = '/unauthorized';
                    break;
                case 403:
                    // Redirect to forbidden page
                    window.location.href = '/forbidden';
                    break;
                default:
                    // Handle other errors
                    break;
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance; 