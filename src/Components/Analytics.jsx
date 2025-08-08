import React from 'react';
import { FaUtensils, FaShoppingCart, FaDollarSign, FaChartLine } from 'react-icons/fa';

const Analytics = ({ stats }) => {
  const analytics = [
    {
      title: 'Total Foods',
      value: stats.totalFoods,
      icon: FaUtensils,
      color: 'red',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      iconColor: 'text-red-600',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: FaShoppingCart,
      color: 'blue',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue?.toFixed(2) || '0.00'}`,
      icon: FaDollarSign,
      color: 'green',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      iconColor: 'text-green-600',
    },
    {
      title: 'Avg Order Value',
      value: `$${stats.totalOrders > 0 ? (stats.totalRevenue / stats.totalOrders).toFixed(2) : '0.00'}`,
      icon: FaChartLine,
      color: 'purple',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      iconColor: 'text-purple-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {analytics.map((item, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="flex items-center">
            <div className={`p-3 rounded-full ${item.bgColor}`}>
              <item.icon className={`${item.iconColor} text-xl`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{item.title}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{item.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Analytics;
