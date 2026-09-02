import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useTheme } from "../context/ThemeContext";

const OrderManagement = () => {
    const { darkMode } = useTheme();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [newOrderAlert, setNewOrderAlert] = useState(false);

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showCashModal, setShowCashModal] = useState(false);
    const [showTransferModal, setShowTransferModal] = useState(false);
    const [serving, setServing] = useState(false);
    const fetchPendingOrders = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/pending");

            if (response.data.success) {
                setOrders(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching pending orders:", error);
            setError("Unable to load orders.");
        } finally {
            setLoading(false);
        }
    };
    const checkForNewOrders = async () => {
        try {
            const response = await api.get("/pending");

            if (!response.data.success) {
                return;
            }

            const latestOrders = response.data.data;

            // Find orders that are not currently displayed
            const existingOrderIds = new Set(
                orders.map(order => order.id)
            );

            const newOrders = latestOrders.filter(
                order => !existingOrderIds.has(order.id)
            );

            if (newOrders.length > 0) {
                // Update orders
                setOrders(latestOrders);

                // Show notification
                setNewOrderAlert(true);



                // Hide notification after 5 seconds
                setTimeout(() => {
                    setNewOrderAlert(false);
                }, 5000);
            } else {
                // Keep data updated
                setOrders(latestOrders);
            }

        } catch (error) {
            console.error("Error checking for new orders:", error);
        }
    };
    const serveOrder = async (orderId) => {
        try {
            setServing(true);

            const response = await api.put(`/Order/${orderId}/serve`);

            if (response.data.success) {
                // Remove the served order from the pending list
                setOrders((prevOrders) =>
                    prevOrders.filter((order) => order.id !== orderId)
                );

                ordersRef.current = ordersRef.current.filter(
                    (order) => order.id !== orderId
                );

                // Close modals
                setShowCashModal(false);
                setShowTransferModal(false);
                setSelectedOrder(null);
            }

        } catch (error) {
            console.error("Error serving order:", error);
        } finally {
            setServing(false);
        }
    };

    useEffect(() => {
        // Initial load
        fetchPendingOrders();

        // Check for new orders every 30 seconds
        const interval = setInterval(() => {
            checkForNewOrders();
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <section
                className={`min-h-screen px-6 py-8 transition-colors duration-300 ${darkMode
                    ? "bg-gray-950 text-white"
                    : "bg-[#e7f2fd] text-gray-900"
                    }`}
            >
                <div className="flex items-center justify-center min-h-[300px]">
                    <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                        Loading orders...
                    </p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section
                className={`min-h-screen px-6 py-8 transition-colors duration-300 ${darkMode
                    ? "bg-gray-950 text-white"
                    : "bg-[#e7f2fd] text-gray-900"
                    }`}
            >
                <div className="flex items-center justify-center min-h-[300px]">
                    <div className="bg-red-500/10 border border-red-500 text-red-500 px-5 py-4 rounded-xl">
                        {error}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section
            className={`min-h-screen px-4 sm:px-6 lg:px-8 py-8 transition-colors duration-300 ${darkMode
                ? "bg-gray-950 text-white"
                : "bg-[#e7f2fd] text-gray-900"
                }`}
        >

            {newOrderAlert && (
                <div
                    className={`fixed top-6 right-6 z-50 w-80 rounded-2xl border shadow-2xl p-4 transition-all duration-300 ${darkMode
                        ? "bg-gray-900 border-orange-500 text-white"
                        : "bg-white border-orange-400 text-gray-900"
                        }`}
                >
                    <div className="flex items-start gap-3">

                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white text-lg">
                            🔔
                        </div>

                        <div className="flex-1">
                            <h3 className="font-bold text-base">
                                New Order Received!
                            </h3>

                            <p
                                className={`text-sm mt-1 ${darkMode
                                    ? "text-gray-400"
                                    : "text-gray-600"
                                    }`}
                            >
                                A new customer order is waiting to be served.
                            </p>
                        </div>

                        <button
                            onClick={() => setNewOrderAlert(false)}
                            className={`text-lg leading-none ${darkMode
                                ? "text-gray-400 hover:text-white"
                                : "text-gray-400 hover:text-gray-700"
                                }`}
                        >
                            ×
                        </button>

                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto">

                {/* PAGE HEADER */}
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold">
                        Pending Orders
                    </h1>

                    <p
                        className={`mt-2 ${darkMode
                            ? "text-gray-400"
                            : "text-gray-600"
                            }`}
                    >
                        Manage and serve customer orders.
                    </p>
                </div>

                {/* NO ORDERS */}
                {orders.length === 0 ? (
                    <div
                        className={`rounded-2xl border p-10 text-center shadow-lg ${darkMode
                            ? "bg-gray-900 border-gray-800"
                            : "bg-white border-gray-100"
                            }`}
                    >
                        <div className="text-4xl mb-3">
                            🍽️
                        </div>

                        <h2 className="text-xl font-bold mb-2">
                            No Pending Orders
                        </h2>

                        <p
                            className={
                                darkMode
                                    ? "text-gray-400"
                                    : "text-gray-600"
                            }
                        >
                            There are currently no orders waiting to be served.
                        </p>
                    </div>
                ) : (

                    /* ORDERS */
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className={`rounded-2xl border shadow-xl p-6 transition-all duration-300 hover:-translate-y-1 ${darkMode
                                    ? "bg-gray-900 border-gray-800"
                                    : "bg-white/90 border-gray-100"
                                    }`}
                            >

                                {/* ORDER HEADER */}
                                <div className="flex justify-between items-start mb-5">

                                    <div>
                                        <h2 className="text-xl font-bold">
                                            {order.orderNumber}
                                        </h2>

                                        <span
                                            className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${darkMode
                                                ? "bg-orange-500/10 text-orange-400"
                                                : "bg-orange-100 text-orange-600"
                                                }`}
                                        >
                                            {order.status}
                                        </span>
                                    </div>

                                    <div
                                        className={`text-sm ${darkMode
                                            ? "text-gray-400"
                                            : "text-gray-500"
                                            }`}
                                    >
                                        {new Date(
                                            order.orderDate
                                        ).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </div>

                                </div>

                                {/* ITEMS */}
                                <div
                                    className={`border-t border-b py-4 ${darkMode
                                        ? "border-gray-800"
                                        : "border-gray-200"
                                        }`}
                                >

                                    {/* TABLE HEADER */}
                                    <div
                                        className={`grid grid-cols-[45px_1fr_80px_80px] gap-2 text-xs font-semibold mb-3 ${darkMode
                                            ? "text-gray-500"
                                            : "text-gray-500"
                                            }`}
                                    >
                                        <span>Qty</span>
                                        <span>Item</span>
                                        <span className="text-right">
                                            Price
                                        </span>
                                        <span className="text-right">
                                            Total
                                        </span>
                                    </div>

                                    {/* ITEMS */}
                                    <div className="space-y-3">

                                        {order.items.map((item, index) => (
                                            <div
                                                key={index}
                                                className="grid grid-cols-[45px_1fr_80px_80px] gap-2 items-center text-sm"
                                            >
                                                <span className="font-semibold">
                                                    {item.quantity}
                                                </span>

                                                <span>
                                                    {item.itemName}
                                                </span>

                                                <span className="text-right">
                                                    {item.unitPrice.toFixed(2)}
                                                </span>

                                                <span className="text-right font-medium">
                                                    {item.totalPrice.toFixed(2)}
                                                </span>
                                            </div>
                                        ))}

                                    </div>
                                </div>

                                {/* ORDER SUMMARY */}
                                <div className="py-4 space-y-3">

                                    <div className="flex justify-between items-center">
                                        <span
                                            className={
                                                darkMode
                                                    ? "text-gray-400"
                                                    : "text-gray-600"
                                            }
                                        >
                                            Total Amount
                                        </span>

                                        <strong className="text-xl">
                                            {order.totalAmount.toFixed(2)}
                                        </strong>
                                    </div>

                                    <div className="flex justify-between items-center">

                                        <span
                                            className={
                                                darkMode
                                                    ? "text-gray-400"
                                                    : "text-gray-600"
                                            }
                                        >
                                            Payment Method
                                        </span>

                                        <span
                                            className={`px-3 py-1 rounded-lg text-sm font-semibold ${darkMode
                                                ? "bg-gray-800 text-gray-200"
                                                : "bg-gray-100 text-gray-700"
                                                }`}
                                        >
                                            {order.paymentMethod}
                                        </span>

                                    </div>

                                </div>

                                {/* SERVED BUTTON */}
                                <button
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition active:scale-95"
                                >
                                    SERVED
                                </button>

                            </div>
                        ))}

                    </div>
                )}

            </div>
        </section>
    );
};

export default OrderManagement;