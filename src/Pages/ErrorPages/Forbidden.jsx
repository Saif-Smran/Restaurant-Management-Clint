import { Link } from 'react-router-dom';
import { FaBan, FaHome } from 'react-icons/fa';

const Forbidden = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="text-center">
                <div className="flex justify-center mb-6">
                    <FaBan className="text-9xl text-red-500" />
                </div>
                <h1 className="text-6xl font-bold text-red-500 mb-4">
                    403
                </h1>
                <p className="text-2xl font-semibold text-gray-800 mb-4">
                    Access Forbidden
                </p>
                <p className="text-gray-600 mb-8">
                    You don't have permission to access this page.
                </p>
                <div className="space-x-4">
                    <Link 
                        to="/"
                        className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
                    >
                        <FaHome />
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Forbidden; 