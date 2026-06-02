import React from "react";
import Menu from "../components/Menu";

const Home = ({ addToCart, darkMode }) => {
  // Lighter, more vibrant hero image with better brightness
  const heroImage =
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop";

  const stats = [
    { value: "15+", label: "Years Experience", icon: "fa-regular fa-clock" },
    { value: "20K+", label: "Happy Customers", icon: "fa-regular fa-heart" },
    { value: "50+", label: "Signature Dishes", icon: "fa-regular fa-star" },
    { value: "4.9★", label: "Rating", icon: "fa-solid fa-star" },
  ];

  const features = [
    {
      title: "Fresh Ingredients",
      description:
        "Farm-to-table philosophy. Every spice, every vegetable is handpicked for authentic Ethiopian flavors.",
      icon: "fa-solid fa-leaf",
    },
    {
      title: "Authentic Recipes",
      description:
        "Century-old family recipes passed down, preserving the soul of Ethiopian cuisine.",
      icon: "fa-solid fa-utensils",
    },
    {
      title: "Fast Service & Warmth",
      description:
        "Exceptional hospitality and lightning-fast service without compromising quality.",
      icon: "fa-solid fa-hand-sparkles",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Food Enthusiast",
      text: "Hands down the best Ethiopian restaurant I've ever visited. The doro wat is pure magic!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Regular Customer",
      text: "Incredible atmosphere, authentic tastes, and staff treats you like family. Highly recommend!",
      rating: 5,
    },
    {
      name: "Ruth Habte",
      role: "Ethiopian Foodie",
      text: "The injera is perfectly sour, the tibs are melt-in-your-mouth. Tsedey never disappoints.",
      rating: 5,
    },
  ];

  return (
    <div
      className={
        darkMode
          ? "bg-gray-950 text-white"
          : "bg-white text-gray-900"
      }
    >
      {/* HERO SECTION - Fixed darkness issue, lighter overlay, more content structure */}
      <section className="relative min-h-[90vh] md:min-h-screen overflow-hidden flex items-center">
        {/* Background image with improved brightness - reduced overlay darkness */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundPosition: "center 30%",
          }}
        />
        
        {/* Lighter overlay instead of heavy black - preserves visual appeal */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/40 md:from-black/60 md:via-black/40 md:to-black/30" />
        
        {/* Subtle warm glow instead of dark blob - adds life */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-400/25 blur-[130px] rounded-full" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-amber-500/20 blur-[140px] rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-60 h-60 bg-red-400/15 blur-[100px] rounded-full" />

        {/* Main hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 w-full py-20 md:py-0">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white mb-6 shadow-sm">
              <span className="text-orange-300 text-sm">✦</span>
              <span className="text-sm font-medium tracking-wide">Authentic Ethiopian Cuisine</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.15] mb-6 text-white drop-shadow-lg">
              Taste Tradition
              <span className="block text-amber-400 relative inline-block mt-2">
                In Every Bite
                <svg className="absolute -bottom-3 left-0 w-full h-3 text-amber-500/40" viewBox="0 0 200 10" fill="currentColor">
                  <path d="M0,5 Q25,0 50,5 T100,5 T150,5 T200,5" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </span>
            </h1>

            <p className="text-base md:text-xl text-gray-100 max-w-2xl mb-10 leading-relaxed drop-shadow-md">
              Experience handcrafted Ethiopian dishes, premium ingredients, 
              and unforgettable dining moments in a warm, elegant atmosphere.
            </p>

            <div className="flex flex-wrap gap-5">
              <button 
                onClick={() => window.location.href = '/menu'} 
                className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold shadow-xl shadow-orange-500/30 hover:shadow-2xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 flex items-center gap-2"
              >
                <span>Explore Menu</span>
                <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
              </button>

              <button className="px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center gap-2 shadow-md">
                <i className="fa-regular fa-calendar-check"></i>
                <span>Book a Table</span>
              </button>
            </div>
          </div>
        </div>

        {/* Floating Stats Cards - redesigned to look modern and elegant */}
        <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 w-full max-w-6xl px-5 z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {stats.map((item) => (
              <div
                key={item.label}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 text-center hover:bg-white/20 transition-all duration-300 shadow-lg"
              >
                <i className={`${item.icon} text-orange-400 text-2xl mb-2 block`}></i>
                <h3 className="text-2xl md:text-3xl font-extrabold text-orange-400">
                  {item.value}
                </h3>
                <p className="text-gray-100 text-xs md:text-sm font-medium tracking-wide">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

 
    </div>
  );
};

export default Home;