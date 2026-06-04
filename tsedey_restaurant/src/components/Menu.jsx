// src/components/Menu.jsx
import React, { useMemo, useState } from "react";
import MenuCard from "./MenuCard";

import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";

const menuItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Fresh mozzarella, tomato sauce, basil, and extra virgin olive oil",
    price: 12.99,
    category: "Food",
    image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400&h=300&fit=crop",
    popular: true,
  },
  {
    id: 2,
    name: "Spaghetti Carbonara",
    description: "Creamy sauce with pancetta, egg, pecorino cheese, and black pepper",
    price: 14.99,
    category: "Food",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=300&fit=crop",
    popular: true,
  },
  {
    id: 3,
    name: "Caesar Salad",
    description: "Crisp romaine, parmesan, croutons, and creamy caesar dressing",
    price: 8.99,
    category: "Food",
    image: "https://images.unsplash.com/photo-1550304943-4f24f54dd8c9?w=400&h=300&fit=crop",
    popular: false,
  },
  {
    id: 4,
    name: "Grilled Salmon",
    description: "Atlantic salmon with lemon butter sauce, served with vegetables",
    price: 22.99,
    category: "Food",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop",
    popular: true,
  },
  {
    id: 5,
    name: "Cheeseburger",
    description: "Angus beef, cheddar cheese, lettuce, tomato, onion, special sauce",
    price: 11.99,
    category: "Food",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    popular: false,
  },
  {
    id: 6,
    name: "Tiramisu",
    description: "Classic Italian dessert with espresso soaked ladyfingers",
    price: 6.99,
    category: "Food",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop",
    popular: false,
  },
  {
    id: 7,
    name: "Coca Cola",
    description: "Chilled refreshing soft drink",
    price: 2.5,
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&h=300&fit=crop",
    popular: false,
  },
  {
    id: 8,
    name: "Fresh Orange Juice",
    description: "Freshly squeezed oranges, no sugar added",
    price: 3.99,
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop",
    popular: true,
  },
  {
    id: 9,
    name: "Iced Coffee",
    description: "Cold brew coffee served over ice",
    price: 4.5,
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=400&h=300&fit=crop",
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
    <section className="max-w-7xl mx-auto px-4 py-16">

      {/* Header */}
      <div className="text-center mb-12">
        <h2 className={`text-4xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>
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
                    ? "bg-gray-800 text-gray-300 hover:text-orange-500"
                    : "bg-white border text-gray-600 hover:text-orange-500"
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
    </section>
  );
};

export default Menu;