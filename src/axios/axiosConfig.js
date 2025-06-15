import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Create axios instance with default config
const axiosInstance = axios.create({
    baseURL: 'https://restaurant-management-server-rust.vercel.app',
    timeout: 10000,
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