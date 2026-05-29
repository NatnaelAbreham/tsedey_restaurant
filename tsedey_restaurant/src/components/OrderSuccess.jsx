import React, { useState, useEffect } from "react";

const OrderSuccess = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // smooth entrance animation
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-[60] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Modal */}
      <div
        className={`relative bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-4 text-center transform transition-all duration-300 ${
          isVisible ? "scale-100" : "scale-90"
        }`}
      >
        {/* Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-10 h-10 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Order Placed Successfully!
        </h3>

        {/* Message */}
        <p className="text-gray-500 mb-6">
          Your delicious meal is being prepared. Thank you for ordering with us!
        </p>

        {/* Info */}
        <div className="bg-orange-50 rounded-lg p-3 mb-6">
          <p className="text-sm text-orange-600">
            Estimated delivery time: 25–35 minutes
          </p>
        </div>

        {/* OK Button */}
        <button
          onClick={onClose}
          className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition-all duration-300"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;