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
  FaUserCog
} from 'react-icons/fa';
import { AuthContext } from '../Provider/AuthProvider';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../assets/Logo.png';
import axiosInstance from '../axios/axiosConfig';

const navbarLinks = [
  { to: '/', label: 'Home', Icon: HiHome },
  { to: '/foods', label: 'All Foods', Icon: FaUtensils },
  { to: '/gallery', label: 'Gallery', Icon: FaImages },
];

export default function Navbar() {
  const { user, Logout, loading } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const dropdownRef = useRef();

  const fetchUserData = async (email) => {
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
  };

  useEffect(() => {
    if (user?.email) {
      fetchUserData(user.email).then(setUserData);
    } else {
      setUserData(null);
    }
  }, [user]);

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

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-1 transition-colors ${isActive ? 'text-primary font-semibold' : 'text-gray-700 hover:text-primary'
    }`;

  return (
    <nav className="bg-base-100 shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold text-primary font-poppins">
        <img src={Logo} alt="Logo" className="w-10 h-10" />
        RestoEase
      </Link>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center space-x-8 font-medium font-quicksand">
        {navbarLinks.map(({ to, label, Icon }) => (
          <NavLink key={to} to={to} className={navLinkClass}>
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </div>

      {/* Hamburger (Mobile) */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden text-primary font-quicksand"
        aria-label="Toggle mobile menu"
      >
        {mobileMenuOpen ? <HiX size={28} /> : <HiOutlineMenu size={28} />}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
            className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 flex flex-col p-6 space-y-6 font-quicksand"
          >
            {navbarLinks.map(({ to, label, Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={navLinkClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}

            {user ? (
              <div className="border-t pt-4 space-y-2">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
                  <img
                    src={user?.photoURL || '/default-avatar.png'}
                    alt="User"
                    className="w-10 h-10 rounded-full border border-primary"
                  />
                  <span className="font-semibold font-poppins">{userData?.name || user.displayName || 'User'}</span>
                </div>

                {dropdownOpen && (
                  <div className="mt-2 bg-gray-50 p-2 rounded shadow-inner space-y-2">
                    <p className="text-sm font-medium font-poppins">{userData?.name || user.displayName}</p>
                    <p className="text-xs text-gray-600 font-nunito">{userData?.email || user.email}</p>
                    {userData?.role === 'admin' && (
                      <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded inline-block font-raleway">
                        Admin
                      </span>
                    )}
                    <NavLink to="/my-foods" onClick={() => { setMobileMenuOpen(false); setDropdownOpen(false); }} className="block hover:text-primary font-quicksand">My Foods</NavLink>
                    <NavLink to="/add-food" onClick={() => { setMobileMenuOpen(false); setDropdownOpen(false); }} className="block hover:text-primary font-quicksand">Add Food</NavLink>
                    <NavLink to="/my-orders" onClick={() => { setMobileMenuOpen(false); setDropdownOpen(false); }} className="block hover:text-primary font-quicksand">My Orders</NavLink>
                    {userData?.role === 'admin' && (
                      <NavLink to="/admin/dashboard" onClick={() => { setMobileMenuOpen(false); setDropdownOpen(false); }} className="block hover:text-primary font-quicksand">
                        Admin Dashboard
                      </NavLink>
                    )}
                    <button onClick={() => { handleLogout(); setDropdownOpen(false); }} className="text-left w-full text-red-600 hover:text-red-800 font-quicksand">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <NavLink 
                to="/login" 
                className="flex items-center gap-2 text-gray-700 hover:text-primary font-quicksand"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaSignInAlt /> Login
              </NavLink>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* User dropdown (desktop) */}
      <div className="relative hidden md:flex items-center ml-4">
        {loading ? (
          <div className="loader w-8 h-8 border-t-4 border-gray-300 rounded-full animate-spin" />
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
                className="absolute right-0 top-full mt-2 w-52 bg-white border border-gray-200 shadow-lg rounded-md py-2 z-50 font-quicksand"
              >
                <div className="px-4 py-2 border-b">
                  <p className="text-sm font-medium font-poppins">{userData?.name || user.displayName}</p>
                  <p className="text-xs text-gray-500 font-nunito">{userData?.email || user.email}</p>
                  {userData?.role === 'admin' && (
                    <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded mt-1 inline-block font-raleway">
                      Admin
                    </span>
                  )}
                </div>
                <NavLink to="/my-foods" className="block px-4 py-2 hover:bg-gray-100">My Foods</NavLink>
                <NavLink to="/add-food" className="block px-4 py-2 hover:bg-gray-100">Add Food</NavLink>
                <NavLink to="/my-orders" className="block px-4 py-2 hover:bg-gray-100">My Orders</NavLink>
                {userData?.role === 'admin' && (
                  <NavLink to="/admin/dashboard" className="block px-4 py-2 hover:bg-gray-100">
                    Admin Dashboard
                  </NavLink>
                )}
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50">
                  Logout
                </button>
              </div>
            )}

          </>
        ) : (
          <NavLink to="/login" className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark font-quicksand">
            <FaSignInAlt /> Login
          </NavLink>
        )}
      </div>
    </nav>
  );
}
