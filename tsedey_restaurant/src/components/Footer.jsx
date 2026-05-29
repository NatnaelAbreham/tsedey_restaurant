// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Left */}
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Tsedey Restaurant. All rights reserved.
        </p>

        {/* Center */}
        <div className="flex gap-4 text-sm text-gray-500">
          <a href="#" className="hover:text-orange-500 transition">
            Menu
          </a>
          <a href="#" className="hover:text-orange-500 transition">
            About
          </a>
          <a href="#" className="hover:text-orange-500 transition">
            Contact
          </a>
        </div>

        {/* Right */}
        <p className="text-sm text-gray-400">
          For Employee only
        </p>
      </div>
    </footer>
  );
};

export default Footer;