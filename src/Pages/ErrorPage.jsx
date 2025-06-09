import { Link, useRouteError } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const ErrorPage = () => {
    const error = useRouteError();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-primary mb-4">
                    {error.status || '404'}
                </h1>
                <p className="text-2xl font-semibold text-gray-800 mb-4">
                    {error.statusText || 'Page Not Found'}
                </p>
                <p className="text-gray-600 mb-8">
                    {error.message || "Sorry, we couldn't find the page you're looking for."}
                </p>
                <Link 
                    to="/"
                    className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
                >
                    <FaHome />
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage; 