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

      {/* FEATURED DISHES SECTION - Improved structure */}
      <section
        className={`py-20 md:py-28 ${
          darkMode ? "bg-gray-950" : "bg-gray-50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-orange-500 font-semibold tracking-wide uppercase text-sm">Signature Collection</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
              Featured <span className="text-orange-500">Dishes</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-amber-500 mx-auto rounded-full"></div>
            <p
              className={`text-center max-w-2xl mx-auto mt-5 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Our most loved meals, crafted with passion and centuries-old Ethiopian traditions.
            </p>
          </div>

          <div className="relative">
            <Menu
              addToCart={addToCart}
              limit={4}
              darkMode={darkMode}
            />
          </div>
          
          <div className="text-center mt-12">
            <button 
              onClick={() => window.location.href = '/menu'}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-orange-500 text-orange-500 font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300"
            >
              View Full Menu
              <i className="fa-solid fa-chevron-right text-sm"></i>
            </button>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US - Enhanced with icons and better layout */}
      <section
        className={`py-20 md:py-28 ${
          darkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-orange-500 font-semibold tracking-wide uppercase text-sm">Why we shine</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3">
              The Tsedey <span className="text-orange-500">Experience</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-amber-500 mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {features.map((item) => (
              <div
                key={item.title}
                className={`group rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 ${
                  darkMode
                    ? "bg-gray-800/60 border border-gray-700 hover:border-orange-500/40 shadow-xl"
                    : "bg-white border border-gray-100 shadow-xl hover:shadow-2xl"
                }`}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <i className={`${item.icon} text-white text-2xl`}></i>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-orange-500">
                  {item.title}
                </h3>
                <p
                  className={`leading-relaxed ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION - NEW attractive block */}
      <section
        className={`py-20 md:py-28 ${
          darkMode ? "bg-gray-950" : "bg-gradient-to-b from-orange-50/50 to-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="text-center mb-12">
            <i className="fa-solid fa-quote-left text-orange-400 text-3xl opacity-70"></i>
            <h2 className="text-4xl md:text-5xl font-bold mt-3">
              Guest <span className="text-orange-500">Love</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-amber-500 mx-auto rounded-full mt-4"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial, idx) => (
              <div 
                key={idx}
                className={`p-6 rounded-2xl ${
                  darkMode ? "bg-gray-800/70 border border-gray-700" : "bg-white shadow-lg border border-orange-100"
                } transition-all duration-300 hover:scale-[1.02]`}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <i key={i} className="fa-solid fa-star text-amber-400 text-sm"></i>
                  ))}
                </div>
                <p className={`italic mb-5 leading-relaxed ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{testimonial.name}</p>
                    <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT + STRONG CTA - redesigned with better visual structure */}
      <section
        className={`py-20 md:py-24 ${
          darkMode
            ? "bg-gradient-to-br from-gray-900 via-gray-950 to-black"
            : "bg-gradient-to-br from-orange-50 via-amber-50 to-white"
        } border-t ${
          darkMode ? "border-gray-800" : "border-orange-100"
        }`}
      >
        <div className="max-w-5xl mx-auto px-5 md:px-8 text-center">
          <div className="inline-block p-3 rounded-full bg-orange-500/10 mb-6">
            <i className="fa-solid fa-landmark text-orange-500 text-2xl"></i>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="text-orange-500">Tsedey Restaurant</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-amber-500 mx-auto rounded-full mb-8"></div>
          <p
            className={`text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-8 ${
              darkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Since 2010, Tsedey Restaurant has proudly served authentic Ethiopian cuisine made from the 
            freshest ingredients. We bring people together through exceptional food, warm hospitality, 
            and memorable dining experiences that honor centuries-old traditions.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <button className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-orange-500 text-white font-bold shadow-lg hover:bg-orange-600 hover:scale-105 transition-all duration-300">
              <i className="fa-solid fa-utensils"></i>
              <span>Order Now</span>
            </button>
            <button className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-orange-500 text-orange-500 font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300">
              <i className="fa-regular fa-clock"></i>
              <span>Reserve a Table</span>
            </button>
          </div>
        </div>
      </section>
      
      {/* Simple footer note */}
      <footer className={`py-8 text-center text-sm border-t ${darkMode ? "border-gray-800 bg-gray-950/50 text-gray-400" : "border-gray-100 bg-gray-50/80 text-gray-500"}`}>
        <div className="max-w-7xl mx-auto px-5">
          <p>&copy; {new Date().getFullYear()} Tsedey Restaurant — Authentic Ethiopian Flavors. Crafted with passion.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;