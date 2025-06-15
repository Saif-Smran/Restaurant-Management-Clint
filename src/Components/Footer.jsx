import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo.png';

export default function Footer() {
  return (
    <footer className="bg-base-100 text-gray-800 py-8 sm:py-10 px-4 sm:px-6 md:px-12 lg:px-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">

        {/* Logo & About */}
        <div className="text-center sm:text-left">
          <Link to="/" className="inline-flex items-center gap-2 text-2xl sm:text-3xl font-extrabold text-primary hover:text-primary-focus transition-colors">
            <img src={Logo} alt="RestoEase Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
            RestoEase
          </Link>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-base-content font-nunito max-w-md mx-auto sm:mx-0">
            Your go-to platform for delicious foods and easy ordering. Experience great taste with ease!
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center sm:text-left">
          <h3 className="text-lg sm:text-xl text-base-content font-semibold mb-3 sm:mb-4 border-b border-primary-focus pb-2">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-base-content hover:text-primary-focus transition-colors text-sm sm:text-base">Home</Link>
            </li>
            <li>
              <Link to="/foods" className="text-base-content hover:text-primary-focus transition-colors text-sm sm:text-base">All Foods</Link>
            </li>
            <li>
              <Link to="/gallery" className="text-base-content hover:text-primary-focus transition-colors text-sm sm:text-base">Gallery</Link>
            </li>
            <li>
              <Link to="/login" className="text-base-content hover:text-primary-focus transition-colors text-sm sm:text-base">Login</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="text-center sm:text-left">
          <h3 className="text-lg sm:text-xl text-base-content font-semibold mb-3 sm:mb-4 border-b border-primary-focus pb-2">Contact Us</h3>
          <p className="text-base-content mb-2 text-sm sm:text-base">
            Email: <a href="mailto:support@restoease.com" className="underline hover:text-primary-focus">support@restoease.com</a>
          </p>
          <p className="text-base-content mb-4 text-sm sm:text-base">Phone: +1 (555) 123-4567</p>
          <div className="flex justify-center sm:justify-start space-x-4 text-base-content">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-primary-focus transition-colors">
              <FaFacebookF size={18} className="sm:w-5 sm:h-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-primary-focus transition-colors">
              <FaTwitter size={18} className="sm:w-5 sm:h-5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-primary-focus transition-colors">
              <FaInstagram size={18} className="sm:w-5 sm:h-5" />
            </a>
            <a href="mailto:support@restoease.com" aria-label="Email" className="hover:text-primary-focus transition-colors">
              <FaEnvelope size={18} className="sm:w-5 sm:h-5" />
            </a>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="text-center sm:text-left">
          <h3 className="text-lg sm:text-xl text-base-content font-semibold mb-3 sm:mb-4 border-b border-primary-focus pb-2">Newsletter</h3>
          <p className="text-base-content mb-4 text-sm sm:text-base">
            Subscribe to get the latest updates and offers.
          </p>
          <form className="flex flex-col sm:flex-row gap-2 max-w-xs mx-auto sm:mx-0">
            <input
              type="email"
              placeholder="Your email"
              aria-label="Email for newsletter"
              className="px-3 sm:px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-focus focus:border-primary-focus text-base-content text-sm sm:text-base"
            />
            <button
              type="submit"
              className="bg-primary text-white px-3 sm:px-4 py-2 rounded-md font-semibold hover:bg-primary-focus transition-colors text-sm sm:text-base"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mt-8 sm:mt-10 text-center text-gray-500 text-xs sm:text-sm">
        &copy; {new Date().getFullYear()} RestoEase. All rights reserved.
      </div>
    </footer>
  );
}
