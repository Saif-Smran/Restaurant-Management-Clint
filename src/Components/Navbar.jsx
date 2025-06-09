import { Link, NavLink } from 'react-router-dom';
import { useContext, useState, useEffect, useRef } from 'react';
import { HiHome, HiOutlineMenu, HiX } from 'react-icons/hi';
import {
  FaUtensils,
  FaImages,
  FaPlus,
  FaBox,
  FaSignOutAlt,
  FaSignInAlt,
} from 'react-icons/fa';
import { AuthContext } from '../Provider/AuthProvider';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../assets/Logo.png';

const navbarLinks = [
  { to: '/', label: 'Home', Icon: HiHome },
  { to: '/foods', label: 'All Foods', Icon: FaUtensils },
  { to: '/gallery', label: 'Gallery', Icon: FaImages },
];

export default function Navbar() {
  const { user, Logout, loading } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  const handleLogout = async () => {
    try {
      await Logout();
      setDropdownOpen(false);
      setMobileMenuOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, pointerEvents: 'none' },
    visible: { opacity: 1, y: 0, pointerEvents: 'auto' },
  };

  const mobileMenuVariants = {
    hidden: { x: '100%' },
    visible: { x: 0 },
  };

  // NavLink active class helper
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-1 transition-colors ${
      isActive ? 'text-primary font-semibold' : 'text-gray-700 hover:text-primary'
    }`;

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      {/* Logo */}
      <NavLink
        to="/"
        className="flex items-center gap-2 text-2xl font-extrabold text-primary hover:text-primary-dark transition-colors"
        onClick={() => setMobileMenuOpen(false)}
      >
        <img src={Logo} alt="RestoEase Logo" className="w-10 h-10" />
        RestoEase
      </NavLink>

      {/* Desktop Nav Links */}
      <div className="hidden md:flex items-center space-x-8 font-medium">
        {navbarLinks.map(({ to, label, Icon }) => (
          <NavLink key={to} to={to} className={navLinkClass}>
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </div>

      {/* Hamburger Menu Button (Mobile) */}
      <button
        onClick={() => setMobileMenuOpen((prev) => !prev)}
        className="md:hidden text-primary focus:outline-none focus:ring-2 focus:ring-primary rounded"
        aria-label="Toggle mobile menu"
        aria-expanded={mobileMenuOpen}
      >
        {mobileMenuOpen ? <HiX size={28} /> : <HiOutlineMenu size={28} />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileMenuVariants}
            transition={{ type: 'tween' }}
            className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg border-l border-gray-200 z-50 flex flex-col p-6 space-y-6"
          >
            <nav className="flex flex-col space-y-4 font-medium">
              {navbarLinks.map(({ to, label, Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 ${
                      isActive ? 'text-primary font-semibold' : 'text-gray-700 hover:text-primary'
                    }`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon size={18} />
                  {label}
                </NavLink>
              ))}
            </nav>

            {loading ? (
              <div className="flex justify-center py-4">
                <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-300 h-8 w-8"></div>
              </div>
            ) : user ? (
              <div className="flex flex-col space-y-4 border-t pt-4">
                <div className="flex items-center gap-3">
                  <img
                    src={user.photoURL || '/default-avatar.png'}
                    alt={user.displayName || 'User avatar'}
                    className="w-10 h-10 rounded-full border-2 border-primary object-cover"
                  />
                  <span className="font-semibold">{user.displayName || 'User'}</span>
                </div>
                <NavLink
                  to="/my-foods"
                  className="flex items-center gap-2 hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaUtensils /> My Foods
                </NavLink>
                <NavLink
                  to="/add-food"
                  className="flex items-center gap-2 hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaPlus /> Add Food
                </NavLink>
                <NavLink
                  to="/my-orders"
                  className="flex items-center gap-2 hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaBox /> My Orders
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-600 hover:text-red-800 font-semibold"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            ) : (
              <NavLink
                to="/login"
                className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md font-semibold justify-center hover:bg-primary-dark transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaSignInAlt /> Login
              </NavLink>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* User Section Desktop */}
      <div className="relative hidden md:flex items-center ml-6">
        {loading ? (
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-300 h-8 w-8"></div>
        ) : user ? (
          <>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="focus:outline-none focus:ring-2 focus:ring-primary rounded-full"
              aria-label="User menu"
              aria-expanded={dropdownOpen}
              title={user.displayName || 'User'}
            >
              <img
                src={user.photoURL || '/default-avatar.png'}
                alt={user.displayName || 'User avatar'}
                className="w-10 h-10 rounded-full border-2 border-primary object-cover"
              />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  ref={dropdownRef}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={dropdownVariants}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 text-gray-700 font-semibold"
                  role="menu"
                  aria-orientation="vertical"
                >
                  <NavLink
                    to="/my-foods"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-primary/10 transition-colors"
                    role="menuitem"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <FaUtensils /> My Foods
                  </NavLink>
                  <NavLink
                    to="/add-food"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-primary/10 transition-colors"
                    role="menuitem"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <FaPlus /> Add Food
                  </NavLink>
                  <NavLink
                    to="/my-orders"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-primary/10 transition-colors"
                    role="menuitem"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <FaBox /> My Orders
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 mt-1 border-t border-gray-200 text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                    role="menuitem"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <NavLink
            to="/auth/login"
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md font-semibold hover:bg-primary-dark transition-colors"
          >
            <FaSignInAlt /> Login
          </NavLink>
        )}
      </div>

      {/* Loader spinner styles */}
      <style>{`
        .loader {
          border-top-color: #3498db;
          animation: spin 1s ease-in-out infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </nav>
  );
}
