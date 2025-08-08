import React from 'react';
import { Link } from 'react-router-dom';

const DashboardCard = ({ title, children, viewAllLink, viewAllText = "View All" }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
        {viewAllLink && (
          <Link
            to={viewAllLink}
            className="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            {viewAllText}
          </Link>
        )}
      </div>
      {children}
    </div>
  );
};

export default DashboardCard;
