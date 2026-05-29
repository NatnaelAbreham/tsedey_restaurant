// src/components/Contact.jsx
import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#e7f2fd] via-[#f8fbff] to-white flex items-center justify-center px-4 py-16">
      
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10">

        {/* Left Info */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            Get in Touch 🍽️
          </h1>

          <p className="text-gray-600 mb-6">
            Have questions, feedback, or want to partner with us?  
            We’d love to hear from you anytime.
          </p>

          <div className="space-y-4 text-gray-700">
            <p>📍 Addis Ababa, Ethiopia</p>
            <p>📞 +251 900 000 000</p>
            <p>📧 support@tsedeyrestaurant.com</p>
          </div>

          <div className="mt-8 flex gap-3">
            <span className="w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center hover:scale-110 transition">
              📱
            </span>
            <span className="w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center hover:scale-110 transition">
              📘
            </span>
            <span className="w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center hover:scale-110 transition">
              📸
            </span>
          </div>
        </div>

        {/* Right Form */}
        <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8 border border-gray-100">
          
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Send us a message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />

            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              rows="5"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
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

export default Contact;