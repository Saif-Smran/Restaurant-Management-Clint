import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import toast from 'react-hot-toast';
import axios from 'axios';
import Lottie from 'lottie-react';
import foodAnimation from '../../assets/animations/food-loading.json';
import orderAnimation from '../../assets/animations/order-success.json';
import axiosInstance from '../../axios/axiosConfig';
import Swal from 'sweetalert2';

const FoodPurchase = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [foodDetails, setFoodDetails] = useState(null);
    const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

    const [formData, setFormData] = useState({
        quantity: 1,
    });

    // Fetch food details
    useEffect(() => {
        const fetchFoodDetails = async () => {
            try {
                const { data } = await axiosInstance.get(`/foods/${id}`);
                setFoodDetails(data);
                setFormData(prev => ({
                    ...prev,
                    foodName: data.name,
                    price: data.price
                }));
            } catch (err) {
                setError('Failed to fetch food details');
                toast.error('Failed to load food information');
            } finally {
                setLoading(false);
            }
        };

        fetchFoodDetails();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const numValue = parseInt(value);

        if (name === 'quantity') {
            // Don't allow quantity more than available
            if (numValue > foodDetails.quantity) {
                toast.error(`Cannot order more than available quantity (${foodDetails.quantity})`);
                return;
            }
            // Don't allow negative or zero quantity
            if (numValue <= 0) {
                toast.error('Quantity must be greater than 0');
                return;
            }
        }

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const isQuantityValid = () => {
        const orderQuantity = parseInt(formData.quantity);
        return orderQuantity > 0 && orderQuantity <= foodDetails?.quantity;
    };

    const canPurchase = () => {
        if (!foodDetails) return false;
        if (foodDetails.quantity <= 0) return false;
        if (foodDetails.addedBy === user?.email) return false;
        return isQuantityValid();
    };

    const getPurchaseButtonText = () => {
        if (!foodDetails) return 'Loading...';
        if (foodDetails.quantity <= 0) return 'Out of Stock';
        if (foodDetails.addedBy === user?.email) return 'Cannot Purchase Own Item';
        if (!isQuantityValid()) return 'Invalid Quantity';
        return 'Place Order';
    };

    const calculateTotal = () => {
        return (parseFloat(foodDetails?.price || 0) * parseInt(formData.quantity || 0)).toFixed(2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!canPurchase()) {
            toast.error('Invalid purchase attempt');
            return;
        }

        try {
            const token = await user.getIdToken();
            await axiosInstance.post('/orders', {
                foodId: foodDetails._id,
                foodName: foodDetails.name,
                price: foodDetails.price,
                quantity: parseInt(formData.quantity),
                buyerName: user.displayName,
                buyerEmail: user.email,
                orderDate: Date.now()
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            Swal.fire({
                icon: 'success',
                title: 'Order Placed!',
                text: 'Your order has been placed successfully.',
                timer: 1500,
                showConfirmButton: false
            });

            navigate('/my-orders');
        } catch (err) {
            console.error('Error placing order:', err);
            Swal.fire({
                icon: 'error',
                title: 'Order Failed',
                text: err.message || 'Failed to place order'
            });
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <div className="w-64 h-64">
                    <Lottie animationData={foodAnimation} loop={true} />
                </div>
                <p className="text-lg text-gray-600 mt-4">Loading food details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Food Details</h2>
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        );
    }

    if (showSuccessAnimation) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <div className="w-64 h-64">
                    <Lottie animationData={orderAnimation} loop={false} />
                </div>
                <p className="text-xl text-green-600 font-semibold mt-4">Order placed successfully!</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-base-200 rounded-xl shadow-2xl overflow-hidden">
                    <div className="md:flex">
                        {/* Food Image Section */}
                        <div className="md:w-1/2 relative">
                            <img
                                src={foodDetails.image}
                                alt={foodDetails.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 left-4 bg-base-200 px-3 py-1 rounded-full shadow-md">
                                <span className="text-primary font-semibold">${foodDetails.price}</span>
                            </div>
                        </div>

                        {/* Form Section */}
                        <div className="md:w-1/2 p-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                {foodDetails.name}
                            </h2>

                            {foodDetails?.quantity <= 0 && (
                                <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
                                    <p className="font-semibold">⚠️ Out of Stock</p>
                                    <p className="text-sm">This item is currently unavailable for purchase</p>
                                </div>
                            )}

                            {foodDetails?.addedBy === user?.email && (
                                <div className="mb-6 p-4 bg-yellow-100 text-yellow-700 rounded-lg">
                                    <p className="font-semibold">⚠️ Own Item</p>
                                    <p className="text-sm">You cannot purchase your own food items</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-gray-600">Available Quantity:</span>
                                        <span className={`font-semibold ${foodDetails.quantity <= 0 ? 'text-red-600' : 'text-green-600'}`}>
                                            {foodDetails.quantity}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Unit Price:</span>
                                        <span className="font-semibold">${foodDetails.price}</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Purchase Quantity
                                    </label>
                                    <div className="flex items-center">
                                        <button
                                            type="button"
                                            onClick={() => handleInputChange({ target: { name: 'quantity', value: Math.max(1, parseInt(formData.quantity) - 1) } })}
                                            className="bg-gray-200 p-2 rounded-l-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                            disabled={foodDetails.quantity <= 0}
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            name="quantity"
                                            value={formData.quantity}
                                            onChange={handleInputChange}
                                            required
                                            min="1"
                                            max={foodDetails.quantity}
                                            className="w-20 text-center border-y border-gray-300 py-2 input-no-arrow"
                                            disabled={foodDetails.quantity <= 0}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleInputChange({ target: { name: 'quantity', value: Math.min(foodDetails.quantity, parseInt(formData.quantity) + 1) } })}
                                            className="bg-gray-200 p-2 rounded-r-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                            disabled={foodDetails.quantity <= 0}
                                        >
                                            +
                                        </button>
                                    </div>
                                    {foodDetails.quantity > 0 && (
                                        <p className="mt-2 text-sm text-gray-500">
                                            Maximum order quantity: {foodDetails.quantity}
                                        </p>
                                    )}
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-semibold">Total Amount:</span>
                                        <span className="text-xl font-bold text-primary">
                                            ${calculateTotal()}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-600 mb-2">Ordering as:</p>
                                        <p className="font-semibold">{user?.displayName}</p>
                                        <p className="text-gray-500">{user?.email}</p>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={!canPurchase()}
                                        className={`w-full flex justify-center py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-300
                                            ${canPurchase()
                                                ? 'bg-primary text-white hover:bg-primary-dark transform hover:-translate-y-1'
                                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            }`}
                                    >
                                        {getPurchaseButtonText()}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodPurchase; 