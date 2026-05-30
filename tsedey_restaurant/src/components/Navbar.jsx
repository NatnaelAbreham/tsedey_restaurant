// src/components/Navbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ cartItemCount, onCartClick, darkMode, toggleDarkMode }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`sticky top-0 z-50 backdrop-blur-md transition-colors duration-300 ${
      darkMode 
        ? 'bg-gray-800/80 border-gray-700' 
        : 'bg-white/80 border-gray-200'
    } border-b shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center shadow-md">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M12 15v6"
              />
            </svg>
          </div>
          <h1 className={`text-xl font-extrabold tracking-tight ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Tsedey <span className="text-orange-500">Restaurant</span>
          </h1>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className={`transition font-medium ${
              isActive('/') 
                ? 'text-orange-500' 
                : darkMode ? 'text-gray-300 hover:text-orange-500' : 'text-gray-600 hover:text-orange-500'
            }`}
          >
            Home
          </Link>
          <Link
            to="/menu"
            className={`transition font-medium ${
              isActive('/menu') 
                ? 'text-orange-500' 
                : darkMode ? 'text-gray-300 hover:text-orange-500' : 'text-gray-600 hover:text-orange-500'
            }`}
          >
            Menu
          </Link>
          <Link
            to="/offers"
            className={`transition font-medium ${
              isActive('/offers') 
                ? 'text-orange-500' 
                : darkMode ? 'text-gray-300 hover:text-orange-500' : 'text-gray-600 hover:text-orange-500'
            }`}
          >
            Offers
          </Link>
          <Link
            to="/contact"
            className={`transition font-medium ${
              isActive('/contact') 
                ? 'text-orange-500' 
                : darkMode ? 'text-gray-300 hover:text-orange-500' : 'text-gray-600 hover:text-orange-500'
            }`}
          >
            Contact
          </Link>
        </div>

        {/* Right side buttons */}
        <div className="flex items-center gap-3">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition ${
              darkMode 
                ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {darkMode ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={onCartClick}
            className="relative flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-orange-600 transition active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="font-medium">Cart</span>
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;