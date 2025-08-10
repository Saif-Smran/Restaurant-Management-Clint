import React, { useState, useContext, useEffect, useCallback } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import {
  FaUtensils,
  FaShoppingCart,
  FaPlus,
  FaChartLine,
  FaEye,
  FaEdit,
  FaTrash,
  FaDollarSign
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axiosInstance from '../../axios/axiosConfig';
import { toast } from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalFoods: 0,
    totalOrders: 0,
    totalRevenue: 0,
    averageOrderValue: 0,
    recentOrders: []
  });
  const [recentFoods, setRecentFoods] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

  // Unified dashboard data fetch (same as dashboardService)
  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      const token = await user?.getIdToken();
      const validate = (s) => (s >= 200 && s < 300) || s === 404;
      const [foodsResponse, ordersResponse] = await Promise.all([
        axiosInstance.get(`/foods/user/${user.email}`, {
          headers: { Authorization: `Bearer ${token}` },
          validateStatus: validate
        }),
        axiosInstance.get(`/orders/${user.email}`, {
          headers: { Authorization: `Bearer ${token}` },
          validateStatus: validate
        })
      ]);
      const userFoods = foodsResponse.status === 404 ? [] : (foodsResponse.data || []);
      const userOrders = ordersResponse.status === 404 ? [] : (ordersResponse.data || []);
      const totalRevenue = userOrders.reduce((sum, order) => sum + ((Number(order.price) || 0) * (Number(order.quantity) || 0)), 0);
      setStats({
        totalFoods: userFoods.length,
        totalOrders: userOrders.length,
        totalRevenue: totalRevenue,
        averageOrderValue: userOrders.length > 0 ? totalRevenue / userOrders.length : 0,
        recentOrders: userOrders.slice(0, 5)
      });
      setRecentFoods(userFoods.slice(0, 5));
      setRecentOrders(userOrders.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      const status = error?.response?.status;
      // Avoid showing toast if we're about to redirect due to auth
      if (status !== 401 && status !== 403) {
        const msg = error?.response?.data?.error || 'Failed to load dashboard data';
        toast.error(msg);
      }
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user, fetchDashboardData]);

  const handleDeleteFood = async (foodId) => {
    if (window.confirm('Are you sure you want to delete this food item?')) {
      try {
        const token = await user?.getIdToken();
        await axiosInstance.delete(`/foods/${foodId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Food item deleted successfully');
        fetchDashboardData(); // Refresh data
      } catch (error) {
        console.error('Error deleting food:', error);
        toast.error('Failed to delete food item');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-base-content">
          Welcome back, {user?.displayName || 'Chef'}!
        </h1>
        <p className="text-base-content/70 mt-2">
          Here's what's happening with your restaurant today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-base-100 rounded-lg p-6 shadow-lg">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary/10">
              <FaUtensils className="text-primary text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-base-content/70">Total Foods</p>
              <p className="text-2xl font-bold text-base-content">{stats.totalFoods}</p>
            </div>
          </div>
        </div>

        <div className="bg-base-100 rounded-lg p-6 shadow-lg">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-info/10">
              <FaShoppingCart className="text-info text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-base-content/70">Total Orders</p>
              <p className="text-2xl font-bold text-base-content">{stats.totalOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-base-100 rounded-lg p-6 shadow-lg">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-success/10">
              <FaDollarSign className="text-success text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-base-content/70">Total Revenue</p>
              <p className="text-2xl font-bold text-base-content">${stats.totalRevenue.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-base-100 rounded-lg p-6 shadow-lg">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-accent/10">
              <FaChartLine className="text-accent text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-base-content/70">Avg Order Value</p>
              <p className="text-2xl font-bold text-base-content">
                ${stats.averageOrderValue.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-base-100 rounded-lg p-6 shadow-lg mb-8">
        <h2 className="text-xl font-bold text-base-content mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/dashboard/add-food"
            className="flex items-center p-4 bg-base-200 rounded-lg hover:bg-base-300 transition-colors"
          >
            <FaPlus className="text-primary text-lg mr-3" />
            <span className="font-medium text-base-content">Add New Food</span>
          </Link>
          <Link
            to="/dashboard/my-foods"
            className="flex items-center p-4 bg-base-200 rounded-lg hover:bg-base-300 transition-colors"
          >
            <FaUtensils className="text-secondary text-lg mr-3" />
            <span className="font-medium text-base-content">Manage Foods</span>
          </Link>
          <Link
            to="/dashboard/my-orders"
            className="flex items-center p-4 bg-base-200 rounded-lg hover:bg-base-300 transition-colors"
          >
            <FaShoppingCart className="text-success text-lg mr-3" />
            <span className="font-medium text-base-content">View Orders</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Foods */}
        <div className="bg-base-100 rounded-lg p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-base-content">Recent Foods</h2>
            <Link
              to="/dashboard/my-foods"
              className="text-primary hover:text-primary/80 text-sm font-medium"
            >
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {recentFoods.length > 0 ? (
              recentFoods.map((food) => (
                <div key={food._id} className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                  <div className="flex items-center">
                    <img
                      src={food.foodImage}
                      alt={food.foodName}
                      className="w-12 h-12 rounded-lg object-cover mr-3"
                    />
                    <div>
                      <h3 className="font-medium text-base-content">{food.foodName}</h3>
                      <p className="text-sm text-base-content/70">${food.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link
                      to={`/food/${food._id}`}
                      className="p-2 text-info hover:bg-base-300 rounded"
                    >
                      <FaEye />
                    </Link>
                    <Link
                      to={`/dashboard/update-food/${food._id}`}
                      className="p-2 text-success hover:bg-base-300 rounded"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => handleDeleteFood(food._id)}
                      className="p-2 text-error hover:bg-base-300 rounded"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <FaUtensils className="mx-auto text-4xl text-base-content/40 mb-4" />
                <p className="text-base-content/70">No foods added yet</p>
                <Link
                  to="/dashboard/add-food"
                  className="inline-block mt-2 text-primary hover:text-primary/80 font-medium"
                >
                  Add your first food →
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-base-100 rounded-lg p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-base-content">Recent Orders</h2>
            <Link
              to="/dashboard/my-orders"
              className="text-primary hover:text-primary/80 text-sm font-medium"
            >
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <div key={order._id} className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                      <FaShoppingCart className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-base-content">{order.foodName}</h3>
                      <p className="text-sm text-base-content/70">
                        Qty: {order.quantity} • ${(order.price * order.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-base-content/70">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <FaShoppingCart className="mx-auto text-4xl text-base-content/40 mb-4" />
                <p className="text-base-content/70">No orders yet</p>
                <Link
                  to="/foods"
                  className="inline-block mt-2 text-primary hover:text-primary/80 font-medium"
                >
                  Browse foods →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;