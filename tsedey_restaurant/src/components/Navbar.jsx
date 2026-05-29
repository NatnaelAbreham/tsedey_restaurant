// src/components/Navbar.jsx
import React from "react";

const Navbar = ({ cartItemCount, onCartClick }) => {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2">
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

          <h1 className="text-xl font-extrabold text-gray-800 tracking-tight">
            Taste<span className="text-orange-500">Haven</span>
          </h1>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#"
            className="text-gray-600 hover:text-orange-500 transition font-medium"
          >
            Menu
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-orange-500 transition font-medium"
          >
            Offers
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-orange-500 transition font-medium"
          >
            Contact
          </a>
        </div>

        {/* Cart Button */}
        <button
          onClick={onCartClick}
          className="relative flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-orange-600 transition active:scale-95"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>

          <span className="font-medium">Cart</span>

          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartItemCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;