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
  FaUserCog,
  FaSun,
  FaMoon,
  FaTachometerAlt
} from 'react-icons/fa';
import { AuthContext } from '../Provider/AuthProvider';
import { useTheme } from '../Provider/ThemeProvider';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import Logo from '../assets/Logo.png';
import axiosInstance from '../axios/axiosConfig';
import { useCallback } from 'react';

const navbarLinks = [
  { to: '/', label: 'Home', Icon: HiHome },
  { to: '/foods', label: 'All Foods', Icon: FaUtensils },
  { to: '/gallery', label: 'Gallery', Icon: FaImages },
];

export default function Navbar() {
  const { user, Logout, loading } = useContext(AuthContext);
  const { isDarkMode, toggleTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const dropdownRef = useRef();

  const fetchUserData = useCallback(async (email) => {
    try {
      const token = await user?.getIdToken();
      const { data } = await axiosInstance.get(`/users/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (err) {
      console.error('Error fetching user data:', err);
      return null;
    }
  }, [user]);

  useEffect(() => {
    if (user?.email) {
      fetchUserData(user.email).then(setUserData);
    } else {
      setUserData(null);
    }
  }, [user, fetchUserData]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await Logout();
      setDropdownOpen(false);
      setMobileMenuOpen(false);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const handleThemeToggle = () => {
    console.log('Theme toggle clicked');
    toggleTheme();
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-1 transition-colors ${isActive ? 'text-primary font-semibold' : 'text-base-content hover:text-primary dark:hover:text-primary'}`;

  return (
    <nav className="bg-base-100 dark:bg-dark-bg shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50 navbar">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold text-primary font-poppins">
        <img src={Logo} alt="Logo" className="w-10 h-10" />
        RestoEase
      </Link>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center space-x-8 font-medium font-quicksand">
    {navbarLinks.map(({ to, label, Icon: IconCmp }) => (
          <NavLink key={to} to={to} className={navLinkClass}>
      {IconCmp ? <IconCmp size={18} /> : null}
            {label}
          </NavLink>
        ))}
      </div>

      {/* Right side items */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle Button */}
        <button
          onClick={handleThemeToggle}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-card transition-colors"
          aria-label="Toggle theme"
        >
          {!isDarkMode ? (
            <FaSun className="text-yellow-400" size={20} />
          ) : (
            <FaMoon className="text-gray-700 dark:text-gray-300" size={20} />
          )}
        </button>

        {/* Hamburger (Mobile) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-primary font-quicksand"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <HiX size={28} /> : <HiOutlineMenu size={28} />}
        </button>

        {/* User dropdown (desktop) */}
        <div className="relative hidden md:block">
          {loading ? (
            <div className="loader w-8 h-8 border-t-4 border-gray-300 dark:border-gray-600 rounded-full animate-spin" />
          ) : user ? (
            <>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="focus:outline-none"
                title={userData?.name || user.displayName}
              >
                <img
                  src={userData?.photoURL || user.photoURL || '/default-avatar.png'}
                  alt="User"
                  className="w-10 h-10 rounded-full border border-primary object-cover"
                />
              </button>

              {dropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 top-full mt-2 w-52 bg-base-200 dark:bg-dark-card border border-gray-200 dark:border-gray-700 shadow-lg rounded-md py-2 z-50 font-quicksand"
                >
                  <div className="px-4 py-2 border-b dark:border-gray-700">
                    <p className="text-sm font-medium font-poppins dark:text-dark-text">{userData?.name || user.displayName}</p>
                    <p className="text-xs text-base-content font-nunito">{userData?.email || user.email}</p>
                    {userData?.role === 'admin' && (
                      <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded mt-1 inline-block font-raleway">
                        Admin
                      </span>
                    )}
                  </div>
                  <NavLink to="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-base-300">Dashboard</NavLink>
                  <NavLink to="/dashboard/my-foods" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-base-300">My Foods</NavLink>
                  <NavLink to="/dashboard/add-food" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-base-300">Add Food</NavLink>
                  <NavLink to="/dashboard/my-orders" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-base-300">My Orders</NavLink>
                  {userData?.role === 'admin' && (
                    <NavLink to="/admin/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                      Admin Dashboard
                    </NavLink>
                  )}
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <NavLink to="/auth/login" className="btn btn-primary flex items-center gap-2 font-quicksand">
              <FaSignInAlt /> Login
            </NavLink>

          )}
        </div>
      </div>

      {/* Mobile menu */}
    <AnimatePresence>
        {mobileMenuOpen && (
      <Motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
            className="fixed top-0 right-0 w-64 h-full bg-base-200 dark:bg-dark-bg shadow-lg z-50 flex flex-col p-6 space-y-6 font-quicksand"
          >
            {/* Theme Toggle in Mobile Menu */}
            <button
              onClick={handleThemeToggle}
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
            >
              {!isDarkMode ? (
                <>
                  <FaSun className="text-yellow-400" size={20} />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <FaMoon className="text-gray-700" size={20} />
                  <span>Dark Mode</span>
                </>
              )}
            </button>

      {navbarLinks.map(({ to, label, Icon: IconCmp }) => (
              <NavLink
                key={to}
                to={to}
                className={navLinkClass}
                onClick={() => setMobileMenuOpen(false)}
              >
        {IconCmp ? <IconCmp size={18} /> : null}
                {label}
              </NavLink>
            ))}

            {user ? (
              <div className="border-t dark:border-gray-700 pt-4 space-y-2">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
                  <img
                    src={user?.photoURL || '/default-avatar.png'}
                    alt="User"
                    className="w-10 h-10 rounded-full border border-primary"
                  />
                  <span className="font-semibold font-poppins dark:text-dark-text">{userData?.name || user.displayName || 'User'}</span>
                </div>

                {dropdownOpen && (
                  <div className="mt-2 bg-gray-50 dark:bg-dark-card p-2 rounded shadow-inner space-y-2">
                    <p className="text-sm font-medium font-poppins dark:text-dark-text">{userData?.name || user.displayName}</p>
                    <p className="text-xs text-secondary-content dark:text-base-content font-nunito">{userData?.email || user.email}</p>
                    {userData?.role === 'admin' && (
                      <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded inline-block font-raleway">
                        Admin
                      </span>
                    )}
                    <NavLink to="/dashboard" onClick={() => { setMobileMenuOpen(false); setDropdownOpen(false); }} className="block hover:text-primary dark:text-base-content">Dashboard</NavLink>
                    <NavLink to="/dashboard/my-foods" onClick={() => { setMobileMenuOpen(false); setDropdownOpen(false); }} className="block hover:text-primary dark:text-base-content">My Foods</NavLink>
                    <NavLink to="/dashboard/add-food" onClick={() => { setMobileMenuOpen(false); setDropdownOpen(false); }} className="block hover:text-primary dark:text-base-content">Add Food</NavLink>
                    <NavLink to="/dashboard/my-orders" onClick={() => { setMobileMenuOpen(false); setDropdownOpen(false); }} className="block hover:text-primary dark:text-base-content">My Orders</NavLink>
                    {userData?.role === 'admin' && (
                      <NavLink to="/admin/dashboard" onClick={() => { setMobileMenuOpen(false); setDropdownOpen(false); }} className="block hover:text-primary dark:text-dark-text">
                        Admin Dashboard
                      </NavLink>
                    )}
                    <button onClick={() => { handleLogout(); setDropdownOpen(false); }} className="text-left w-full text-red-600 hover:text-red-800 dark:hover:text-red-400">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                to="/auth/login"
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaSignInAlt /> Login
              </NavLink>
            )}
          </Motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
