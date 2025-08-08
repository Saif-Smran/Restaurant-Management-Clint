import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  const navLinkClass = ({ isActive }) =>
    `block px-3 py-2 rounded-md transition-colors ${
      isActive
        ? 'bg-primary/15 text-primary font-medium'
        : 'text-base-content/80 hover:text-base-content hover:bg-base-200'
    }`;

  return (
    <div className="min-h-svh bg-base-200 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-base-100 border-r border-base-300 h-svh p-6 flex flex-col sticky top-0">
        <h2 className="text-xl font-bold mb-6 text-base-content">Dashboard</h2>
        <nav className="flex flex-col gap-2">
          <NavLink to="/dashboard" end className={navLinkClass}>Overview</NavLink>
          <NavLink to="/dashboard/add-food" className={navLinkClass}>Add Food</NavLink>
          <NavLink to="/dashboard/my-foods" className={navLinkClass}>Manage Foods</NavLink>
          <NavLink to="/dashboard/my-orders" className={navLinkClass}>My Orders</NavLink>
        </nav>
        <div className="mt-6">
          <Link to="/" className="text-sm text-base-content/60 hover:text-primary">← Back to site</Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-base-200 py-8 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
