import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import { FaEdit } from 'react-icons/fa';
import axios from 'axios';

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
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="bg-base-200">
                                <th>Image</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {foods.map((food) => (
                                <tr key={food._id}>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={food.image} alt={food.name} />
                                            </div>
                                        </div>
                                    </td>                                    <td>
                                        <div className="font-bold">{food.name}</div>
                                    </td>
                                    <td>{food.category}</td>                                    
                                    <td>${typeof food.price === 'object' && food.price.$numberInt ? food.price.$numberInt : food.price}</td>
                                    <td>
                                        <Link
                                            to={`/update-food/${food._id}`}
                                            className="btn btn-sm btn-primary"
                                        >
                                            <FaEdit /> Update
                                        </Link>
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
