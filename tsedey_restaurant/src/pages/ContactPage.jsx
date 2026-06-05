// src/pages/ContactPage.jsx
import  { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const ContactPage = () => {
  const { darkMode } = useTheme();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section
      className={`min-h-screen flex items-center justify-center px-4 py-16 transition-colors duration-300 ${
        darkMode ? "bg-gray-950 text-white" : "bg-[#e7f2fd] text-gray-900"
      }`}
    >
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10">

        {/* LEFT SIDE */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold mb-4">
            Get in Touch 🍽️
          </h1>

          <p
            className={`mb-6 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Have questions, feedback, or want to partner with us?  
            We'd love to hear from you anytime.
          </p>

          <div
            className={`space-y-4 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            <p>📍 Addis Ababa, Ethiopia</p>
            <p>📞 +251 900 000 000</p>
            <p>📧 support@tsedeyrestaurant.com</p>
          </div>

          {/* SOCIAL ICONS */}
          <div className="mt-8 flex gap-3">
            {["📱", "📘", "📸"].map((icon, i) => (
              <span
                key={i}
                className={`w-10 h-10 flex items-center justify-center rounded-full shadow-md cursor-pointer hover:scale-110 transition ${
                  darkMode
                    ? "bg-gray-800 text-gray-200"
                    : "bg-white text-gray-700"
                }`}
              >
                {icon}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT FORM */}
        <div
          className={`backdrop-blur-md shadow-xl rounded-2xl p-8 border transition-colors duration-300 ${
            darkMode
              ? "bg-gray-900 border-gray-800"
              : "bg-white/90 border-gray-100"
          }`}
        >
          <h2 className="text-2xl font-bold mb-6">
            Send us a message
          </h2>

          {/* SUCCESS MESSAGE */}
          {submitted && (
            <div className="bg-green-500/10 border border-green-500 text-green-500 px-4 py-3 rounded mb-4">
              Thank you! Your message has been sent.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* NAME */}
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-400 transition ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  : "bg-white border-gray-200 text-gray-900"
              }`}
              required
            />

            {/* EMAIL */}
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-400 transition ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  : "bg-white border-gray-200 text-gray-900"
              }`}
              required
            />

            {/* MESSAGE */}
            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              rows="5"
              className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-400 transition resize-none ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  : "bg-white border-gray-200 text-gray-900"
              }`}
              required
            />

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition active:scale-95"
            >
              Send Message
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default ContactPage;