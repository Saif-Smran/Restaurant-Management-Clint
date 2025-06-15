import React, { useState, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../../Provider/AuthProvider';
import { FaTrash } from 'react-icons/fa';
import moment from 'moment';
import Swal from 'sweetalert2';
import axiosInstance from '../../axios/axiosConfig';
import { Link } from 'react-router-dom';

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
        <div className="min-h-screen bg-base-200 py-8 sm:py-12">
            <Helmet>
                <title>My Orders | RestoEase</title>
            </Helmet>
            <div className="container mx-auto px-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8">My Orders</h1>

                {loading ? (
                    <div className="flex justify-center items-center min-h-[400px]">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-8">
                        <p className="text-red-500">{error}</p>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-center py-12 bg-base-100 rounded-lg shadow-md">
                        <p className="text-xl text-base-content/70 mb-4">You haven't placed any orders yet.</p>
                        <Link to="/foods" className="btn btn-primary">
                            Browse Foods
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                        {orders.map(order => (
                            <div key={order._id} className="bg-base-100 rounded-lg shadow-md overflow-hidden">
                                <div className="p-4 sm:p-6">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                                        <h3 className="text-xl font-bold mb-2 sm:mb-0">{order.foodName}</h3>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                            order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-blue-100 text-blue-800'
                                        }`}>
                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <p className="text-sm text-base-content/70">Order Date</p>
                                            <p className="font-medium">{new Date(order.orderDate).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-base-content/70">Quantity</p>
                                            <p className="font-medium">{order.quantity}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-base-content/70">Total Price</p>
                                            <p className="font-medium text-primary">${order.totalPrice}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-base-content/70">Payment Status</p>
                                            <p className="font-medium">{order.paymentStatus}</p>
                                        </div>
                                    </div>

                                    <div className="border-t pt-4">
                                        <h4 className="font-semibold mb-2">Delivery Address</h4>
                                        <p className="text-base-content/70">{order.deliveryAddress}</p>
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

export default MyOrders; 