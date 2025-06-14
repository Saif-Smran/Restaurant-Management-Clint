import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';

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
                const { data } = await axios.get(`http://localhost:3000/foods/user/${user.email}`, {
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
                await axios.delete(`http://localhost:3000/foods/${id}`, {
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

    if (loading) return <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
    </div>;

    if (error) return <div className="text-center text-red-500 py-8">Error: {error}</div>;

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold text-center mb-8">My Foods</h1>

            {foods.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-lg mb-4">You haven't added any food items yet.</p>
                    <Link to="/add-food" className="btn btn-primary">Add Your First Food</Link>
                </div>
            ) : (
                <div className="overflow-x-auto max-w-11/12 mx-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="bg-base-200">
                                <th className='text-center'>Image</th>
                                <th className='text-center'>Name</th>
                                <th className='text-center'>Category</th>
                                <th className='text-center'>Price(BDT)</th>
                                <th className='text-center'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {foods.map((food) => (
                                <tr key={food._id} className="hover">
                                    <td className="align-middle text-center">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={food.image} alt={food.name} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="align-middle text-center">
                                        <div className="font-bold">{food.name}</div>
                                    </td>
                                    <td className="align-middle text-center">{food.category}</td>                                    
                                    <td className="align-middle text-center">{typeof food.price === 'object' && food.price.$numberInt ? food.price.$numberInt : food.price}</td>
                                    <td className="align-middle text-center ">
                                        <div className="flex flex-wrap gap-2 justify-center items-center">
                                            <Link
                                                to={`/food/${food._id}`}
                                                className="btn btn-sm btn-info"
                                            >
                                                <FaEye /> View
                                            </Link>
                                            <Link
                                                to={`/update-food/${food._id}`}
                                                className="btn btn-sm btn-primary"
                                            >
                                                <FaEdit /> Update
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(food._id)}
                                                className="btn btn-sm btn-error"
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
    );
};
    

export default MyFoods;
