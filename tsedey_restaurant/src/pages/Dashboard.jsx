import React, { useEffect, useState } from "react";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import api from "../api/api";
import { useTheme } from "../context/ThemeContext";

const Dashboard = () => {
    const { darkMode } = useTheme();

    const [summary, setSummary] = useState({
        todayRevenue: 0,
        todayOrders: 0,
        pendingOrders: 0,
        servedOrders: 0,
        averageOrderValue: 0,
        itemsSold: 0,
    });
    const [revenueTrend, setRevenueTrend] = useState([]);
    const [ordersTrend, setOrdersTrend] = useState([]);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchDashboardSummary = async () => {
        try {
            setLoading(true);

            const [summaryResponse, revenueResponse, ordersResponse, paymentResponse] =
                await Promise.all([
                    api.get("/dashboard-summary"),
                    api.get("/revenue-trend"),
                    api.get("/orders-trend"),
                    api.get("/payment-methods"),
                ]);

            if (summaryResponse.data.success) {
                setSummary(summaryResponse.data.data);
            }

            if (revenueResponse.data.success) {
                setRevenueTrend(revenueResponse.data.data);
            }

            if (ordersResponse.data.success) {
                setOrdersTrend(ordersResponse.data.data);
            }

            if (paymentResponse.data.success) {
                setPaymentMethods(paymentResponse.data.data);
            }
        } catch (error) {
            console.error("Failed to load dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardSummary();
    }, []);

    const cards = [
        {
            title: "Today's Revenue",
            value: `${summary.todayRevenue.toFixed(2)}`,
            icon: "💰",
            description: "Completed sales",
            iconBg: "bg-green-500/10",
        },
        {
            title: "Today's Orders",
            value: summary.todayOrders,
            icon: "🧾",
            description: "Orders placed today",
            iconBg: "bg-blue-500/10",
        },
        {
            title: "Pending Orders",
            value: summary.pendingOrders,
            icon: "⏳",
            description: "Waiting to be served",
            iconBg: "bg-orange-500/10",
        },
        {
            title: "Served Orders",
            value: summary.servedOrders,
            icon: "✓",
            description: "Completed orders",
            iconBg: "bg-green-500/10",
        },
        {
            title: "Average Order",
            value: `${summary.averageOrderValue.toFixed(2)}`,
            icon: "📊",
            description: "Average completed order",
            iconBg: "bg-purple-500/10",
        },
        {
            title: "Items Sold",
            value: summary.itemsSold,
            icon: "🍽️",
            description: "Items sold today",
            iconBg: "bg-pink-500/10",
        },
    ];

    return (
        <div
            className={`min-h-screen p-4 md:p-6 transition-colors duration-300 ${darkMode
                ? "bg-gray-950 text-white"
                : "bg-[#e7f2fd] text-gray-900"
                }`}
        >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">
                        Dashboard
                    </h1>

                    <p
                        className={`mt-1 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                    >
                        Restaurant performance overview
                    </p>
                </div>

                <button
                    onClick={fetchDashboardSummary}
                    disabled={loading}
                    className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition disabled:opacity-50"
                >
                    {loading ? "Refreshing..." : "↻ Refresh"}
                </button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {cards.map((card) => (
                    <div
                        key={card.title}
                        className={`rounded-2xl border p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${darkMode
                            ? "bg-gray-900 border-gray-800"
                            : "bg-white/90 border-gray-100"
                            }`}
                    >
                        <div className="flex items-start justify-between">
                            <div
                                className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl ${card.iconBg}`}
                            >
                                {card.icon}
                            </div>
                        </div>

                        <p
                            className={`mt-4 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"
                                }`}
                        >
                            {card.title}
                        </p>

                        <h2 className="text-2xl font-bold mt-1">
                            {loading ? "—" : card.value}
                        </h2>

                        <p
                            className={`text-xs mt-2 ${darkMode ? "text-gray-500" : "text-gray-400"
                                }`}
                        >
                            {card.description}
                        </p>
                    </div>
                ))}
            </div>




            {/* Revenue & Orders Trends */}
            <div className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-6">

                {/* Revenue Trend */}
                <div
                    className={`rounded-2xl border p-6 shadow-sm ${darkMode
                        ? "bg-gray-900 border-gray-800"
                        : "bg-white/90 border-gray-100"
                        }`}
                >
                    <div className="mb-5">
                        <h2 className="text-lg font-bold">
                            Revenue Trend
                        </h2>

                        <p
                            className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"
                                }`}
                        >
                            Completed revenue over the last 7 days
                        </p>
                    </div>

                    <div className="h-[320px]">
                        {loading ? (
                            <div
                                className={`h-full flex items-center justify-center ${darkMode ? "text-gray-500" : "text-gray-400"
                                    }`}
                            >
                                Loading revenue data...
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart
                                    data={revenueTrend}
                                    margin={{
                                        top: 10,
                                        right: 10,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke={darkMode ? "#374151" : "#e5e7eb"}
                                    />

                                    <XAxis
                                        dataKey="date"
                                        tickFormatter={(date) =>
                                            new Date(date).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                            })
                                        }
                                        tick={{
                                            fill: darkMode ? "#9ca3af" : "#6b7280",
                                            fontSize: 12,
                                        }}
                                        axisLine={false}
                                        tickLine={false}
                                    />

                                    <YAxis
                                        tick={{
                                            fill: darkMode ? "#9ca3af" : "#6b7280",
                                            fontSize: 12,
                                        }}
                                        axisLine={false}
                                        tickLine={false}
                                    />

                                    <Tooltip
                                        formatter={(value) => [
                                            `${Number(value).toFixed(2)}`,
                                            "Revenue",
                                        ]}
                                        labelFormatter={(date) =>
                                            new Date(date).toLocaleDateString("en-US", {
                                                weekday: "short",
                                                month: "short",
                                                day: "numeric",
                                            })
                                        }
                                        contentStyle={{
                                            backgroundColor: darkMode ? "#111827" : "#ffffff",
                                            border: darkMode
                                                ? "1px solid #374151"
                                                : "1px solid #e5e7eb",
                                            borderRadius: "12px",
                                        }}
                                    />

                                    <Area
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#f97316"
                                        fill="#f97316"
                                        fillOpacity={0.15}
                                        strokeWidth={3}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>


                {/* Orders Trend */}
                <div
                    className={`rounded-2xl border p-6 shadow-sm ${darkMode
                        ? "bg-gray-900 border-gray-800"
                        : "bg-white/90 border-gray-100"
                        }`}
                >
                    <div className="mb-5">
                        <h2 className="text-lg font-bold">
                            Orders Trend
                        </h2>

                        <p
                            className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"
                                }`}
                        >
                            Orders placed over the last 7 days
                        </p>
                    </div>

                    <div className="h-[320px]">
                        {loading ? (
                            <div
                                className={`h-full flex items-center justify-center ${darkMode ? "text-gray-500" : "text-gray-400"
                                    }`}
                            >
                                Loading orders data...
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart
                                    data={ordersTrend}
                                    margin={{
                                        top: 10,
                                        right: 10,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke={darkMode ? "#374151" : "#e5e7eb"}
                                    />

                                    <XAxis
                                        dataKey="date"
                                        tickFormatter={(date) =>
                                            new Date(date).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                            })
                                        }
                                        tick={{
                                            fill: darkMode ? "#9ca3af" : "#6b7280",
                                            fontSize: 12,
                                        }}
                                        axisLine={false}
                                        tickLine={false}
                                    />

                                    <YAxis
                                        allowDecimals={false}
                                        tick={{
                                            fill: darkMode ? "#9ca3af" : "#6b7280",
                                            fontSize: 12,
                                        }}
                                        axisLine={false}
                                        tickLine={false}
                                    />

                                    <Tooltip
                                        formatter={(value) => [
                                            value,
                                            "Orders",
                                        ]}
                                        labelFormatter={(date) =>
                                            new Date(date).toLocaleDateString("en-US", {
                                                weekday: "short",
                                                month: "short",
                                                day: "numeric",
                                            })
                                        }
                                        contentStyle={{
                                            backgroundColor: darkMode ? "#111827" : "#ffffff",
                                            border: darkMode
                                                ? "1px solid #374151"
                                                : "1px solid #e5e7eb",
                                            borderRadius: "12px",
                                        }}
                                    />

                                    <Area
                                        type="monotone"
                                        dataKey="orders"
                                        stroke="#3b82f6"
                                        fill="#3b82f6"
                                        fillOpacity={0.12}
                                        strokeWidth={3}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>

            </div>




            {/* Payment Methods */}
            <div className="mt-6">
                <div
                    className={`rounded-2xl border p-6 shadow-sm ${darkMode
                            ? "bg-gray-900 border-gray-800"
                            : "bg-white/90 border-gray-100"
                        }`}
                >
                    <div className="mb-5">
                        <h2 className="text-lg font-bold">
                            Payment Methods
                        </h2>

                        <p
                            className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"
                                }`}
                        >
                            Payment distribution over the last 7 days
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">

                        {/* Donut Chart */}
                        <div className="h-[280px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={paymentMethods}
                                        dataKey="orders"
                                        nameKey="paymentMethod"
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={70}
                                        outerRadius={105}
                                        paddingAngle={3}
                                        startAngle={90}
                                        endAngle={-270}
                                    >
                                        {paymentMethods.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={
                                                    entry.paymentMethod === "Cash"
                                                        ? "#22c55e"
                                                        : "#3b82f6"
                                                }
                                            />
                                        ))}
                                    </Pie>

                                    <Tooltip
                                        formatter={(value, name) => [
                                            value,
                                            name,
                                        ]}
                                        contentStyle={{
                                            backgroundColor: darkMode ? "#111827" : "#ffffff",
                                            border: darkMode
                                                ? "1px solid #374151"
                                                : "1px solid #e5e7eb",
                                            borderRadius: "12px",
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Payment Details */}
                        <div className="space-y-4">
                            {paymentMethods.map((payment) => (
                                <div
                                    key={payment.paymentMethod}
                                    className={`flex items-center justify-between p-4 rounded-xl ${darkMode
                                            ? "bg-gray-800"
                                            : "bg-gray-50"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-3 h-3 rounded-full ${payment.paymentMethod === "Cash"
                                                    ? "bg-green-500"
                                                    : "bg-blue-500"
                                                }`}
                                        />

                                        <div>
                                            <p className="font-semibold">
                                                {payment.paymentMethod === "InternalTransfer"
                                                    ? "Internal Transfer"
                                                    : payment.paymentMethod}
                                            </p>

                                            <p
                                                className={`text-xs ${darkMode
                                                        ? "text-gray-400"
                                                        : "text-gray-500"
                                                    }`}
                                            >
                                                {payment.orders} orders
                                            </p>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <p className="font-bold">
                                            {Number(payment.amount).toFixed(2)}
                                        </p>

                                        <p
                                            className={`text-xs ${darkMode
                                                    ? "text-gray-400"
                                                    : "text-gray-500"
                                                }`}
                                        >
                                            Total
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;