
import { useEffect, useMemo, useState, useCallback } from "react";
import MenuCard from "./MenuCard";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import api from "../api/api";

const Menu = ({ limit }) => {
  const [menuStatus, setMenuStatus] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [countdown, setCountdown] = useState("");

  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const { darkMode } = useTheme();

  const checkMenuStatus = useCallback(async () => {
    try {
      const response = await api.get("/MenuSchedule/status");
      setMenuStatus(response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to check menu status:", error);
      setError("Unable to check menu availability. Please try again.");
      return null;
    } finally {
      setLoadingStatus(false);
    }
  }, []);

  const getMenuItems = useCallback(async () => {
    try {
      const response = await api.get("/getitem");
      const data = response.data.data ?? [];

      const items = data.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        categoryId: item.categoryId,
        category: item.categoryId === 1 ? "Food" : "Drinks",
        image: `/uploads/${(item.imageUrl ?? "").replace("itemimage/", "")}`,
        popular: false,
        quantityLimit: item.quantityLimit,
        isAvailable: item.isAvailable,
        quantityAvailable: item.quantityAvailable,
      }));

      setMenuItems(items);
      setError("");
    } catch (error) {
      console.error("Error fetching menu:", error);
      setError("Failed to load menu.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Check the schedule first, then load menu items only if open.
  useEffect(() => {
    let cancelled = false;

    const initializeMenu = async () => {
      const status = await checkMenuStatus();

      if (cancelled) return;

      if (status?.isOpen) {
        await getMenuItems();
      } else {
        setLoading(false);
      }
    };

    initializeMenu();

    return () => {
      cancelled = true;
    };
  }, [checkMenuStatus, getMenuItems]);

  // Refresh the schedule periodically.
  useEffect(() => {
    const interval = setInterval(async () => {
      const status = await checkMenuStatus();

      if (status?.isOpen) {
        await getMenuItems();
      } else if (status && !status.isOpen) {
        setMenuItems([]);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [checkMenuStatus, getMenuItems]);

  // Countdown until the next opening time.
  useEffect(() => {
    if (!menuStatus || menuStatus.isOpen || !menuStatus.nextOpening) {
      setCountdown("");
      return;
    }

    const updateCountdown = () => {
      const target = new Date(menuStatus.nextOpening).getTime();
      const difference = target - Date.now();

      if (difference <= 0) {
        setCountdown("00:00:00");
        return;
      }

      const hours = Math.floor(difference / 3600000);
      const minutes = Math.floor((difference % 3600000) / 60000);
      const seconds = Math.floor((difference % 60000) / 1000);

      setCountdown(
        `${String(hours).padStart(2, "0")}:` +
        `${String(minutes).padStart(2, "0")}:` +
        `${String(seconds).padStart(2, "0")}`
      );
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [menuStatus]);

  const categories = useMemo(
    () => ["All", ...new Set(menuItems.map((item) => item.category))],
    [menuItems]
  );

  const filteredItems =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  const displayItems = limit
    ? filteredItems.slice(0, limit)
    : filteredItems;

  if (loadingStatus || (loading && menuStatus?.isOpen)) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          darkMode
            ? "bg-gray-950 text-white"
            : "bg-[#e7f2fd] text-gray-900"
        }`}
      >
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-orange-500" />
          <p className="mt-4">Checking menu availability...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center px-4 ${
          darkMode
            ? "bg-gray-950 text-white"
            : "bg-[#e7f2fd] text-gray-900"
        }`}
      >
        <div className="text-center">
          <p className="text-red-500">{error}</p>
          <button
            onClick={async () => {
              setError("");
              setLoading(true);
              const status = await checkMenuStatus();
              if (status?.isOpen) await getMenuItems();
              else setLoading(false);
            }}
            className="mt-4 rounded-full bg-orange-500 px-6 py-2 text-white hover:bg-orange-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Closed menu screen.
  if (menuStatus && !menuStatus.isOpen) {
    return (
      <section
        className={`min-h-screen flex items-center justify-center px-5 py-16 transition-colors duration-300 ${
          darkMode
            ? "bg-gray-950 text-white"
            : "bg-[#e7f2fd] text-gray-900"
        }`}
      >
        <div className="w-full max-w-2xl text-center">
          <div className="mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-full bg-orange-500/10 text-5xl">
            🍽️
          </div>

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
            Thank you for visiting
          </p>

          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Our Kitchen Is Taking a Break
          </h1>

          <p
            className={`mx-auto mt-5 max-w-lg text-base leading-7 sm:text-lg ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            We're not accepting menu orders right now, but we'll be delighted
            to serve you when we reopen.
          </p>

          {menuStatus.nextOpening && (
            <div
              className={`mx-auto mt-9 max-w-md rounded-3xl border p-7 shadow-xl ${
                darkMode
                  ? "border-gray-800 bg-gray-900"
                  : "border-white bg-white/80"
              }`}
            >
              <p
                className={`text-sm font-medium ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                WE OPEN IN
              </p>

              <div className="my-4 font-mono text-4xl font-extrabold tracking-wider text-orange-500 sm:text-5xl">
                {countdown || "--:--:--"}
              </div>

              <div
                className={`text-sm ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {menuStatus.nextOpeningDay && (
                  <span>{menuStatus.nextOpeningDay}</span>
                )}

                {menuStatus.nextOpeningTime && (
                  <span> at {menuStatus.nextOpeningTime}</span>
                )}
              </div>
            </div>
          )}

          {!menuStatus.nextOpening && (
            <p className="mt-8 text-sm text-gray-500">
              Our next opening time has not been announced. Please check back
              soon.
            </p>
          )}

          <p className="mt-8 text-sm text-gray-500">
            We look forward to serving you!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gray-950 text-white"
          : "bg-[#e7f2fd] text-gray-900"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold">
            {limit ? "Featured Menu" : "Our Menu"}
          </h2>

          {!limit && (
            <p
              className={`mt-2 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Delicious food & refreshing drinks
            </p>
          )}
        </div>

        {!limit && (
          <div className="mb-12 flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "scale-105 bg-orange-500 text-white shadow-lg"
                    : darkMode
                    ? "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-orange-400"
                    : "border bg-white text-gray-700 hover:bg-gray-100 hover:text-orange-500"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {displayItems.length === 0 ? (
          <p className="py-12 text-center text-gray-500">
            No menu items are available right now.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Menu;