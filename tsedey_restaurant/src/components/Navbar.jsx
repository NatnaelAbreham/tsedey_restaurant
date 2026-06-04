import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import { FaMoon, FaSun, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const location = useLocation();
  const { darkMode, toggleDarkMode } = useTheme();
  const { setIsCartOpen, totalItems } = useCart();

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `transition ${
      isActive(path)
        ? "text-orange-500"
        : darkMode
        ? "hover:text-orange-400"
        : "hover:text-orange-500"
    }`;

  return (
    <nav
      className={`sticky top-0 z-50 backdrop-blur-lg border-b transition-all duration-300 ${
        darkMode
          ? "bg-gray-900/80 border-gray-800 text-white"
          : "bg-white/80 border-gray-200 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-extrabold tracking-tight"
          onClick={() => setMobileOpen(false)}
        >
          Tsedey<span className="text-orange-500">Restaurant</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link to="/" className={linkClass("/")}>Home</Link>
          <Link to="/menu" className={linkClass("/menu")}>Menu</Link>
          <Link to="/contact" className={linkClass("/contact")}>Contact</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">

          {/* Dark mode */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:scale-105 transition"
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <FaSun className="text-yellow-400" />
            ) : (
              <FaMoon />
            )}
          </button>

          {/* Cart */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full transition shadow-md"
          >
            <FaShoppingCart />
            <span className="hidden sm:inline">Cart</span>

            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className={`md:hidden px-6 pb-4 pt-2 space-y-4 text-sm font-medium border-t ${
            darkMode
              ? "bg-gray-900 border-gray-800"
              : "bg-white border-gray-200"
          }`}
        >
          <Link
            to="/"
            className={linkClass("/")}
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/menu"
            className={linkClass("/menu")}
            onClick={() => setMobileOpen(false)}
          >
            Menu
          </Link>

          <Link
            to="/contact"
            className={linkClass("/contact")}
            onClick={() => setMobileOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;