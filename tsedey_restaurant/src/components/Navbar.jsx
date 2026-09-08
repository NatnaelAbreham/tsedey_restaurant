
import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

import {
  FaMoon,
  FaSun,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaUserCircle,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  const { darkMode, toggleDarkMode } = useTheme();
  const { setIsCartOpen, totalItems } = useCart();
  const { user, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) => {
    const active = isActive(path);

    return `
      relative px-3 py-2 rounded-full text-sm font-medium transition-all duration-300
      ${
        active
          ? "bg-orange-500 text-white shadow-md shadow-orange-500/30"
          : darkMode
            ? "text-gray-300 hover:text-white hover:bg-gray-800"
            : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
      }
    `;
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setProfileOpen(false);
      setMobileOpen(false);

      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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

         {/*  <Link to="/" className={linkClass("/")}>
            Home
          </Link> */}

          <Link to="/menu" className={linkClass("/menu")}>
            Menu
          </Link>

          <Link to="/addmenu" className={linkClass("/addmenu")}>
            Add
          </Link>

          <Link to="/updatemenu" className={linkClass("/updatemenu")}>
            Update
          </Link>

          <Link to="/addquantity" className={linkClass("/addquantity")}>
            Quantity
          </Link>

          <Link
            to="/ordermanagement"
            className={linkClass("/ordermanagement")}
          >
            Order
          </Link>

         {/*  <Link to="/contact" className={linkClass("/contact")}>
            Contact
          </Link> */}

          <Link to="/report" className={linkClass("/report")}>
            Report
          </Link>

          <Link to="/dashboard" className={linkClass("/dashboard")}>
            Dashboard
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">

          {/* Dark mode */}
          <button
            onClick={toggleDarkMode}
            className="hidden md:flex items-center justify-center w-11 h-11 rounded-full
              bg-white/10 backdrop-blur-md border border-white/20
              hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg"
            aria-label="Toggle theme"
          >
            <div
              className={`transition-all duration-500 ${
                darkMode
                  ? "rotate-180 text-yellow-400"
                  : "text-gray-800"
              }`}
            >
              {darkMode ? (
                <FaSun className="text-lg" />
              ) : (
                <FaMoon className="text-lg" />
              )}
            </div>
          </button>

          {/* Cart */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full transition shadow-md"
          >
            <FaShoppingCart />

            <span className="hidden sm:inline">
              Cart
            </span>

            {totalItems > 0 && (
              <span
                className="absolute -top-2 -right-2 min-w-5 h-5 px-1
                  flex items-center justify-center text-xs font-bold
                  text-white rounded-full bg-gradient-to-br
                  from-orange-400 to-red-500 shadow-[0_0_12px_rgba(255,100,0,0.6)]
                  animate-bounce"
              >
                {totalItems}
              </span>
            )}
          </button>

          {/* Profile */}
          <div className="relative hidden md:block" ref={profileRef}>

            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className={`w-11 h-11 rounded-full flex items-center justify-center
                transition-all duration-300
                ${
                  darkMode
                    ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              aria-label="Profile menu"
            >
              <FaUserCircle className="text-2xl" />
            </button>

            {/* Dropdown */}
            {profileOpen && (
              <div
                className={`absolute right-0 mt-3 w-64 rounded-2xl
                  border shadow-xl overflow-hidden z-50
                  ${
                    darkMode
                      ? "bg-gray-900 border-gray-700"
                      : "bg-white border-gray-200"
                  }`}
              >

                {/* User information */}
                <div
                  className={`px-5 py-4 border-b ${
                    darkMode
                      ? "border-gray-700"
                      : "border-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center">
                      <FaUser />
                    </div>

                    <div className="min-w-0">
                      <p
                        className={`font-semibold truncate ${
                          darkMode
                            ? "text-white"
                            : "text-gray-900"
                        }`}
                      >
                        {user?.fullName || "User"}
                      </p>

                      <p
                        className={`text-xs truncate ${
                          darkMode
                            ? "text-gray-400"
                            : "text-gray-500"
                        }`}
                      >
                        {user?.email || ""}
                      </p>
                    </div>

                  </div>
                </div>

                {/* Profile */}
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    navigate("/profile");
                  }}
                  className={`w-full flex items-center gap-3 px-5 py-3 text-sm transition ${
                    darkMode
                      ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <FaUser />
                  <span>Profile</span>
                </button>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className={`w-full flex items-center gap-3 px-5 py-3 text-sm transition border-t ${
                    darkMode
                      ? "border-gray-700 text-red-400 hover:bg-gray-800"
                      : "border-gray-100 text-red-500 hover:bg-red-50"
                  }`}
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>

              </div>
            )}
          </div>

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

          {/* Profile */}
          <button
            onClick={() => {
              setMobileOpen(false);
              navigate("/profile");
            }}
            className={`w-full flex items-center gap-3 py-2 ${
              darkMode
                ? "text-gray-300"
                : "text-gray-700"
            }`}
          >
            <FaUser />
            <span>Profile</span>
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 py-2 text-red-500"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>

          {/* Dark Mode */}
          <button
            onClick={() => {
              toggleDarkMode();
              setMobileOpen(false);
            }}
            className={`w-full flex items-center gap-3 py-2 ${
              darkMode ? "text-yellow-400" : ""
            }`}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
            <span>
              {darkMode ? "Light Mode" : "Dark Mode"}
            </span>
          </button>

        </div>
      )}
    </nav>
  );
};

export default Navbar;


