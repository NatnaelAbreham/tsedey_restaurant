import React, { useEffect, useState } from "react";
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

  const [loading, setLoading] = useState(true);

  const fetchDashboardSummary = async () => {
    try {
      setLoading(true);

      const response = await api.get("/dashboard-summary");

      if (response.data.success) {
        setSummary(response.data.data);
      }
    } catch (error) {
      console.error("Failed to load dashboard summary:", error);
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
      className={`min-h-screen p-4 md:p-6 transition-colors duration-300 ${
        darkMode
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
            className={`mt-1 text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
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
            className={`rounded-2xl border p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
              darkMode
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
              className={`mt-4 text-sm ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {card.title}
            </p>

            <h2 className="text-2xl font-bold mt-1">
              {loading ? "—" : card.value}
            </h2>

            <p
              className={`text-xs mt-2 ${
                darkMode ? "text-gray-500" : "text-gray-400"
              }`}
            >
              {card.description}
            </p>
          </div>
        ))}
      </div>

      {/* Charts will be added here */}
      <div className="mt-6">
        <div
          className={`rounded-2xl border p-6 ${
            darkMode
              ? "bg-gray-900 border-gray-800"
              : "bg-white/90 border-gray-100"
          }`}
        >
          <h2 className="text-lg font-bold">
            Dashboard Analytics
          </h2>

          <p
            className={`mt-1 text-sm ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Charts and restaurant insights will appear here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;