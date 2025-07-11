import { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import Lottie from 'lottie-react';
import loginAnimation from '../../assets/login-animation.json';
import loginBg from '../../assets/Login.jpg';
import axiosInstance from '../../axios/axiosConfig';
import { Helmet } from 'react-helmet';

const Login = () => {
    const { login, googleLogin, setLoading, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState('');

    const from = location.state?.from?.pathname || '/';

    const saveUserToDb = async (userData) => {
        try {
            // First check if user exists
            const token = await user?.getIdToken();
            const checkUser = await axiosInstance.get(`/users/${userData.email}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (checkUser.status === 200) {
                console.log('User already exists');
                return checkUser.data;
            }
        } catch (error) {
            // If user not found (404) or other error, try to create new user
            if (error.response?.status === 404) {
                try {
                    const response = await axiosInstance.post('/users', userData);
                    console.log('New user created:', response.data);
                    return response.data;
                } catch (createError) {
                    console.error('Error creating user:', createError);
                    throw createError;
                }
            } else {
                console.error('Error checking user:', error);
                throw error;
            }
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        try {
            const userCredential = await login(email, password);
            
            // Get fresh token after login
            const token = await userCredential.user.getIdToken();
            
            Swal.fire({
                icon: 'success',
                title: 'Welcome back!',
                text: 'You have successfully logged in.',
                timer: 1500,
                showConfirmButton: false,
            });

            // Use replace: true to prevent going back to login page
            navigate(from, { replace: true });
        } catch (err) {
            console.error('Login error:', err);
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
            setLoading(true);
            const result = await googleLogin();
            
            // Prepare user data for database
            const userData = {
                name: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL,
                uid: result.user.uid,
                createdAt: new Date().toISOString(),
                role: 'user'
            };

            // Try to save user data (will only create if doesn't exist)
            await saveUserToDb(userData);

            Swal.fire({
                icon: 'success',
                title: 'Welcome!',
                text: 'You have successfully signed in with Google.',
                timer: 1500,
                showConfirmButton: false,
            });

            // Use replace: true to prevent going back to login page
            navigate(from, { replace: true });
        } catch (err) {
            console.error('Google login error:', err);
            setError(err.message);
            Swal.fire({
                icon: 'error',
                title: 'Google Login Failed',
                text: err.message,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${loginBg})` }}
        >
            <Helmet>
                <title>Login | RestoEase</title>
                <meta name="description" content="Login to RestoEase and continue enjoying delicious food delivered to your doorstep." />
            </Helmet>
            <div className="w-full max-w-6xl px-4 py-10 flex flex-col md:flex-row gap-10 bg-base-200/40 backdrop-blur-md rounded-2xl shadow-lg">
                {/* Left: Animation */}
                <div className="w-full md:w-1/2 flex justify-center items-center">
                    <Lottie animationData={loginAnimation} loop className="w-full max-w-sm" />
                </div>

                {/* Right: Form */}
                <div className="w-full md:w-1/2 p-6">
                    <div className="text-center mb-4">
                        <h2 className="text-2xl font-bold text-base-content font-poppins">Login with</h2>
                    </div>

                    <button
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-2 btn bg-white text-black border-[#e5e5e5] font-quicksand"
                    >
                        <FcGoogle className="text-xl" />
                        <span className="font-medium">Google</span>
                    </button>

                    <div className="my-6 text-center text-base-content font-nunito">or use credentials</div>

                    <form onSubmit={handleLogin}>
                        <div className="space-y-4">
                            <input
                                name="email"
                                type="email"
                                required
                                placeholder="Email"
                                className="w-full px-4 py-2 rounded-md bg-base-200/50 backdrop-blur-sm placeholder-gray-400 text-base-content focus:outline-none shadow font-nunito"
                            />
                            <input
                                name="password"
                                type="password"
                                required
                                placeholder="Password"
                                className="w-full px-4 py-2 rounded-md bg-base-200/50 backdrop-blur-sm placeholder-gray-400 text-base-content focus:outline-none shadow font-nunito"
                            />
                        </div>

                        {error && <p className="text-red-600 text-center mt-2 font-poppins">{error}</p>}

                        <button
                            type="submit"
                            className="mt-6 w-full bg-primary text-white py-2 rounded-md font-semibold hover:bg-primary-dark transition duration-200 font-quicksand"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="text-center mt-4">
                        <Link to="/auth/register" className="text-base font-bold text-white hover:text-gray-200 font-nunito">
                            Don't have an account? <span className="underline">Register</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;