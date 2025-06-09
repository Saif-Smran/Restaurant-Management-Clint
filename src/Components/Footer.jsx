import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo.png';

export default function Footer() {
  return (
    <footer className="bg-base-200 text-gray-800 py-10 px-6 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo & About */}
        <div>
          <Link to="/" className="flex items-center gap-2 text-3xl font-extrabold text-primary hover:text-primary-focus transition-colors">
            <img src={Logo} alt="RestoEase Logo" className="w-10 h-10" />
            RestoEase
          </Link>
          <p className="mt-4 text-gray-600">
            Your go-to platform for delicious foods and easy ordering. Experience great taste with ease!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 border-b border-primary-focus pb-2">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-primary-focus transition-colors">Home</Link>
            </li>
            <li>
              <Link to="/foods" className="hover:text-primary-focus transition-colors">All Foods</Link>
            </li>
            <li>
              <Link to="/gallery" className="hover:text-primary-focus transition-colors">Gallery</Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-primary-focus transition-colors">Login</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4 border-b border-primary-focus pb-2">Contact Us</h3>
          <p className="text-gray-600 mb-2">
            Email: <a href="mailto:support@restoease.com" className="underline hover:text-primary-focus">support@restoease.com</a>
          </p>
          <p className="text-gray-600 mb-4">Phone: +1 (555) 123-4567</p>
          <div className="flex space-x-4 text-gray-500">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-primary-focus transition-colors">
              <FaFacebookF size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-primary-focus transition-colors">
              <FaTwitter size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-primary-focus transition-colors">
              <FaInstagram size={20} />
            </a>
            <a href="mailto:support@restoease.com" aria-label="Email" className="hover:text-primary-focus transition-colors">
              <FaEnvelope size={20} />
            </a>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h3 className="text-xl font-semibold mb-4 border-b border-primary-focus pb-2">Newsletter</h3>
          <p className="text-gray-600 mb-4">
            Subscribe to get the latest updates and offers.
          </p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email"
              aria-label="Email for newsletter"
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-focus focus:border-primary-focus text-gray-800"
            />
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-md font-semibold hover:bg-primary-focus transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} RestoEase. All rights reserved.
      </div>
    </footer>
  );
}
