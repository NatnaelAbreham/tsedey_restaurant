
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
  FaUtensils,
  FaPlus,
  FaEdit,
  FaBoxes,
  FaClipboardList,
  FaChartBar,
  FaTachometerAlt,
  FaCalendarAlt,
  FaChevronDown,
} from "react-icons/fa";

const navItems = [
  { label: "Menu", path: "/menu", icon: FaUtensils },
  { label: "Add Item", path: "/addmenu", icon: FaPlus },
  { label: "Update", path: "/updatemenu", icon: FaEdit },
  { label: "Inventory", path: "/addquantity", icon: FaBoxes },
  { label: "Orders", path: "/ordermanagement", icon: FaClipboardList },
  { label: "Reports", path: "/report", icon: FaChartBar },
  { label: "Dashboard", path: "/dashboard", icon: FaTachometerAlt },
  { label: "Schedule", path: "/menuschedule", icon: FaCalendarAlt },
];

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

  const surface = darkMode
    ? "bg-gray-950 text-white border-gray-800"
    : "bg-white text-gray-900 border-gray-200";

  const mutedText = darkMode ? "text-gray-400" : "text-gray-500";

  const navLinkClass = (path) => {
    const active = isActive(path);

    return `group relative flex items-center gap-2 whitespace-nowrap
    rounded-full px-4 py-2.5 text-[13px] font-semibold
    transition-all duration-300 ease-in-out
    ${active
        ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
        : darkMode
          ? "text-gray-300 hover:bg-gray-800 hover:text-white"
          : "text-gray-600 hover:bg-white hover:text-orange-600 hover:shadow-sm"
      }`;
  };


  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setProfileOpen(false);
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
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

  const renderNavLinks = (mobile = false) =>
    navItems.map(({ label, path, icon: Icon }) => (
      <Link
        key={path}
        to={path}
        onClick={() => {
          if (mobile) setMobileOpen(false);
        }}
        className={
          mobile
            ? `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${isActive(path)
              ? "bg-orange-500 text-white"
              : darkMode
                ? "text-gray-300 hover:bg-gray-800"
                : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
            }`
            : navLinkClass(path)
        }
      >
        <Icon className="shrink-0 text-base" />
        <span>{label}</span>
      </Link>
    ));

  return (
    <nav
      className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-colors duration-300 ${surface}`}
    >
      {/* Main navbar */}
      <div className="mx-auto flex min-h-[76px] max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 xl:px-8">
        {/* Brand */}
        <Link
          to="/"
          className="group flex shrink-0 items-center gap-3"
          aria-label="Tsedey Restaurant home"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-lg shadow-orange-500/20 transition-transform duration-300 group-hover:rotate-3 group-hover:scale-105">
            <FaUtensils className="text-xl" />
          </div>

          <div className="leading-tight">
            <div className="text-lg font-extrabold tracking-tight sm:text-xl">
              Tsedey
              <span className="text-orange-500"> Restaurant</span>
            </div>
            <p
              className={`mt-1 text-[10px] font-semibold uppercase tracking-[0.19em] ${mutedText}`}
            >
              Restaurant Management
            </p>
          </div>
        </Link>

        {/* Desktop navigation */}


        <div className="hidden items-center xl:flex">
          <div
            className={`flex items-center gap-1 rounded-full border p-1 ${darkMode
                ? "border-gray-800 bg-gray-900"
                : "border-gray-200 bg-gray-50"
              }`}
          >
            {renderNavLinks()}
          </div>
        </div>


        {/* Actions */}
        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleDarkMode}
            className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200 hover:scale-105 ${darkMode
              ? "border-gray-700 bg-gray-900 text-yellow-400 hover:bg-gray-800"
              : "border-gray-200 bg-gray-50 text-gray-700 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
              }`}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            title={darkMode ? "Light mode" : "Dark mode"}
          >
            {darkMode ? (
              <FaSun className="text-lg" />
            ) : (
              <FaMoon className="text-base" />
            )}
          </button>

          {/* Cart */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex h-10 items-center justify-center gap-2 rounded-xl bg-orange-500 px-3.5 font-semibold text-white shadow-md shadow-orange-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-600 active:translate-y-0 sm:px-4"
            aria-label={`Open cart, ${totalItems} items`}
          >
            <FaShoppingCart className="text-base" />
            <span className="hidden text-sm sm:inline">Cart</span>

            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-red-500 px-1 text-[10px] font-bold text-white">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </button>

          {/* Profile dropdown */}
          <div className="relative hidden md:block" ref={profileRef}>
            <button
              onClick={() => setProfileOpen((previous) => !previous)}
              aria-expanded={profileOpen}
              aria-label="Open profile menu"
              className={`flex h-10 items-center gap-2 rounded-xl border px-2.5 transition ${profileOpen
                ? "border-orange-400 bg-orange-50 text-orange-600"
                : darkMode
                  ? "border-gray-800 bg-gray-900 text-gray-200 hover:bg-gray-800"
                  : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                }`}
            >
              <FaUserCircle className="text-2xl text-orange-500" />
              <span className="hidden max-w-24 truncate text-sm font-semibold lg:block">
                {user?.fullName?.split(" ")[0] || "Account"}
              </span>
              <FaChevronDown
                className={`hidden text-[10px] transition-transform lg:block ${profileOpen ? "rotate-180" : ""
                  }`}
              />
            </button>

            {profileOpen && (
              <div
                className={`absolute right-0 top-full mt-3 w-72 overflow-hidden rounded-2xl border shadow-2xl ${darkMode
                  ? "border-gray-800 bg-gray-900"
                  : "border-gray-200 bg-white"
                  }`}
              >
                <div
                  className={`border-b p-5 ${darkMode ? "border-gray-800" : "border-gray-100"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-md shadow-orange-500/20">
                      <FaUser className="text-xl" />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-bold">
                        {user?.fullName || "User"}
                      </p>
                      <p className={`mt-1 truncate text-xs ${mutedText}`}>
                        {user?.email || "Signed in"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      navigate("/profile");
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${darkMode
                      ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                      : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                      }`}
                  >
                    <FaUser />
                    My Profile
                  </button>

                  <button
                    onClick={handleLogout}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${darkMode
                      ? "text-red-400 hover:bg-red-500/10"
                      : "text-red-500 hover:bg-red-50"
                      }`}
                  >
                    <FaSignOutAlt />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile/tablet menu button */}
          <button
            className={`flex h-10 w-10 items-center justify-center rounded-xl border transition xl:hidden ${darkMode
              ? "border-gray-800 bg-gray-900 text-white hover:bg-gray-800"
              : "border-gray-200 bg-white text-gray-800 hover:bg-gray-50"
              }`}
            onClick={() => setMobileOpen((previous) => !previous)}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <FaTimes className="text-lg" />
            ) : (
              <FaBars className="text-lg" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile/tablet navigation drawer */}
      {mobileOpen && (
        <div
          className={`border-t xl:hidden ${darkMode
            ? "border-gray-800 bg-gray-950"
            : "border-gray-100 bg-white"
            }`}
        >
          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
            <div className="mb-4">
              <p
                className={`px-1 text-[11px] font-bold uppercase tracking-[0.2em] ${mutedText}`}
              >
                Navigation
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {renderNavLinks(true)}
            </div>

            {/* Mobile profile */}
            <div
              className={`mt-5 flex items-center justify-between gap-3 border-t pt-5 ${darkMode ? "border-gray-800" : "border-gray-100"
                }`}
            >
              <button
                onClick={() => {
                  setMobileOpen(false);
                  navigate("/profile");
                }}
                className="flex min-w-0 items-center gap-3 text-left"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white">
                  <FaUser />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold">
                    {user?.fullName || "My Profile"}
                  </p>
                  <p className={`truncate text-xs ${mutedText}`}>
                    {user?.email || "Manage your account"}
                  </p>
                </div>
              </button>

              <button
                onClick={handleLogout}
                className="flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50 dark:hover:bg-red-500/10"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;