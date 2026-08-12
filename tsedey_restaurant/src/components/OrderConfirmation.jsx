import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const OrderConfirmation = ({
  isOpen,
  onClose,
  cartItems,
  totalPrice,
}) => {
  const { darkMode } = useTheme();
  const [phoneNumber, setPhoneNumber] = useState("");

  if (!isOpen) return null;

  const handleSendOTP = () => {
    console.log("Phone number:", phoneNumber);

    // We will connect the OTP API here later
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[70]">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL */}
      <div
        className={`relative w-full max-w-md mx-4 rounded-2xl shadow-2xl p-6 ${
          darkMode
            ? "bg-gray-900 text-white"
            : "bg-white text-gray-900"
        }`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            Confirm Your Order
          </h2>

          <button
            onClick={onClose}
            className={`text-xl ${
              darkMode
                ? "text-gray-400 hover:text-white"
                : "text-gray-400 hover:text-gray-700"
            }`}
          >
            ✕
          </button>
        </div>

        {/* ORDER ITEMS */}
        <div className="space-y-3 max-h-60 overflow-y-auto mb-5">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className={`flex justify-between items-center p-3 rounded-xl ${
                darkMode ? "bg-gray-800" : "bg-gray-50"
              }`}
            >
              <div>
                <p className="font-semibold">
                  {item.name}
                </p>

                <p className="text-sm text-gray-500">
                  {item.quantity} × ${item.price}
                </p>
              </div>

              <p className="font-semibold text-orange-500">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* TOTAL */}
        <div
          className={`flex justify-between border-t pt-4 mb-6 ${
            darkMode
              ? "border-gray-700"
              : "border-gray-200"
          }`}
        >
          <span className="text-lg font-bold">
            Total
          </span>

          <span className="text-lg font-bold text-orange-500">
            ${totalPrice.toFixed(2)}
          </span>
        </div>

        {/* PHONE NUMBER */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-2">
            Phone Number
          </label>

          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+251 9XXXXXXXX"
            className={`w-full rounded-xl px-4 py-3 outline-none border ${
              darkMode
                ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
            } focus:border-orange-500`}
          />
        </div>

        {/* SEND OTP */}
        <button
          onClick={handleSendOTP}
          disabled={!phoneNumber.trim()}
          className={`w-full rounded-xl py-3 font-semibold transition ${
            !phoneNumber.trim()
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-orange-500 text-white hover:bg-orange-600"
          }`}
        >
          Send OTP
        </button>

        {/* CANCEL */}
        <button
          onClick={onClose}
          className={`w-full mt-3 py-2 text-sm ${
            darkMode
              ? "text-gray-400 hover:text-white"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;