import { Link, useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const ErrorPage = () => {
    const error = useRouteError();
    
    let errorMessage = "An unexpected error occurred";
    let statusCode = "404";
    let statusText = "Page Not Found";

    if (isRouteErrorResponse(error)) {
        // Handle route errors (like 404)
        statusCode = error.status;
        statusText = error.statusText;
        errorMessage = error.data?.message || "This page doesn't exist!";
    } else if (error instanceof Error) {
        // Handle runtime errors
        errorMessage = error.message;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-primary mb-4">
                    {statusCode}
                </h1>
                <p className="text-2xl font-semibold text-gray-800 mb-4">
                    {statusText}
                </p>
                <p className="text-gray-600 mb-8">
                    {errorMessage}
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