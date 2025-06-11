import { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import Lottie from 'lottie-react';
import loginAnimation from '../../assets/login-animation.json';
import registerBg from '../../assets/Register.jpg';
import axios from 'axios';

const Register = () => {
    const { CreatUser, updateUser, googleLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const from = location.state?.from?.pathname || '/';

    const passwordCriteria = {
        minLength: password.length >= 6,
        hasUpperCase: /[A-Z]/.test(password),
        hasLowerCase: /[a-z]/.test(password),
    };

    const validatePassword = (pass) => {
        const errors = [];
        if (!passwordCriteria.minLength) errors.push('Minimum 6 characters');
        if (!passwordCriteria.hasUpperCase) errors.push('One uppercase letter');
        if (!passwordCriteria.hasLowerCase) errors.push('One lowercase letter');
        return errors;
    };

    const saveUserToDb = async (userData) => {
        try {
            // Try to create new user
            const response = await axios.post('http://localhost:3000/users', userData);
            console.log('User created successfully:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error details:', error.response || error);
            throw new Error(error.response?.data?.error || 'Failed to create user account');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const { name, email, photoURL } = e.target.elements;
        const passwordErrors = validatePassword(password);

        if (passwordErrors.length > 0) {
            setError(passwordErrors.join(', '));
            setLoading(false);
            return;
        }

        try {
            // Create user with Firebase
            const userCredential = await CreatUser(email.value, password);
            
            // Update user profile
            await updateUser({
                displayName: name.value,
                photoURL: photoURL.value
            });

            // Prepare user data for database
            const userData = {
                name: name.value,
                email: email.value,
                photoURL: photoURL.value,
                uid: userCredential.user.uid,
                createdAt: new Date().toISOString(),
                role: 'user'
            };

            // Save user to database
            await saveUserToDb(userData);

            Swal.fire({
                icon: 'success',
                title: 'Account Created',
                timer: 1500,
                showConfirmButton: false,
            });

            navigate(from, { replace: true });
        } catch (err) {
            console.error('Registration error:', err);
            setError(err.message);
            Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: err.message,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleRegister = async () => {
        try {
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

            // Save Google user to database
            await saveUserToDb(userData);

            Swal.fire({
                icon: 'success',
                title: 'Google Sign In Success',
                timer: 1500,
                showConfirmButton: false,
            });
            navigate(from, { replace: true });
        } catch (err) {
            console.error('Google registration error:', err);
            setError(err.message);
            Swal.fire({
                icon: 'error',
                title: 'Google Sign Up Failed',
                text: err.message,
            });
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${registerBg})` }}
        >
            <div className="w-full max-w-6xl px-4 py-10 flex flex-col md:flex-row gap-10 bg-white/40 backdrop-blur-md rounded-2xl shadow-lg">
                {/* Left: Animation */}
                <div className="w-full md:w-1/2 flex justify-center items-center">
                    <Lottie animationData={loginAnimation} loop className="w-full max-w-sm" />
                </div>

                {/* Right: Form */}
                <div className="w-full md:w-1/2 p-6">
                    <div className="text-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-700">Register with</h2>
                    </div>

                    <button
                        onClick={handleGoogleRegister}
                        className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-all duration-200 shadow"
                    >
                        <FcGoogle className="text-xl" />
                        <span className="font-medium">Google</span>
                    </button>

                    <div className="my-6 text-center text-gray-500">or use credentials</div>

                    <form onSubmit={handleRegister}>
                        <div className="space-y-4">
                            <input
                                name="name"
                                type="text"
                                required
                                placeholder="Full Name"
                                className="w-full px-4 py-2 rounded-md bg-white/50 backdrop-blur-sm placeholder-gray-400 text-gray-800 focus:outline-none shadow"
                            />
                            <input
                                name="email"
                                type="email"
                                required
                                placeholder="Email"
                                className="w-full px-4 py-2 rounded-md bg-white/50 backdrop-blur-sm placeholder-gray-400 text-gray-800 focus:outline-none shadow"
                            />
                            <input
                                name="photoURL"
                                type="url"
                                required
                                placeholder="Photo URL"
                                className="w-full px-4 py-2 rounded-md bg-white/50 backdrop-blur-sm placeholder-gray-400 text-gray-800 focus:outline-none shadow"
                            />
                            <input
                                name="password"
                                type="password"
                                value={password}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={() => setIsPasswordFocused(true)}
                                onBlur={() => setIsPasswordFocused(false)}
                                placeholder="Password"
                                className="w-full px-4 py-2 rounded-md bg-white/50 backdrop-blur-sm placeholder-gray-400 text-gray-800 focus:outline-none shadow"
                            />
                        </div>

                        {/* Password Rules */}
                        {isPasswordFocused && (
                            <div className="mt-3 bg-white/80 p-3 rounded-lg text-sm shadow">
                                <p className="font-semibold text-gray-700 mb-1">Password must contain:</p>
                                <ul className="space-y-1">
                                    {Object.entries(passwordCriteria).map(([key, valid]) => (
                                        <li key={key} className="flex items-center gap-2">
                                            {valid ? <FaCheck className="text-green-500" /> : <FaTimes className="text-red-500" />}
                                            <span className={valid ? 'text-green-600' : 'text-gray-600'}>
                                                {{
                                                    minLength: 'At least 6 characters',
                                                    hasUpperCase: 'One uppercase letter',
                                                    hasLowerCase: 'One lowercase letter',
                                                }[key]}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {error && <p className="text-red-600 text-center mt-2">{error}</p>}

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-6 w-full bg-primary text-white py-2 rounded-md font-semibold hover:bg-primary-dark transition duration-200"
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>

                    <div className="text-center mt-4">
                        <Link to="/auth/login" className="text-base font-bold text-white hover:text-gray-200">
                            Already have an account? <span className="underline">Login</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
