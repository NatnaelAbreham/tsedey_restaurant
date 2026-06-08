import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const AddMenu = () => {
  const { darkMode } = useTheme();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
    is_available: true,
    image_url: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: connect to backend API
    console.log("Submitting Menu Item:", formData);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 py-10 px-4 ${
        darkMode ? "bg-gray-950 text-white" : "bg-slate-50 text-gray-900"
      }`}
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <h1 className="text-2xl font-bold mb-6 text-center">
          Add New Menu Item
        </h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className={`p-6 rounded-xl border shadow-md space-y-4 ${
            darkMode
              ? "bg-gray-900 border-gray-800"
              : "bg-white border-slate-200"
          }`}
        >
          {/* Name */}
          <div>
            <label className="text-sm font-medium">Item Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Burger"
              className="w-full mt-1 p-2 rounded border bg-transparent outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write item details..."
              className="w-full mt-1 p-2 rounded border bg-transparent outline-none"
            />
          </div>

          {/* Price + Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full mt-1 p-2 rounded border bg-transparent outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Category ID</label>
              <input
                type="number"
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                placeholder="1"
                className="w-full mt-1 p-2 rounded border bg-transparent outline-none"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="text-sm font-medium">Image URL</label>
            <input
              type="text"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full mt-1 p-2 rounded border bg-transparent outline-none"
            />
          </div>

          {/* Availability */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="is_available"
              checked={formData.is_available}
              onChange={handleChange}
            />
            <label className="text-sm">Available</label>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded font-medium transition"
          >
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMenu;