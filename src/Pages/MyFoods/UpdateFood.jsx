import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import axiosInstance from '../../axios/axiosConfig';
import { Helmet } from 'react-helmet';

const UpdateFood = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [food, setFood] = useState(null);
    const [updatedFood, setUpdatedFood] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(false);

    useEffect(() => {
        const fetchFood = async () => {
            try {
                setLoading(true);
                const token = await user?.getIdToken();
                const { data } = await axiosInstance.get(`/foods/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                // Convert MongoDB format to regular numbers if needed
                const formattedFood = {
                    ...data,
                    quantity: typeof data.quantity === 'object' ? parseInt(data.quantity.$numberInt) : parseInt(data.quantity || 0),
                    price: typeof data.price === 'object' ? parseInt(data.price.$numberInt) : parseInt(data.price || 0),
                    purchaseCount: typeof data.purchaseCount === 'object' ? parseInt(data.purchaseCount.$numberInt) : parseInt(data.purchaseCount || 0)
                };

                setFood(formattedFood);
                setUpdatedFood(formattedFood);
                setError(null);

                // Check if user is the owner of this food
                if (data.addedBy?.email !== user?.email) {
                    setError("You don't have permission to update this food item");
                }
            } catch (err) {
                console.error('Error fetching food:', err);
                setError(err.response?.data?.error || err.message || 'Failed to fetch food details');
            } finally {
                setLoading(false);
            }
        };

        if (id && user?.email) {
            fetchFood();
        }
    }, [id, user]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'price' || name === 'quantity') {
            // Ensure the value is a valid number
            const numValue = parseInt(value);
            if (isNaN(numValue) || numValue < 0) return;

            setUpdatedFood({
                ...updatedFood,
                [name]: numValue
            });
        } else {
            setUpdatedFood({
                ...updatedFood,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!updatedFood) return;

        setSubmitting(true);
        try {
            // Format the data to match server requirements
            const formattedData = {
                name: updatedFood.name,
                image: updatedFood.image,
                category: updatedFood.category,
                quantity: parseInt(updatedFood.quantity),
                price: parseInt(updatedFood.price),
                addedBy: updatedFood.addedBy,
                origin: updatedFood.origin,
                description: updatedFood.description,
                purchaseCount: parseInt(updatedFood.purchaseCount || 0)
            };

            // Validate quantity
            if (isNaN(formattedData.quantity) || formattedData.quantity < 0) {
                throw new Error('Invalid quantity value');
            }

            // Validate price
            if (isNaN(formattedData.price) || formattedData.price < 0) {
                throw new Error('Invalid price value');
            }

            const token = await user?.getIdToken();
            const response = await axiosInstance.put(`/foods/${id}`, formattedData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setUpdateSuccess(true);
                setTimeout(() => {
                    navigate('/my-foods');
                }, 2000);
            }
        } catch (err) {
            console.error('Error updating food:', err);
            setError(err.response?.data?.error || err.message || 'Failed to update food');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[70vh]">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto py-8 px-4 text-center">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    <p>{error}</p>
                </div>
                <Link to="/my-foods" className="btn btn-primary mt-4">
                    Back to My Foods
                </Link>
            </div>
        );
    }

    if (!food) {
        return (
            <div className="container mx-auto py-8 px-4 text-center">
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
                    <p>Food item not found</p>
                </div>
                <Link to="/my-foods" className="btn btn-primary mt-4">
                    Back to My Foods
                </Link>
            </div>
        );
    }

    return (
        <div className="py-8 px-4 sm:px-6 lg:px-8 bg-base-200">
            <Helmet>
                <title>{food ? `Update ${food.name} - Restaurant Management` : 'Update Food - Restaurant Management'}</title>
            </Helmet>
            <div className="bg-base-100 shadow-lg rounded-lg max-w-3xl mx-auto p-4 sm:p-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">Update Food Item</h1>

                {updateSuccess && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                        <p>Food updated successfully! Redirecting...</p>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        {/* Food Name */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-base-content mb-1">
                                Food Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={updatedFood?.name || ''}
                                onChange={handleChange}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                required
                            />
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-sm font-medium text-base-content mb-1">
                                Price
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={updatedFood?.price || 0}
                                onChange={handleChange}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                step="0.01"
                                min="0"
                                required
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-base-content mb-1">
                                Category
                            </label>
                            <input
                                type="text"
                                name="category"
                                value={updatedFood?.category || ''}
                                onChange={handleChange}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                required
                            />
                        </div>

                        {/* Quantity */}
                        <div>
                            <label className="block text-sm font-medium text-base-content mb-1">
                                Quantity
                            </label>
                            <input
                                type="number"
                                name="quantity"
                                value={updatedFood?.quantity || 0}
                                onChange={handleChange}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                min="0"
                                required
                            />
                        </div>

                        {/* Image URL */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-base-content mb-1">
                                Image URL
                            </label>
                            <input
                                type="text"
                                name="image"
                                value={updatedFood?.image || ''}
                                onChange={handleChange}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                required
                            />
                        </div>

                        {/* Origin */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-base-content mb-1">
                                Origin
                            </label>
                            <input
                                type="text"
                                name="origin"
                                value={updatedFood?.origin || ''}
                                onChange={handleChange}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-base-content mb-1">
                                Description
                            </label>
                            <textarea
                                name="description"
                                rows="4"
                                value={updatedFood?.description || ''}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                placeholder="Add ingredients, making procedure, etc..."
                            ></textarea>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-6 flex flex-col sm:flex-row justify-end gap-4">
                        <Link to="/my-foods" className="btn btn-outline w-full sm:w-auto">
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="btn btn-primary w-full sm:w-auto"
                            disabled={submitting}
                        >
                            {submitting ? 'Updating...' : 'Update Food'}
                        </button>
                    </div>
                </form>

                {/* Preview */}
                <div className="mt-8 border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Food Preview</h3>
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-1/3">
                            <img
                                src={updatedFood?.image || '/placeholder-food.jpg'}
                                alt={updatedFood?.name}
                                className="w-full h-48 object-cover rounded-lg shadow-md"
                                onError={(e) => {
                                    e.target.src = '/placeholder-food.jpg';
                                }}
                            />
                        </div>
                        <div className="w-full md:w-2/3">
                            <h4 className="text-xl font-bold">{updatedFood?.name}</h4>
                            <p className="text-base-content">{updatedFood?.category} • {updatedFood?.origin}</p>
                            <p className="font-semibold text-lg text-primary mt-2">
                                ${updatedFood?.price || 0}
                            </p>
                            <p className="mt-2 text-sm text-base-content line-clamp-3">{updatedFood?.description}</p>
                            <p className="mt-2">
                                Quantity: {updatedFood?.quantity || 0}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateFood;
