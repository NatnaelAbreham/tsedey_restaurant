import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api/api";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const defaultSchedule = days.map((day) => ({
  dayOfWeek: day,
  startTime: "08:00",
  endTime: "22:00",
  isEnabled: true,
}));

export default function MenuSchedule() {
  const { darkMode } = useTheme();

  const [schedule, setSchedule] = useState(defaultSchedule);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSchedule();
  }, []);

  const loadSchedule = async () => {
    try {
      const response = await api.get("/menuschedule");

      if (response.data?.data?.length > 0) {
        const saved = response.data.data;

        const formatted = days.map((day) => {
          const existing = saved.find(
            (x) =>
              x.dayOfWeek?.toLowerCase() === day.toLowerCase()
          );

          return existing
            ? {
                dayOfWeek: day,
                startTime: existing.startTime?.substring(0, 5) || "08:00",
                endTime: existing.endTime?.substring(0, 5) || "22:00",
                isEnabled: existing.isEnabled,
              }
            : {
                dayOfWeek: day,
                startTime: "08:00",
                endTime: "22:00",
                isEnabled: false,
              };
        });

        setSchedule(formatted);
      }
    } catch (error) {
      console.error(error);

      toast.error("Failed to load menu schedule.");
    } finally {
      setLoading(false);
    }
  };

  const updateDay = (index, field, value) => {
    setSchedule((prev) =>
      prev.map((day, i) =>
        i === index
          ? {
              ...day,
              [field]: value,
            }
          : day
      )
    );
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      await api.post("/menuschedule", {
        days: schedule,
      });

      toast.success("Menu schedule saved successfully.");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to save menu schedule."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          darkMode
            ? "bg-gray-950 text-white"
            : "bg-[#e7f2fd] text-gray-900"
        }`}
      >
        Loading schedule...
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen p-6 md:p-10 ${
        darkMode
          ? "bg-gray-950 text-white"
          : "bg-[#e7f2fd] text-gray-900"
      }`}
    >
      <ToastContainer />

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">
            Menu Schedule
          </h1>

          <p
            className={`mt-2 ${
              darkMode
                ? "text-gray-400"
                : "text-gray-600"
            }`}
          >
            Control when customers can view and order from
            your restaurant menu.
          </p>
        </div>

        {/* Card */}
        <div
          className={`rounded-2xl shadow-xl overflow-hidden ${
            darkMode
              ? "bg-gray-900 border border-gray-800"
              : "bg-white"
          }`}
        >

          {/* Status */}
          <div
            className={`px-6 py-5 border-b ${
              darkMode
                ? "border-gray-800"
                : "border-gray-200"
            }`}
          >
            <div className="flex items-center gap-3">

              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>

                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>

              <span className="font-semibold">
                Menu Schedule Enabled
              </span>

            </div>
          </div>

          {/* Schedule */}
          <div className="p-6">

            <div className="space-y-4">

              {schedule.map((day, index) => (
                <div
                  key={day.dayOfWeek}
                  className={`grid grid-cols-1 md:grid-cols-4 gap-4 items-center p-4 rounded-xl ${
                    darkMode
                      ? "bg-gray-800"
                      : "bg-gray-50"
                  }`}
                >

                  {/* Day */}
                  <div className="font-semibold">
                    {day.dayOfWeek}
                  </div>

                  {/* Start */}
                  <div>
                    <label
                      className={`block text-xs mb-1 ${
                        darkMode
                          ? "text-gray-400"
                          : "text-gray-500"
                      }`}
                    >
                      Opens
                    </label>

                    <input
                      type="time"
                      value={day.startTime}
                      disabled={!day.isEnabled}
                      onChange={(e) =>
                        updateDay(
                          index,
                          "startTime",
                          e.target.value
                        )
                      }
                      className={`w-full px-3 py-2 rounded-lg border outline-none ${
                        darkMode
                          ? "bg-gray-900 border-gray-700 text-white"
                          : "bg-white border-gray-300"
                      }`}
                    />
                  </div>

                  {/* End */}
                  <div>
                    <label
                      className={`block text-xs mb-1 ${
                        darkMode
                          ? "text-gray-400"
                          : "text-gray-500"
                      }`}
                    >
                      Closes
                    </label>

                    <input
                      type="time"
                      value={day.endTime}
                      disabled={!day.isEnabled}
                      onChange={(e) =>
                        updateDay(
                          index,
                          "endTime",
                          e.target.value
                        )
                      }
                      className={`w-full px-3 py-2 rounded-lg border outline-none ${
                        darkMode
                          ? "bg-gray-900 border-gray-700 text-white"
                          : "bg-white border-gray-300"
                      }`}
                    />
                  </div>

                  {/* Enable */}
                  <div className="flex items-center justify-between md:justify-center gap-3">

                    <span
                      className={`text-sm font-medium ${
                        day.isEnabled
                          ? "text-green-500"
                          : "text-gray-500"
                      }`}
                    >
                      {day.isEnabled
                        ? "Enabled"
                        : "Closed"}
                    </span>

                    <label className="relative inline-flex items-center cursor-pointer">

                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={day.isEnabled}
                        onChange={(e) =>
                          updateDay(
                            index,
                            "isEnabled",
                            e.target.checked
                          )
                        }
                      />

                      <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>

                    </label>

                  </div>

                </div>
              ))}

            </div>

            {/* Save */}
            <div className="flex justify-end mt-8">

              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : "Save Schedule"}
              </button>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}