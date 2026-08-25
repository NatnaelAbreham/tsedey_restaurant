// src/components/PaymentMethod.jsx
import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const PaymentMethod = ({
  isOpen,
  onClose,
  onCashSelected,
  onTransferSelected,
}) => {
  const { darkMode } = useTheme();

  const [isVisible, setIsVisible] = useState(false);
  const [showAccountInput, setShowAccountInput] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountError, setAccountError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      setShowAccountInput(false);
      setAccountNumber("");
      setAccountError("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCash = () => {
    onCashSelected();
  };

  const handleTransfer = () => {
    setShowAccountInput(true);
    setAccountError("");
  };

  const handleConfirmTransfer = () => {
    const account = accountNumber.trim();

    if (!account) {
      setAccountError("Please enter your account number");
      return;
    }

    if (account.length < 5) {
      setAccountError("Please enter a valid account number");
      return;
    }

    onTransferSelected(account);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-[70] transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"
        }`}
    >
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL */}
      <div
        className={`relative w-full max-w-md mx-4 rounded-2xl shadow-2xl p-6 transform transition-all duration-300 ${isVisible ? "scale-100" : "scale-95"
          } ${darkMode
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
              className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"
                }`}
            >
              Choose how you would like to pay
            </p>
          </div>

          <button
            onClick={onClose}
            className={`text-xl ${darkMode
                ? "text-gray-400 hover:text-white"
                : "text-gray-400 hover:text-gray-700"
              }`}
          >
            ✕
          </button>
        </div>

        {!showAccountInput ? (
          <>
            {/* CASH */}
            <button
              onClick={handleCash}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 mb-4 ${darkMode
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
                  className={`text-sm ${darkMode
                      ? "text-gray-400"
                      : "text-gray-500"
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
            <div
              className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${darkMode
                  ? "border-gray-700 bg-gray-800"
                  : "border-gray-200 bg-gray-50"
                }`}
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
                🏦
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-lg">
                  Bank Transfer
                </h3>

                <p
                  className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                >
                  Enter your 13-digit account number
                </p>

                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={13}
                  value={accountNumber}
                  onChange={(e) => {
                    const value = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 13);

                    setAccountNumber(value);
                  }}
                  placeholder="Enter account number"
                  className={`w-full mt-3 px-3 py-2 rounded-lg border outline-none ${darkMode
                      ? "bg-gray-900 border-gray-700 text-white placeholder-gray-500"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                    }`}
                />

                {accountNumber.length > 0 && accountNumber.length < 13 && (
                  <p className="text-xs text-red-500 mt-1">
                    Account number must be exactly 13 digits
                  </p>
                )}

                <button
                  onClick={() => onTransferSelected(accountNumber)}
                  disabled={accountNumber.length !== 13}
                  className={`w-full mt-3 py-2 rounded-lg font-semibold transition ${accountNumber.length === 13
                      ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                      : darkMode
                        ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                >
                  Continue
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* ACCOUNT NUMBER */}
            <div className="mb-5">
              <label className="block text-sm font-medium mb-2">
                Account Number
              </label>

              <input
                type="text"
                value={accountNumber}
                onChange={(e) => {
                  setAccountNumber(e.target.value);
                  setAccountError("");
                }}
                placeholder="Enter your account number"
                className={`w-full rounded-xl border px-4 py-3 outline-none transition ${darkMode
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                  }`}
              />

              {accountError && (
                <p className="mt-2 text-sm text-red-500">
                  {accountError}
                </p>
              )}
            </div>

            {/* CONFIRM TRANSFER */}
            <button
              onClick={handleConfirmTransfer}
              className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 transition"
            >
              Continue with Transfer
            </button>

            {/* BACK */}
            <button
              onClick={() => {
                setShowAccountInput(false);
                setAccountNumber("");
                setAccountError("");
              }}
              className={`w-full mt-3 py-2 text-sm ${darkMode
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-500 hover:text-gray-800"
                }`}
            >
              ← Back to Payment Methods
            </button>
          </>
        )}

        {/* CANCEL */}
        <button
          onClick={onClose}
          className={`w-full mt-5 py-3 rounded-xl font-medium transition ${darkMode
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