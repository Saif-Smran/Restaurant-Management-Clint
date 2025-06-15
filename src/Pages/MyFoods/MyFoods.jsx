import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import { FaEdit, FaEye, FaTrash, FaPlus, FaUtensils, FaHamburger, FaPizzaSlice, FaIceCream, FaCoffee, FaGlassWhiskey } from 'react-icons/fa';
import axiosInstance from '../../axios/axiosConfig';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

const MyFoods = () => {
    const { user } = useContext(AuthContext);
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedFood, setSelectedFood] = useState(null);
    
    const getCategoryIcon = (category) => {
        switch (category.toLowerCase()) {
            case 'main course':
                return <FaUtensils className="text-primary" />;
            case 'burger':
                return <FaHamburger className="text-primary" />;
            case 'pizza':
                return <FaPizzaSlice className="text-primary" />;
            case 'dessert':
                return <FaIceCream className="text-primary" />;
            case 'beverage':
                return <FaCoffee className="text-primary" />;
            default:
                return <FaGlassWhiskey className="text-primary" />;
        }
    };

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

    const handleView = (food) => {
        setSelectedFood(food);
        const modal = document.getElementById('view_modal');
        if (modal) {
            modal.showModal();
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
                    <div className="overflow-x-auto bg-base-100 rounded-lg shadow-md">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th className='text-center'>Image</th>
                                    <th className='text-center'>Name</th>
                                    <th className='text-center'>Category</th>
                                    <th className='text-center'>Price</th>
                                    <th className='text-center'>Quantity</th>
                                    <th className='text-center'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {foods.map(food => (
                                    <tr key={food._id}>
                                        <td>
                                            <div className="avatar">
                                                <div className="w-16 h-16 rounded text-center">
                                                    <img src={food.image} alt={food.name} />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-2 justify-center">
                                                {getCategoryIcon(food.category)}
                                                <span className="font-medium">{food.name}</span>
                                            </div>
                                        </td>
                                        <td className='text-center'>{food.category}</td>
                                        <td className='text-center'>${food.price}</td>
                                        <td className='text-center'>{food.quantity}</td>
                                        <td>
                                            <div className="flex gap-2 justify-center items-center">
                                                <button
                                                    onClick={() => handleView(food)}
                                                    className="btn btn-sm btn-info"
                                                    title="View"
                                                >
                                                    <FaEye /> View
                                                </button>
                                                <Link
                                                    to={`/update-food/${food._id}`}
                                                    className="btn btn-sm btn-primary"
                                                    title="Edit"
                                                >
                                                    <FaEdit /> Update
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(food._id)}
                                                    className="btn btn-sm btn-error"
                                                    title="Delete"
                                                >
                                                    <FaTrash /> Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* View Modal */}
            <dialog id="view_modal" className="modal">
                <div className="modal-box max-w-3xl">
                    {selectedFood && (
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="md:w-1/2">
                                <img 
                                    src={selectedFood.image} 
                                    alt={selectedFood.name} 
                                    className="w-full h-64 object-cover rounded-lg"
                                />
                            </div>
                            <div className="md:w-1/2">
                                <div className="flex items-center gap-2 mb-4">
                                    {getCategoryIcon(selectedFood.category)}
                                    <h3 className="text-2xl font-bold">{selectedFood.name}</h3>
                                </div>
                                <div className="space-y-3">
                                    <p><span className="font-semibold">Category:</span> {selectedFood.category}</p>
                                    <p><span className="font-semibold">Price:</span> ${selectedFood.price}</p>
                                    <p><span className="font-semibold">Quantity:</span> {selectedFood.quantity}</p>
                                    <p><span className="font-semibold">Description:</span> {selectedFood.description}</p>
                                    <p><span className="font-semibold">Origin:</span> {selectedFood.origin}</p>
                                    <p><span className="font-semibold">Added By:</span> {selectedFood.addedBy}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default MyFoods;
