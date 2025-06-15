import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import { FaEdit, FaEye, FaTrash, FaPlus } from 'react-icons/fa';
import axiosInstance from '../../axios/axiosConfig';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

const MyFoods = () => {
    const { user } = useContext(AuthContext);
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchMyFoods = async () => {
            if (!user?.email) return;

            try {
                setLoading(true);
                const token = await user.getIdToken();
                const { data } = await axiosInstance.get(`/foods/user/${user.email}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setFoods(data);
            } catch (err) {
                console.error('Error fetching foods:', err);
                if (err.response && err.response.status === 404) {
                    setFoods([]);
                } else {
                    setError(err.message || 'Failed to fetch foods');
                }
            } finally {
                setLoading(false);
            }
        }; 
        
        fetchMyFoods();
    }, [user]);

    const handleDelete = async (id) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
                const token = await user.getIdToken();
                await axiosInstance.delete(`/foods/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setFoods(foods.filter(food => food._id !== id));
                Swal.fire(
                    'Deleted!',
                    'Your food item has been deleted.',
                    'success'
                );
            }
        } catch (err) {
            console.error('Error deleting food:', err);
            Swal.fire(
                'Error!',
                'Failed to delete the food item.',
                'error'
            );
        }
    };

    return (
        <div className="min-h-screen bg-base-200 py-8 sm:py-12">
            <Helmet>
                <title>My Foods | RestoEase</title>
            </Helmet>
            <div className="container mx-auto px-4">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left mb-4 sm:mb-0">My Foods</h1>
                    <Link to="/add-food" className="btn btn-primary flex items-center gap-2 w-full sm:w-auto">
                        <FaPlus /> Add New Food
                    </Link>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center min-h-[400px]">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-8">
                        <p className="text-red-500">{error}</p>
                    </div>
                ) : foods.length === 0 ? (
                    <div className="text-center py-12 bg-base-100 rounded-lg shadow-md">
                        <p className="text-xl text-base-content/70 mb-4">You haven't added any foods yet.</p>
                        <Link to="/add-food" className="btn btn-primary">
                            Add Your First Food
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {foods.map(food => (
                            <div key={food._id} className="bg-base-100 rounded-lg shadow-md overflow-hidden">
                                <div className="relative">
                                    <img
                                        src={food.image}
                                        alt={food.name}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="absolute top-4 right-4 flex gap-2">
                                        <Link
                                            to={`/update-food/${food._id}`}
                                            className="btn btn-sm btn-circle btn-primary"
                                            title="Edit"
                                        >
                                            <FaEdit />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(food._id)}
                                            className="btn btn-sm btn-circle btn-error"
                                            title="Delete"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4 sm:p-6">
                                    <h3 className="text-xl font-bold mb-2">{food.name}</h3>
                                    <p className="text-base-content/70 mb-2">{food.category}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-semibold text-primary">${food.price}</span>
                                        <span className="text-sm text-base-content/70">Quantity: {food.quantity}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
    

export default MyFoods;
