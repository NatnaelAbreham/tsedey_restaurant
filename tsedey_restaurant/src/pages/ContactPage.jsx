// src/pages/ContactPage.jsx
import React, { useState } from "react";

const ContactPage = ({ darkMode }) => {
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
    <section className={`min-h-screen ${
      darkMode ? 'bg-gray-900' : 'bg-gradient-to-b from-[#e7f2fd] via-[#f8fbff] to-white'
    } flex items-center justify-center px-4 py-16`}>
      
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10">

        {/* Left Info */}
        <div className="flex flex-col justify-center">
          <h1 className={`text-4xl font-extrabold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Get in Touch 🍽️
          </h1>

          <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Have questions, feedback, or want to partner with us?  
            We'd love to hear from you anytime.
          </p>

          <div className={`space-y-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <p>📍 Addis Ababa, Ethiopia</p>
            <p>📞 +251 900 000 000</p>
            <p>📧 support@tsedeyrestaurant.com</p>
          </div>

          <div className="mt-8 flex gap-3">
            <span className={`w-10 h-10 ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white'} shadow-md rounded-full flex items-center justify-center hover:scale-110 transition`}>
              📱
            </span>
            <span className={`w-10 h-10 ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white'} shadow-md rounded-full flex items-center justify-center hover:scale-110 transition`}>
              📘
            </span>
            <span className={`w-10 h-10 ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white'} shadow-md rounded-full flex items-center justify-center hover:scale-110 transition`}>
              📸
            </span>
          </div>
        </div>

        {/* Right Form */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/80 border-gray-100'} backdrop-blur-md shadow-xl rounded-2xl p-8 border`}>
          
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Send us a message
          </h2>

          {submitted && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              Thank you! Your message has been sent.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-200'
              }`}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-200'
              }`}
              required
            />

            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              rows="5"
              className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-200'
              }`}
              required
            />

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition-all duration-300 active:scale-95"
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