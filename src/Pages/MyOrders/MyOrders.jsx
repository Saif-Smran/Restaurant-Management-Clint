import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { FaTrash } from 'react-icons/fa';
import moment from 'moment';
import Swal from 'sweetalert2';
import axiosInstance from '../../axios/axiosConfig';

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user?.email) return;

            try {
                setLoading(true);
                const token = await user.getIdToken();
                const { data } = await axiosInstance.get(`/orders/${user.email}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                // Fetch food details for each order
                const ordersWithFoodDetails = await Promise.all(
                    data.map(async (order) => {
                        try {
                            const { data: foodData } = await axiosInstance.get(`/foods/${order.foodId}`);
                            return {
                                ...order,
                                food: foodData
                            };
                        } catch (err) {
                            console.error(`Error fetching food details for ${order.foodId}:`, err);
                            return order;
                        }
                    })
                );

                setOrders(ordersWithFoodDetails);
            } catch (err) {
                console.error('Error fetching orders:', err);
                if (err.response && err.response.status === 404) {
                    setOrders([]);
                } else {
                    setError(err.message || 'Failed to fetch orders');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    const handleDelete = async (orderId) => {
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
                await axiosInstance.delete(`/orders/${orderId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setOrders(orders.filter(order => order._id !== orderId));
                Swal.fire(
                    'Deleted!',
                    'Your order has been deleted.',
                    'success'
                );
            }
        } catch (err) {
            console.error('Error deleting order:', err);
            Swal.fire(
                'Error!',
                'Failed to delete the order.',
                'error'
            );
        }
    };

    if (loading) return <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
    </div>;

    if (error) return <div className="text-center text-red-500 py-8 font-poppins">Error: {error}</div>;

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold text-center mb-8 font-poppins">My Orders</h1>

            {orders.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-lg mb-4 font-nunito">You haven't placed any orders yet.</p>
                </div>
            ) : (
                <div className="overflow-x-auto max-w-11/12 mx-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="bg-base-200">
                                <th className="text-center font-poppins">Food Image</th>
                                <th className="text-center font-poppins">Food Name</th>
                                <th className="text-center font-poppins">Price (BDT)</th>
                                <th className="text-center font-poppins">Quantity</th>
                                <th className="text-center font-poppins">Order Date</th>
                                <th className="text-center font-poppins">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id} className="hover">
                                    <td className="align-middle text-center">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={order.food?.image} alt={order.foodName} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="align-middle text-center">
                                        <div className="font-bold font-poppins">{order.foodName}</div>
                                    </td>
                                    <td className="align-middle text-center font-raleway">
                                        {typeof order.price === 'object' && order.price.$numberInt 
                                            ? order.price.$numberInt 
                                            : order.price}
                                    </td>
                                    <td className="align-middle text-center font-nunito">
                                        {typeof order.quantity === 'object' && order.quantity.$numberInt 
                                            ? order.quantity.$numberInt 
                                            : order.quantity}
                                    </td>
                                    <td className="align-middle text-center font-nunito">
                                        {moment(Number(order.orderDate)).format('MMMM Do YYYY, h:mm:ss a')}
                                    </td>
                                    <td className="align-middle text-center">
                                        <div className="flex flex-wrap gap-2 justify-center items-center">
                                            <button
                                                onClick={() => handleDelete(order._id)}
                                                className="btn btn-sm btn-error font-quicksand"
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

export default MyOrders; 