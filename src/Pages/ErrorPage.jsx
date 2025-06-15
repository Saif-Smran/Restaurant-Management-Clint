import { Link, useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

export default function ErrorPage() {
    const error = useRouteError();
    const defaultError = {
        statusText: "Page Not Found",
        message: "An unexpected error occurred",
        status: "404"
    };

    const errorData = error?.statusText ? error : defaultError;

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-100">
            <div className="text-center p-8">
                <h1 className="text-6xl font-bold text-primary font-poppins mb-4">
                    {errorData.status}
                </h1>
                <p className="text-2xl text-base-content font-quicksand mb-8">
                    {errorData.statusText}
                </p>
                <p className="text-base-content/70 font-nunito mb-8">
                    {errorData.message}
                </p>
                <Link
                    to="/"
                    className="btn btn-primary text-primary-content font-quicksand inline-flex items-center gap-2"
                >
                    <FaHome />
                    Back to Home
                </Link>
            </div>
        </div>
    );
} 