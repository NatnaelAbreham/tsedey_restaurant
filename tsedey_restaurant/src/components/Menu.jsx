// src/components/Menu.jsx
import React, { useMemo, useState } from "react";
import MenuCard from "./MenuCard";

import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";

const menuItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    description:
      "Fresh mozzarella, tomato sauce, basil, and extra virgin olive oil",
    price: 12.99,
    category: "Food",
    image:
      "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400&h=300&fit=crop",
    popular: true,
  },
 
  {
    id: 7,
    name: "Coca Cola",
    description: "Chilled refreshing soft drink",
    price: 2.5,
    category: "Drinks",
    image:
      "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&h=300&fit=crop",
    popular: false,
  },
  
];

const Menu = ({ limit }) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const { addToCart } = useCart();
  const { darkMode } = useTheme();

  const categories = useMemo(() => {
    return ["All", ...new Set(menuItems.map((item) => item.category))];
  }, []);

  const filteredItems =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  const displayItems = limit
    ? filteredItems.slice(0, limit)
    : filteredItems;

 return (
  <section
    className={`min-h-screen transition-colors duration-300 ${
      darkMode ? "bg-gray-950 text-white" : "bg-[#e7f2fd] text-gray-900"
    }`}
  >
    {/* INNER CONTAINER */}
    <div className="max-w-7xl mx-auto px-4 py-16">

      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">
          {limit ? "Featured Menu" : "Our Menu"}
        </h2>

        {!limit && (
          <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            Delicious food & refreshing drinks
          </p>
        )}
      </div>

      {/* Categories */}
      {!limit && (
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-orange-500 text-white shadow-lg scale-105"
                  : darkMode
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-orange-400"
                  : "bg-white text-gray-700 border hover:bg-gray-100 hover:text-orange-500"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayItems.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>

    </div>
  </section>
);
};

export default Menu;