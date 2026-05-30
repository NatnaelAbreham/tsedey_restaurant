// src/components/CartSidebar.jsx
import React from "react";

const CartSidebar = ({
  isOpen,
  onClose,
  cartItems,
  updateQuantity,
  removeItem,
  totalPrice,
  onPlaceOrder,
  darkMode,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-screen w-full max-w-md shadow-2xl z-50 transition-all duration-300 overflow-hidden ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className={`flex items-center justify-between border-b p-5 ${
            darkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <h2 className={`flex items-center gap-2 text-2xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M12 15v6" />
              </svg>
              Your Order
            </h2>
            <button
              onClick={onClose}
              className={`transition ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-700'}`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-5">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <svg className="w-24 h-24 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <p className={`text-lg font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Your cart is empty
                </p>
                <p className={`text-sm mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  Add some delicious items
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className={`flex gap-4 rounded-2xl p-3 ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                    <img src={item.image} alt={item.name} className="h-20 w-20 rounded-xl object-cover" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                            {item.name}
                          </h4>
                          <p className="mt-1 font-medium text-orange-500">${item.price}</p>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600 transition">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                      <div className="mt-3 flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className={`flex h-8 w-8 items-center justify-center rounded-full transition ${
                            darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'
                          }`}
                        >
                          -
                        </button>
                        <span className={`w-5 text-center font-medium ${darkMode ? 'text-white' : ''}`}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className={`flex h-8 w-8 items-center justify-center rounded-full transition ${
                            darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'
                          }`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className={`border-t p-5 space-y-4 ${
              darkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div className="flex items-center justify-between text-lg font-bold">
                <span className={darkMode ? 'text-white' : ''}>Total</span>
                <span className="text-orange-500">${totalPrice.toFixed(2)}</span>
              </div>
              <button
                onClick={onPlaceOrder}
                className="w-full rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 hover:scale-[1.02]"
              >
                Place Order
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;