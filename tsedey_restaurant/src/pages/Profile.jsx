
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaUserShield,
    FaArrowLeft
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const { user } = useAuth();
    const { darkMode } = useTheme();
    const navigate = useNavigate();

    return (
        <div
            className={`min-h-screen px-4 py-10 transition-colors duration-300 ${
                darkMode
                    ? "bg-gray-950 text-white"
                    : "bg-[#e7f2fd] text-gray-900"
            }`}
        >
            <div className="max-w-4xl mx-auto">

                {/* Back */}
                <button
                    onClick={() => navigate(-1)}
                    className={`flex items-center gap-2 mb-6 text-sm font-medium transition ${
                        darkMode
                            ? "text-gray-300 hover:text-white"
                            : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                    <FaArrowLeft />
                    Back
                </button>

                {/* Profile Card */}
                <div
                    className={`rounded-3xl border shadow-xl overflow-hidden ${
                        darkMode
                            ? "bg-gray-900 border-gray-800"
                            : "bg-white border-gray-100"
                    }`}
                >

                    {/* Header */}
                    <div className="bg-orange-500 px-8 py-10 text-white">
                        <div className="flex items-center gap-5">

                            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                                <FaUser className="text-4xl" />
                            </div>

                            <div>
                                <h1 className="text-3xl font-bold">
                                    {user?.fullName || "User"}
                                </h1>

                                <p className="mt-1 text-white/80">
                                    {user?.email || ""}
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* Information */}
                    <div className="p-8">

                        <h2
                            className={`text-xl font-semibold mb-6 ${
                                darkMode
                                    ? "text-white"
                                    : "text-gray-900"
                            }`}
                        >
                            Account Information
                        </h2>

                        <div className="grid md:grid-cols-2 gap-5">

                            {/* Full Name */}
                            <div
                                className={`rounded-2xl border p-5 ${
                                    darkMode
                                        ? "bg-gray-800 border-gray-700"
                                        : "bg-gray-50 border-gray-200"
                                }`}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <FaUser className="text-orange-500" />

                                    <span
                                        className={`text-sm ${
                                            darkMode
                                                ? "text-gray-400"
                                                : "text-gray-500"
                                        }`}
                                    >
                                        Full Name
                                    </span>
                                </div>

                                <p className="font-semibold">
                                    {user?.fullName || "-"}
                                </p>
                            </div>

                            {/* Email */}
                            <div
                                className={`rounded-2xl border p-5 ${
                                    darkMode
                                        ? "bg-gray-800 border-gray-700"
                                        : "bg-gray-50 border-gray-200"
                                }`}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <FaEnvelope className="text-orange-500" />

                                    <span
                                        className={`text-sm ${
                                            darkMode
                                                ? "text-gray-400"
                                                : "text-gray-500"
                                        }`}
                                    >
                                        Email
                                    </span>
                                </div>

                                <p className="font-semibold break-all">
                                    {user?.email || "-"}
                                </p>
                            </div>

                            {/* Phone */}
                            <div
                                className={`rounded-2xl border p-5 ${
                                    darkMode
                                        ? "bg-gray-800 border-gray-700"
                                        : "bg-gray-50 border-gray-200"
                                }`}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <FaPhone className="text-orange-500" />

                                    <span
                                        className={`text-sm ${
                                            darkMode
                                                ? "text-gray-400"
                                                : "text-gray-500"
                                        }`}
                                    >
                                        Phone
                                    </span>
                                </div>

                                <p className="font-semibold">
                                    {user?.phone || "-"}
                                </p>
                            </div>

                            {/* Role */}
                            <div
                                className={`rounded-2xl border p-5 ${
                                    darkMode
                                        ? "bg-gray-800 border-gray-700"
                                        : "bg-gray-50 border-gray-200"
                                }`}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <FaUserShield className="text-orange-500" />

                                    <span
                                        className={`text-sm ${
                                            darkMode
                                                ? "text-gray-400"
                                                : "text-gray-500"
                                        }`}
                                    >
                                        Role
                                    </span>
                                </div>

                                <p className="font-semibold">
                                    {user?.role || "-"}
                                </p>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

