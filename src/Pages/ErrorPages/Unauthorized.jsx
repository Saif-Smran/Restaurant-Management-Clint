import { Link } from 'react-router-dom';
import { FaLock, FaHome } from 'react-icons/fa';

const Unauthorized = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="text-center">
                <div className="flex justify-center mb-6">
                    <FaLock className="text-9xl text-primary" />
                </div>
                <h1 className="text-6xl font-bold text-primary mb-4">
                    401
                </h1>
                <p className="text-2xl font-semibold text-gray-800 mb-4">
                    Unauthorized Access
                </p>
                <p className="text-gray-600 mb-8">
                    You need to be logged in to access this page.
                </p>
                <div className="space-x-4">
                    <Link 
                        to="/auth/login"
                        className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
                    >
                        Login
                    </Link>
                    <Link 
                        to="/"
                        className="inline-flex items-center gap-2 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        <FaHome />
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Unauthorized; 