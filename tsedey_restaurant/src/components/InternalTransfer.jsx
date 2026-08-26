import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import api from "../api";

const InternalTransfer = ({
    isOpen,
    onClose,
    accountNumber,
    totalPrice,
}) => {
    const { darkMode } = useTheme();

    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");


    useEffect(() => {
        if (isOpen) {
            setTimeout(() => setIsVisible(true), 10);
        } else {
            setIsVisible(false);
            setIsLoading(false);
            setResult(null);
            setError("");
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && accountNumber) {
            checkAccount();
        }
    }, [isOpen, accountNumber]);

    const checkAccount = async () => {
        setIsLoading(true);
        setError("");
        setResult(null);

        try {
            const response = await api.post("/account-details", {
                accountId: accountNumber,
            });

            const availableBalance = parseFloat(
                response?.data?.message?.availableBalance
            );

            if (isNaN(availableBalance)) {
                throw new Error("Unable to retrieve account balance");
            }

            const requiredBalance = Number(totalPrice) + 100;

            if (availableBalance < requiredBalance) {
                setResult({
                    type: "insufficient",
                    availableBalance,
                    requiredBalance,
                });
            } else {
                setResult({
                    type: "comingSoon",
                    availableBalance,
                    requiredBalance,
                });
            }
        } catch (error) {
            console.error("Account verification error:", error);

            setError(
                error?.response?.data?.message ||
                "Unable to verify the account. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center z-[80] transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"
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
                            Internal Transfer
                        </h2>

                        <p
                            className={`text-sm mt-1 ${darkMode
                                    ? "text-gray-400"
                                    : "text-gray-500"
                                }`}
                        >
                            Checking your account
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

                {/* LOADING */}
                {isLoading && (
                    <div className="py-8 text-center">
                        <div className="text-4xl mb-4">
                            🔄
                        </div>

                        <h3 className="font-semibold text-lg">
                            Checking Account
                        </h3>

                        <p
                            className={`text-sm mt-2 ${darkMode
                                    ? "text-gray-400"
                                    : "text-gray-500"
                                }`}
                        >
                            Please wait while we check your account balance...
                        </p>
                    </div>
                )}

                {/* ERROR */}
                {!isLoading && error && (
                    <div
                        className={`p-5 rounded-xl border ${darkMode
                                ? "bg-red-950/30 border-red-900"
                                : "bg-red-50 border-red-200"
                            }`}
                    >
                        <div className="text-4xl text-center mb-3">
                            ⚠️
                        </div>

                        <h3 className="text-lg font-bold text-center text-red-500">
                            Unable to Check Account
                        </h3>

                        <p
                            className={`text-sm text-center mt-2 ${darkMode
                                    ? "text-gray-400"
                                    : "text-gray-600"
                                }`}
                        >
                            {error}
                        </p>
                    </div>
                )}

                {/* INSUFFICIENT BALANCE */}
                {!isLoading &&
                    !error &&
                    result?.type === "insufficient" && (
                        <div
                            className={`p-5 rounded-xl border ${darkMode
                                    ? "bg-red-950/30 border-red-900"
                                    : "bg-red-50 border-red-200"
                                }`}
                        >
                            <div className="text-4xl text-center mb-3">
                                ⚠️
                            </div>

                            <h3 className="text-lg font-bold text-center text-red-500">
                                Insufficient Balance
                            </h3>

                            <p
                                className={`text-sm text-center mt-2 ${darkMode
                                        ? "text-gray-400"
                                        : "text-gray-600"
                                    }`}
                            >
                                Your available balance is not enough to
                                complete this order.
                            </p>

                            <div className="mt-4 space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Order Amount</span>
                                    <span>
                                        {Number(totalPrice).toFixed(2)}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Required Balance</span>
                                    <span>
                                        {result.requiredBalance.toFixed(2)}
                                    </span>
                                </div>

                                <div className="flex justify-between font-semibold">
                                    <span>Available Balance</span>
                                    <span>
                                        {result.availableBalance.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                {/* COMING SOON */}
                {!isLoading &&
                    !error &&
                    result?.type === "comingSoon" && (
                        <div
                            className={`p-5 rounded-xl border ${darkMode
                                    ? "bg-orange-950/30 border-orange-900"
                                    : "bg-orange-50 border-orange-200"
                                }`}
                        >
                            <div className="text-4xl text-center mb-3">
                                🚧
                            </div>

                            <h3 className="text-lg font-bold text-center text-orange-500">
                                Coming Soon
                            </h3>

                            <p
                                className={`text-sm text-center mt-2 ${darkMode
                                        ? "text-gray-400"
                                        : "text-gray-600"
                                    }`}
                            >
                                Your account has sufficient balance.
                                Internal transfer payment will be available
                                soon.
                            </p>
                        </div>
                    )}

                {/* CLOSE */}
                {!isLoading && (
                    <button
                        onClick={onClose}
                        className={`w-full mt-5 py-3 rounded-xl font-medium transition ${darkMode
                                ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                            }`}
                    >
                        Close
                    </button>
                )}
            </div>
        </div>
    );
};

export default InternalTransfer;