
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import { FaMoon, FaSun } from "react-icons/fa";


const Navbar = () => {
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useTheme();
  const { setIsCartOpen, totalItems } = useCart();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`sticky top-0 z-50 backdrop-blur-md transition-colors duration-300 ${darkMode ? "bg-gray-800/80" : "bg-white/80"
      } shadow-sm`}>

      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between">

        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          Tsedey Restaurant
        </Link>

        {/* Links */}
        <div className="hidden md:flex gap-6">
          <Link className={isActive("/") ? "text-orange-500" : ""} to="/">Home</Link>
          <Link className={isActive("/menu") ? "text-orange-500" : ""} to="/menu">Menu</Link>
          <Link className={isActive("/contact") ? "text-orange-500" : ""} to="/contact">Contact</Link>
        </div>

        {/* Actions */}
        <div className="flex gap-3 items-center">

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-white/90 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors shadow-md flex items-center justify-center"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <FaMoon className="text-yellow-400" /> : <FaSun className="text-orange-500" />}
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="bg-orange-500 text-white px-4 py-2 rounded-full relative"
          >
            Cart
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;