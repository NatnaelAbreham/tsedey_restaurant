
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const navigate = useNavigate();
    const { darkMode } = useTheme();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        setError("");

        if (!email || !password) {
            setError("Please enter your email and password.");
            return;
        }

        try {
            setLoading(true);

            const response = await login(email, password);

            if (response.success) {
                navigate("/dashboard", { replace: true });
            }
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to sign in. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
                darkMode
                    ? "bg-gray-950 text-white"
                    : "bg-[#e7f2fd] text-gray-900"
            }`}
        >

            <div
                className={`w-full max-w-6xl rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2 min-h-[650px] border transition-colors duration-300 ${
                    darkMode
                        ? "bg-gray-900 border-gray-800"
                        : "bg-white border-gray-100"
                }`}
            >

                {/* LEFT - LOGIN */}
                <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-12">

                    {/* Logo / Brand */}
                    <div className="mb-10">

                        <div className="flex items-center gap-3 mb-8">

                            <div className="w-11 h-11 rounded-xl bg-orange-500 flex items-center justify-center shadow-lg">
                                <i className="bi bi-shop text-white text-xl"></i>
                            </div>

                            <span
                                className={`text-xl font-bold ${
                                    darkMode
                                        ? "text-white"
                                        : "text-gray-900"
                                }`}
                            >
                                Restaurant
                            </span>

                        </div>

                        <h1
                            className={`text-3xl sm:text-4xl font-bold ${
                                darkMode
                                    ? "text-white"
                                    : "text-gray-900"
                            }`}
                        >
                            Welcome back
                        </h1>

                        <p
                            className={`mt-3 ${
                                darkMode
                                    ? "text-gray-300"
                                    : "text-gray-600"
                            }`}
                        >
                            Sign in to continue to your account.
                        </p>

                    </div>


                    {/* Error */}
                    {error && (
                        <div
                            className={`mb-6 flex items-start gap-3 rounded-xl border px-4 py-3 ${
                                darkMode
                                    ? "bg-red-500/10 border-red-500/30 text-red-400"
                                    : "bg-red-50 border-red-200 text-red-600"
                            }`}
                        >

                            <i className="bi bi-exclamation-circle-fill mt-0.5"></i>

                            <span className="text-sm">
                                {error}
                            </span>

                        </div>
                    )}


                    {/* FORM */}
                    <form onSubmit={handleLogin} className="space-y-6">

                        {/* Email */}
                        <div>

                            <label
                                className={`block text-sm font-medium mb-2 ${
                                    darkMode
                                        ? "text-gray-200"
                                        : "text-gray-700"
                                }`}
                            >
                                Email address
                            </label>

                            <div className="relative">

                                <i
                                    className={`bi bi-envelope absolute left-4 top-1/2 -translate-y-1/2 ${
                                        darkMode
                                            ? "text-gray-500"
                                            : "text-gray-400"
                                    }`}
                                ></i>

                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    placeholder="you@company.com"
                                    autoComplete="username"
                                    disabled={loading}
                                    className={`w-full rounded-xl border py-3.5 pl-11 pr-4 outline-none transition focus:ring-2 focus:ring-orange-400 disabled:opacity-60 ${
                                        darkMode
                                            ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-orange-400"
                                            : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-orange-400"
                                    }`}
                                />

                            </div>

                        </div>


                        {/* Password */}
                        <div>

                            <label
                                className={`block text-sm font-medium mb-2 ${
                                    darkMode
                                        ? "text-gray-200"
                                        : "text-gray-700"
                                }`}
                            >
                                Password
                            </label>

                            <div className="relative">

                                <i
                                    className={`bi bi-lock absolute left-4 top-1/2 -translate-y-1/2 ${
                                        darkMode
                                            ? "text-gray-500"
                                            : "text-gray-400"
                                    }`}
                                ></i>

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    disabled={loading}
                                    className={`w-full rounded-xl border py-3.5 pl-11 pr-12 outline-none transition focus:ring-2 focus:ring-orange-400 disabled:opacity-60 ${
                                        darkMode
                                            ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-orange-400"
                                            : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-orange-400"
                                    }`}
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className={`absolute right-4 top-1/2 -translate-y-1/2 transition ${
                                        darkMode
                                            ? "text-gray-500 hover:text-gray-300"
                                            : "text-gray-400 hover:text-gray-600"
                                    }`}
                                >

                                    <i
                                        className={`bi ${
                                            showPassword
                                                ? "bi-eye-slash"
                                                : "bi-eye"
                                        }`}
                                    ></i>

                                </button>

                            </div>

                        </div>


                        {/* Login button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-orange-500 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                        >

                            {loading ? (
                                <span className="flex items-center justify-center gap-2">

                                    <i className="bi bi-arrow-repeat animate-spin"></i>

                                    Signing in...

                                </span>
                            ) : (
                                <span className="flex items-center justify-center gap-2">

                                    Sign in

                                    <i className="bi bi-arrow-right"></i>

                                </span>
                            )}

                        </button>

                    </form>


                    {/* Footer */}
                    <div
                        className={`mt-8 flex items-center gap-2 text-sm ${
                            darkMode
                                ? "text-gray-400"
                                : "text-gray-500"
                        }`}
                    >

                        <i className="bi bi-shield-check"></i>

                        <span>
                            Access is restricted to authorized users.
                        </span>

                    </div>

                </div>


                {/* RIGHT - IMAGE */}
                <div className="relative hidden lg:block">

                    <img
                        src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=85"
                        alt="Restaurant food"
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"></div>


                    {/* Image Content */}
                    <div className="absolute inset-x-0 bottom-0 p-12 text-white">

                        <div className="mb-5 flex items-center gap-2">

                            <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">

                                <i className="bi bi-stars text-lg"></i>

                            </div>

                            <span className="text-sm font-medium tracking-wide uppercase">
                                Restaurant Management
                            </span>

                        </div>

                        <h2 className="text-4xl font-bold leading-tight">
                            Great food starts
                            <br />
                            with great service.
                        </h2>

                        <p className="mt-4 max-w-md text-white/80 leading-relaxed">
                            Manage your restaurant, orders and daily operations
                            from one simple platform.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}
