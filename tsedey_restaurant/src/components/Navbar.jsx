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

  const linkClass = (path) => {
    const active = isActive(path);

    return `
    relative px-3 py-2 rounded-full text-sm font-medium transition-all duration-300
    ${active
        ? "bg-orange-500 text-white shadow-md shadow-orange-500/30"
        : darkMode
          ? "text-gray-300 hover:text-white hover:bg-gray-800"
          : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
      }
  `;
  };

  return (
    <nav
      className={`sticky top-0 z-50 backdrop-blur-lg border-b transition-all duration-300 ${darkMode
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
          <Link to="/" className={linkClass("/")}>
            Home
          </Link>

          <Link to="/menu" className={linkClass("/menu")}>
            Menu
          </Link>

          <Link to="/contact" className={linkClass("/contact")}>
            Contact
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">

          {/* Dark mode - Hidden on mobile, visible on desktop */}
          <button
            onClick={toggleDarkMode}
            className="hidden md:flex items-center justify-center w-11 h-11 rounded-full
             bg-white/10 backdrop-blur-md border border-white/20
             hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg"
            aria-label="Toggle theme"
          >
            <div className={`transition-all duration-500 ${darkMode ? "rotate-180 text-yellow-400" : "text-gray-800"}`}>
              {darkMode ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
            </div>
          </button>

          {/* Cart */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full transition shadow-md"
          >
            <FaShoppingCart />
            <span className="hidden sm:inline">Cart</span>

            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 flex items-center justify-center text-xs font-bold text-white rounded-full bg-gradient-to-br from-orange-400 to-red-500 shadow-[0_0_12px_rgba(255,100,0,0.6)] animate-bounce">
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
          className={`md:hidden px-6 pb-4 pt-2 space-y-4 text-sm font-medium border-t ${darkMode
            ? "bg-gray-900 border-gray-800"
            : "bg-white border-gray-200"
            }`}
        >
          <Link
            to="/"
            className={`block ${linkClass("/")}`}
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/menu"
            className={`block ${linkClass("/menu")}`}
            onClick={() => setMobileOpen(false)}
          >
            Menu
          </Link>

          <Link
            to="/contact"
            className={`block ${linkClass("/contact")}`}
            onClick={() => setMobileOpen(false)}
          >
            Contact
          </Link>

          {/* Dark Mode Toggle - Now inside mobile menu */}
          <button
            onClick={() => {
              toggleDarkMode();
              setMobileOpen(false);
            }}
            className={`w-full flex items-center gap-3 py-2 ${darkMode ? "text-yellow-400" : ""
              }`}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
            <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;