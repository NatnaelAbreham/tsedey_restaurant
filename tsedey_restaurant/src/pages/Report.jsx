import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useTheme } from "../context/ThemeContext";

const Report = () => {
  const { darkMode } = useTheme();

  // --------------------------------
  // Filters
  // --------------------------------

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [status, setStatus] = useState("All");
  const [paymentMethod, setPaymentMethod] = useState("All");

  const [search, setSearch] = useState("");

  // --------------------------------
  // Report Data
  // --------------------------------

  const [orders, setOrders] = useState([]);

  const [summary, setSummary] = useState({
    totalOrders: 0,
    servedOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0,
    averageOrderValue: 0,
    itemsSold: 0,
  });

  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 20,
    totalRecords: 0,
    totalPages: 0,
  });

  const [loading, setLoading] = useState(false);

  // --------------------------------
  // Fetch Report
  // --------------------------------

  const fetchReport = async (page = 1) => {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      if (fromDate) {
        params.append("fromDate", fromDate);
      }

      if (toDate) {
        params.append("toDate", toDate);
      }

      if (status !== "All") {
        params.append("status", status);
      }

      if (paymentMethod !== "All") {
        params.append("paymentMethod", paymentMethod);
      }

      if (search.trim()) {
        params.append("search", search.trim());
      }

      params.append("page", page);
      params.append("pageSize", pagination.pageSize);

      const response = await api.get(
        `/report/orders?${params.toString()}`
      );

      if (response.data.success) {
        setOrders(response.data.data.items);

        setSummary(response.data.data.summary);

        setPagination(response.data.data.pagination);
      }
    } catch (error) {
      console.error("Failed to load report:", error);
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------
  // Initial Load
  // --------------------------------

  useEffect(() => {
    fetchReport(1);
  }, []);

  // --------------------------------
  // Date Presets
  // --------------------------------

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const applyToday = () => {
    const today = new Date();

    const date = formatDate(today);

    setFromDate(date);
    setToDate(date);
  };

  const applyYesterday = () => {
    const yesterday = new Date();

    yesterday.setDate(yesterday.getDate() - 1);

    const date = formatDate(yesterday);

    setFromDate(date);
    setToDate(date);
  };

  const applyLast7Days = () => {
    const today = new Date();

    const startDate = new Date();

    startDate.setDate(today.getDate() - 6);

    setFromDate(formatDate(startDate));
    setToDate(formatDate(today));
  };

  const applyThisMonth = () => {
    const today = new Date();

    const startDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

    setFromDate(formatDate(startDate));
    setToDate(formatDate(today));
  };

  // --------------------------------
  // Apply Filters
  // --------------------------------

  const handleApplyFilter = () => {
    fetchReport(1);
  };

  // --------------------------------
  // Reset
  // --------------------------------

  const handleReset = () => {
    setFromDate("");
    setToDate("");
    setStatus("All");
    setPaymentMethod("All");
    setSearch("");

    setTimeout(() => {
      fetchReport(1);
    }, 0);
  };

  // --------------------------------
  // Helpers
  // --------------------------------

  const formatCurrency = (value) => {
    return `${Number(value || 0).toLocaleString()} ETB`;
  };

  return (
    <div
      className={`min-h-screen p-4 md:p-6 lg:p-8 transition-colors ${
        darkMode
          ? "bg-gray-950 text-white"
          : "bg-[#e7f2fd] text-gray-900"
      }`}
    >
      <div className="max-w-[1600px] mx-auto">

        {/* -------------------------------- */}
        {/* Header */}
        {/* -------------------------------- */}

        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">
            Reports
          </h1>

          <p
            className={`text-sm mt-1 ${
              darkMode
                ? "text-gray-400"
                : "text-gray-500"
            }`}
          >
            Search, filter and analyze restaurant orders
          </p>
        </div>

        {/* -------------------------------- */}
        {/* Filters */}
        {/* -------------------------------- */}

        <div
          className={`rounded-2xl border p-5 md:p-6 shadow-sm ${
            darkMode
              ? "bg-gray-900 border-gray-800"
              : "bg-white/90 border-gray-100"
          }`}
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-bold text-lg">
                Report Filters
              </h2>

              <p
                className={`text-sm mt-1 ${
                  darkMode
                    ? "text-gray-400"
                    : "text-gray-500"
                }`}
              >
                Select a date range or use a quick preset
              </p>
            </div>
          </div>

          {/* Date + Select Filters */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* From Date */}

            <div>
              <label className="block text-sm font-medium mb-2">
                From Date
              </label>

              <input
                type="date"
                value={fromDate}
                onChange={(e) =>
                  setFromDate(e.target.value)
                }
                className={`w-full px-3 py-2.5 rounded-xl border outline-none transition ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-white border-gray-200 text-gray-900"
                }`}
              />
            </div>

            {/* To Date */}

            <div>
              <label className="block text-sm font-medium mb-2">
                To Date
              </label>

              <input
                type="date"
                value={toDate}
                onChange={(e) =>
                  setToDate(e.target.value)
                }
                className={`w-full px-3 py-2.5 rounded-xl border outline-none transition ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-white border-gray-200 text-gray-900"
                }`}
              />
            </div>

            {/* Status */}

            <div>
              <label className="block text-sm font-medium mb-2">
                Status
              </label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
                className={`w-full px-3 py-2.5 rounded-xl border outline-none ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-white border-gray-200 text-gray-900"
                }`}
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Served">Served</option>
              </select>
            </div>

            {/* Payment */}

            <div>
              <label className="block text-sm font-medium mb-2">
                Payment Method
              </label>

              <select
                value={paymentMethod}
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
                className={`w-full px-3 py-2.5 rounded-xl border outline-none ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-white border-gray-200 text-gray-900"
                }`}
              >
                <option value="All">
                  All Payment Methods
                </option>

                <option value="Cash">
                  Cash
                </option>

                <option value="InternalTransfer">
                  Internal Transfer
                </option>
              </select>
            </div>
          </div>

          {/* Search */}

          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">
              Search
            </label>

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleApplyFilter();
                }
              }}
              placeholder="Search order number, phone number or item name..."
              className={`w-full px-3 py-2.5 rounded-xl border outline-none transition ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                  : "bg-white border-gray-200 text-gray-900 placeholder-gray-400"
              }`}
            />
          </div>

          {/* Quick Date Presets */}

          <div className="flex flex-wrap gap-2 mt-5">
            <button
              onClick={applyToday}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                darkMode
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Today
            </button>

            <button
              onClick={applyYesterday}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                darkMode
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Yesterday
            </button>

            <button
              onClick={applyLast7Days}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                darkMode
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Last 7 Days
            </button>

            <button
              onClick={applyThisMonth}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                darkMode
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              This Month
            </button>
          </div>

          {/* Actions */}

          <div className="flex flex-col sm:flex-row sm:justify-end gap-3 mt-5">

            <button
              onClick={handleReset}
              className={`px-5 py-2.5 rounded-xl font-medium transition ${
                darkMode
                  ? "bg-gray-800 hover:bg-gray-700 text-gray-200"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              Reset
            </button>

            <button
              onClick={handleApplyFilter}
              disabled={loading}
              className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-medium transition disabled:opacity-60"
            >
              {loading ? "Loading..." : "Apply Filter"}
            </button>
          </div>
        </div>

        {/* -------------------------------- */}
        {/* Summary Cards */}
        {/* -------------------------------- */}

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mt-6">

          {/* Total Orders */}

          <div
            className={`rounded-2xl border p-5 shadow-sm ${
              darkMode
                ? "bg-gray-900 border-gray-800"
                : "bg-white/90 border-gray-100"
            }`}
          >
            <p
              className={`text-sm ${
                darkMode
                  ? "text-gray-400"
                  : "text-gray-500"
              }`}
            >
              Total Orders
            </p>

            <p className="text-2xl font-bold mt-2">
              {summary.totalOrders}
            </p>
          </div>

          {/* Revenue */}

          <div
            className={`rounded-2xl border p-5 shadow-sm ${
              darkMode
                ? "bg-gray-900 border-gray-800"
                : "bg-white/90 border-gray-100"
            }`}
          >
            <p
              className={`text-sm ${
                darkMode
                  ? "text-gray-400"
                  : "text-gray-500"
              }`}
            >
              Revenue
            </p>

            <p className="text-xl font-bold mt-2">
              {formatCurrency(summary.totalRevenue)}
            </p>
          </div>

          {/* Served */}

          <div
            className={`rounded-2xl border p-5 shadow-sm ${
              darkMode
                ? "bg-gray-900 border-gray-800"
                : "bg-white/90 border-gray-100"
            }`}
          >
            <p
              className={`text-sm ${
                darkMode
                  ? "text-gray-400"
                  : "text-gray-500"
              }`}
            >
              Served
            </p>

            <p className="text-2xl font-bold text-green-500 mt-2">
              {summary.servedOrders}
            </p>
          </div>

          {/* Pending */}

          <div
            className={`rounded-2xl border p-5 shadow-sm ${
              darkMode
                ? "bg-gray-900 border-gray-800"
                : "bg-white/90 border-gray-100"
            }`}
          >
            <p
              className={`text-sm ${
                darkMode
                  ? "text-gray-400"
                  : "text-gray-500"
              }`}
            >
              Pending
            </p>

            <p className="text-2xl font-bold text-orange-500 mt-2">
              {summary.pendingOrders}
            </p>
          </div>

          {/* Average Order */}

          <div
            className={`rounded-2xl border p-5 shadow-sm ${
              darkMode
                ? "bg-gray-900 border-gray-800"
                : "bg-white/90 border-gray-100"
            }`}
          >
            <p
              className={`text-sm ${
                darkMode
                  ? "text-gray-400"
                  : "text-gray-500"
              }`}
            >
              Average Order
            </p>

            <p className="text-xl font-bold mt-2">
              {formatCurrency(
                summary.averageOrderValue
              )}
            </p>
          </div>

          {/* Items Sold */}

          <div
            className={`rounded-2xl border p-5 shadow-sm ${
              darkMode
                ? "bg-gray-900 border-gray-800"
                : "bg-white/90 border-gray-100"
            }`}
          >
            <p
              className={`text-sm ${
                darkMode
                  ? "text-gray-400"
                  : "text-gray-500"
              }`}
            >
              Items Sold
            </p>

            <p className="text-2xl font-bold mt-2">
              {summary.itemsSold}
            </p>
          </div>
        </div>

        {/* -------------------------------- */}
        {/* Results Header */}
        {/* -------------------------------- */}

        <div className="flex items-center justify-between mt-8 mb-3">
          <div>
            <h2 className="text-lg font-bold">
              Orders
            </h2>

            <p
              className={`text-sm ${
                darkMode
                  ? "text-gray-400"
                  : "text-gray-500"
              }`}
            >
              {pagination.totalRecords}{" "}
              {pagination.totalRecords === 1
                ? "order"
                : "orders"}{" "}
              found
            </p>
          </div>
        </div>

        {/* -------------------------------- */}
        {/* Orders Preview */}
        {/* -------------------------------- */}

        <div
          className={`rounded-2xl border shadow-sm overflow-hidden ${
            darkMode
              ? "bg-gray-900 border-gray-800"
              : "bg-white/90 border-gray-100"
          }`}
        >
          {loading ? (
            <div className="p-10 text-center text-gray-400">
              Loading report...
            </div>
          ) : orders.length === 0 ? (
            <div className="p-10 text-center text-gray-400">
              No orders found for the selected filters.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead
                  className={
                    darkMode
                      ? "bg-gray-800 text-gray-400"
                      : "bg-gray-50 text-gray-500"
                  }
                >
                  <tr>
                    <th className="text-left px-5 py-4">
                      Order
                    </th>

                    <th className="text-left px-5 py-4">
                      Date
                    </th>

                    <th className="text-left px-5 py-4">
                      Items
                    </th>

                    <th className="text-left px-5 py-4">
                      Payment
                    </th>

                    <th className="text-left px-5 py-4">
                      Amount
                    </th>

                    <th className="text-left px-5 py-4">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody
                  className={
                    darkMode
                      ? "divide-y divide-gray-800"
                      : "divide-y divide-gray-100"
                  }
                >
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className={
                        darkMode
                          ? "hover:bg-gray-800/60"
                          : "hover:bg-gray-50"
                      }
                    >
                      <td className="px-5 py-4 font-semibold">
                        #{order.orderNumber}
                      </td>

                      <td
                        className={`px-5 py-4 ${
                          darkMode
                            ? "text-gray-400"
                            : "text-gray-500"
                        }`}
                      >
                        {new Date(
                          order.orderDate
                        ).toLocaleString()}
                      </td>

                      <td className="px-5 py-4">
                        <div className="space-y-1">
                          {order.items?.map(
                            (item, index) => (
                              <div key={index}>
                                {item.itemName} ×{" "}
                                {item.quantity}
                              </div>
                            )
                          )}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        {order.paymentMethod ===
                        "InternalTransfer"
                          ? "Internal Transfer"
                          : order.paymentMethod}
                      </td>

                      <td className="px-5 py-4 font-semibold">
                        {formatCurrency(
                          order.totalAmount
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                            order.status ===
                            "Served"
                              ? "bg-green-100 text-green-600 dark:bg-green-950/40 dark:text-green-400"
                              : order.status ===
                                "Pending"
                              ? "bg-orange-100 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400"
                              : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Report;