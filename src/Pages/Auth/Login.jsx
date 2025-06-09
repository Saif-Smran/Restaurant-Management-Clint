import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../../Hooks/CustomHooks';
import Swal from 'sweetalert2';
import Lottie from 'lottie-react';
import loginAnimation from '../../assets/login-animation.json';
import loginBg from '../../assets/Login.jpg';

const Login = () => {
    const { login, googleLogin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const from = location.state?.from?.pathname || '/';

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const { email, password } = e.target.elements;

        try {
            await login(email.value, password.value);
            Swal.fire({
                icon: 'success',
                title: 'Login Success',
                timer: 1500,
                showConfirmButton: false,
            });
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.message);
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: err.message,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await googleLogin();
            Swal.fire({
                icon: 'success',
                title: 'Google Sign In Success',
                timer: 1500,
                showConfirmButton: false,
            });
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.message);
            Swal.fire({
                icon: 'error',
                title: 'Google Login Failed',
                text: err.message,
            });
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${loginBg})` }}
        >
            <div className="w-full max-w-6xl px-4 py-10 flex flex-col md:flex-row gap-10 bg-white/40 backdrop-blur-md rounded-2xl shadow-lg">
                {/* Left: Animation */}
                <div className="w-full md:w-1/2 flex justify-center items-center">
                    <Lottie animationData={loginAnimation} loop className="w-full max-w-sm" />
                </div>

                {/* Right: Form */}
                <div className="w-full md:w-1/2 p-6">
                    <div className="text-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-700">Login with</h2>
                    </div>

                    <button
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-all duration-200 shadow"
                    >
                        <FcGoogle className="text-xl" />
                        <span className="font-medium">Google</span>
                    </button>

                    <div className="my-6 text-center text-gray-500">or use credentials</div>

                    <form onSubmit={handleLogin}>
                        <div className="space-y-4">
                            <input
                                name="email"
                                type="email"
                                required
                                placeholder="Email"
                                className="w-full px-4 py-2 rounded-md bg-white/50 backdrop-blur-sm placeholder-gray-400 text-gray-800 focus:outline-none shadow"
                            />
                            <input
                                name="password"
                                type="password"
                                required
                                placeholder="Password"
                                className="w-full px-4 py-2 rounded-md bg-white/50 backdrop-blur-sm placeholder-gray-400 text-gray-800 focus:outline-none shadow"
                            />
                        </div>

                        {error && <p className="text-red-600 text-center mt-2">{error}</p>}

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-6 w-full bg-primary text-white py-2 rounded-md font-semibold hover:bg-primary-dark transition duration-200"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="text-center mt-4">
                        <Link to="/auth/register" className="text-base font-bold text-white hover:text-gray-200">
                            Don't have an account? <span className="underline">Register</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
