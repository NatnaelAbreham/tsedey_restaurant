import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

const InventoryPage = () => {
  const { darkMode } = useTheme();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const response = await fetch("http://localhost:5238/getitem");
      const data = await response.json();

      setItems(
        data.data.map((item) => ({
          ...item,
          quantity: item.quantity || 0,
        }))
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (id, value) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: value } : item
      )
    );
  };

  const saveQuantity = async (item) => {
    try {
      setSavingId(item.id);

      await fetch(
        `http://localhost:5238/update-item-quantity/${item.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity: Number(item.quantity),
          }),
        }
      );

      alert("Quantity updated successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to update quantity");
    } finally {
      setSavingId(null);
    }
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen flex justify-center items-center ${
          darkMode ? "bg-gray-950 text-white" : "bg-[#e7f2fd] text-gray-900"
        }`}
      >
        Loading items...
      </div>
    );
  }

  return (
    <section
      className={`min-h-screen px-4 py-10 transition-colors duration-300 ${
        darkMode ? "bg-gray-950 text-white" : "bg-[#e7f2fd] text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold">
            Inventory Management 📦
          </h1>
          <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Update available stock quantities.
          </p>
        </div>

        {/* TABLE CARD */}
        <div
          className={`rounded-3xl overflow-hidden shadow-lg ${
            darkMode ? "bg-gray-900 shadow-black/40" : "bg-white shadow-gray-200"
          }`}
        >
          <div className="overflow-x-auto">

            <table className="w-full">

              {/* HEADER */}
              <thead className="bg-orange-500 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Image</th>
                  <th className="px-6 py-4 text-left">Item</th>
                  <th className="px-6 py-4 text-left">Price</th>
                  <th className="px-6 py-4 text-left">Quantity</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>

              {/* BODY (IMPORTANT FIX HERE) */}
              <tbody
                className={`divide-y ${
                  darkMode ? "divide-gray-800" : "divide-gray-200"
                }`}
              >
                {items.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`transition ${
                      darkMode
                        ? "hover:bg-gray-800/40"
                        : "hover:bg-gray-100"
                    } ${
                      index % 2 === 0
                        ? darkMode
                          ? "bg-gray-900/20"
                          : "bg-gray-50"
                        : ""
                    }`}
                  >

                    {/* IMAGE */}
                    <td className="px-6 py-5">
                      <img
                        src={`http://localhost:5238/${item.imageUrl}`}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                    </td>

                    {/* ITEM */}
                    <td className="px-6 py-5">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        {item.description}
                      </p>
                    </td>

                    {/* PRICE */}
                    <td className="px-6 py-5 font-semibold text-orange-500">
                      ETB {item.price}
                    </td>

                    {/* QUANTITY */}
                    <td className="px-6 py-5">
                      <input
                        type="number"
                        min="0"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item.id, e.target.value)
                        }
                        className={`w-28 px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                          darkMode
                            ? "bg-gray-800 border-gray-700 text-white"
                            : "bg-white border-gray-200"
                        }`}
                      />
                    </td>

                    {/* ACTION */}
                    <td className="px-6 py-5 text-center">
                      <button
                        onClick={() => saveQuantity(item)}
                        disabled={savingId === item.id}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl font-semibold transition active:scale-95"
                      >
                        {savingId === item.id ? "Saving..." : "Save"}
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        </div>

      </div>
    </section>
  );
};

export default InventoryPage;