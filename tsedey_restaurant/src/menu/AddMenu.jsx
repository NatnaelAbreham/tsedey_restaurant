import  { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const AddMenu = () => {
  const { darkMode } = useTheme();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "food",
    is_available: true,
    image: null,
  });
const getCategoryId = (category) => {
  switch (category) {
    case "food":
      return 1;
    case "drink":
      return 2;
    default:
      return 1;
  }
};
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("No file selected");

  //  PRICE CONTROL (2 DECIMALS ONLY)
  const handlePrice = (e) => {
    let value = e.target.value;

    // allow only numbers + dot
    value = value.replace(/[^0-9.]/g, "");

    // prevent multiple dots
    const parts = value.split(".");
    if (parts.length > 2) return;

    // limit 2 decimal places
    if (parts[1]?.length > 2) return;

    setForm((prev) => ({ ...prev, price: value }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 📁 FILE UPLOAD (PREMIUM HANDLING)
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setForm((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
      setFileName(file.name);
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();

  formData.append("Name", form.name);
  formData.append("Description", form.description);
  formData.append("Price", Number(form.price));
  formData.append("CategoryId", String(getCategoryId(form.category) || 0));
  formData.append("IsAvailable", form.is_available ? "true" : "false");
  formData.append("CreatedBy", "admin");

  if (form.image) {
    formData.append("image", form.image);
  }

  try {
    console.log("🚀 Sending request to /addmenu...");
    console.log("📦 Form values:");
    console.log({
      name: form.name,
      description: form.description,
      price: form.price,
      categoryId: getCategoryId(form.category),
      isAvailable: form.is_available,
      hasImage: !!form.image
    });

    const response = await fetch("http://localhost:5238/addmenu", {
      method: "POST",
      body: formData,
    });

    console.log("📡 Response received");
    console.log("Status:", response.status);
    console.log("OK:", response.ok);
    console.log("Headers:", Object.fromEntries(response.headers.entries()));

    // 🔥 IMPORTANT: read raw text first (NOT json directly)
    const text = await response.text();

    console.log("📨 Raw backend response:");
    console.log(text);

    let data;
    try {
      data = JSON.parse(text);
      console.log("✅ Parsed JSON:", data);
    } catch (err) {
      console.log("⚠️ Response is NOT valid JSON");
    }

    if (response.ok) {
      alert("Item added successfully!");

      setForm({
        name: "",
        description: "",
        price: "",
        category: "food",
        is_available: true,
        image: null,
      });

      setPreview(null);
      setFileName("No file selected");
    } else {
      console.error("❌ Request failed");
      console.error("Server error details:", text);

      alert(
        data?.error ||
        text ||
        "Failed to add item"
      );
    }
  } catch (error) {
    console.error("💥 Network/Client error:");
    console.error(error);
    alert("Server error");
  }
};

  return (
    <section
      className={`min-h-screen flex items-center justify-center px-4 py-16 transition-all duration-300 ${
        darkMode
          ? "bg-gradient-to-b from-gray-950 to-gray-900 text-white"
          : "bg-gradient-to-b from-[#e7f2fd] to-white text-gray-900"
      }`}
    >
      <div className="max-w-4xl w-full">

        {/* TITLE */}
        <h1 className="text-4xl font-extrabold text-center mb-10 tracking-tight">
          Add Menu Item 🍽️
        </h1>

        {/* CARD */}
        <div
          className={`backdrop-blur-xl shadow-2xl rounded-3xl p-8 border transition-all duration-300 ${
            darkMode
              ? "bg-gray-900/80 border-gray-800"
              : "bg-white/80 border-gray-100"
          }`}
        >
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* NAME */}
            <div>
              <label className="text-sm font-medium mb-1 block">
                Item Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Burger Deluxe"
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-400 transition ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-white border-gray-200"
                }`}
                required
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="text-sm font-medium mb-1 block">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="4"
                placeholder="Write something delicious..."
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-white border-gray-200"
                }`}
              required />
            </div>

            {/* PRICE + CATEGORY */}
            <div className="grid grid-cols-2 gap-4">

              {/* PRICE */}
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Price (USD)
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={form.price}
                  onChange={handlePrice}
                  placeholder="0.00"
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                    darkMode
                      ? "bg-gray-800 border-gray-700 text-white"
                      : "bg-white border-gray-200"
                  }`}
                  required
                />
              </div>

              {/* CATEGORY */}
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Category
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                    darkMode
                      ? "bg-gray-800 border-gray-700 text-white"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <option value="food">Food</option>
                  <option value="drink">Drink</option>
                </select>
              </div>
            </div>

            {/* FILE UPLOAD (PREMIUM) */}
            <div>
              <label className="text-sm font-medium mb-1 block">
                Upload Image
              </label>

              <label
                className={`flex items-center justify-between px-4 py-3 rounded-xl border cursor-pointer transition ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-white border-gray-200"
                }`}
              >
                <span className="text-sm truncate">{fileName}</span>
                <span className="text-xs text-orange-500 font-medium">
                  Choose File
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  className="hidden"
                />
              </label>

              {/* PREVIEW */}
              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  className="mt-4 w-32 h-32 object-cover rounded-2xl shadow-lg"
                />
              )}
            </div>

            {/* AVAILABLE */}
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="is_available"
                checked={form.is_available}
                onChange={handleChange}
              />
              Available
            </label>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition active:scale-95 shadow-lg"
            >
              Add Item
            </button>

          </form>
        </div>
      </div>
    </section>
  );
};

export default AddMenu;