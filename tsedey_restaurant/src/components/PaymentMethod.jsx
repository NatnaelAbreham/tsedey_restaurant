
// src/components/PaymentMethod.jsx
import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const PaymentMethod = ({ isOpen, onClose, onCashSelected }) => {
  const { darkMode } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCash = () => {
    onCashSelected();
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-[70] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL */}
      <div
        className={`relative w-full max-w-md mx-4 rounded-2xl shadow-2xl p-6 transform transition-all duration-300 ${
          isVisible ? "scale-100" : "scale-95"
        } ${
          darkMode
            ? "bg-gray-900 text-white"
            : "bg-white text-gray-900"
        }`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">
              Payment Method
            </h2>

            <p
              className={`text-sm mt-1 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Choose how you would like to pay
            </p>
          </div>

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

        {/* CASH */}
        <button
          onClick={handleCash}
          className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 mb-4 ${
            darkMode
              ? "border-gray-700 bg-gray-800 hover:bg-gray-700"
              : "border-gray-200 bg-gray-50 hover:bg-orange-50 hover:border-orange-300"
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-2xl">
            💵
          </div>

          <div className="flex-1 text-left">
            <h3 className="font-semibold text-lg">
              Cash
            </h3>

            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Pay with cash when your order is delivered
            </p>
          </div>

          <span className="text-gray-400">
            →
          </span>
        </button>

        {/* TRANSFER */}
        <button
          disabled
          className={`w-full flex items-center gap-4 p-4 rounded-xl border cursor-not-allowed ${
            darkMode
              ? "border-gray-800 bg-gray-800/50"
              : "border-gray-200 bg-gray-100"
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
            🏦
          </div>

          <div className="flex-1 text-left">
            <h3
              className={`font-semibold text-lg ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Bank Transfer
            </h3>

            <p
              className={`text-sm ${
                darkMode ? "text-gray-500" : "text-gray-400"
              }`}
            >
              Coming soon
            </p>
          </div>

          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-400 text-white">
            Soon
          </span>
        </button>

        {/* CANCEL */}
        <button
          onClick={onClose}
          className={`w-full mt-5 py-3 rounded-xl font-medium transition ${
            darkMode
              ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PaymentMethod;

