import axiosInstance from '../axios/axiosConfig';

export const dashboardService = {
  // Get user's dashboard data
  async getDashboardData(user) {
    try {
      const token = await user?.getIdToken();
      
      // Parallel requests for better performance
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

      // Calculate stats safely
      const totalRevenue = userOrders.reduce((sum, order) => sum + ((Number(order.price) || 0) * (Number(order.quantity) || 0)), 0);
      
      return {
        stats: {
          totalFoods: userFoods.length,
          totalOrders: userOrders.length,
          totalRevenue: totalRevenue,
          averageOrderValue: userOrders.length > 0 ? totalRevenue / userOrders.length : 0
        },
        recentFoods: userFoods.slice(0, 5),
        recentOrders: userOrders.slice(0, 5),
        allFoods: userFoods,
        allOrders: userOrders
      };
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw error;
    }
  },

  // Delete a food item
  async deleteFood(foodId, user) {
    const token = await user?.getIdToken();
    return axiosInstance.delete(`/foods/${foodId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Get user analytics for charts (if needed in future)
  async getAnalytics(user, period = '30d') {
    try {
      const token = await user?.getIdToken();
      const response = await axiosInstance.get(`/analytics/user/${user.email}?period=${period}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching analytics:', error);
      throw error;
    }
  }
};

export default dashboardService;
