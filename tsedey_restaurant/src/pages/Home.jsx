import React from "react";
import Menu from "../components/Menu";

const Home = ({ addToCart, darkMode }) => {
  return (
    <div>
      {/* Hero Section */}
      <section
        className={`relative overflow-hidden ${
          darkMode
            ? "bg-gradient-to-br from-gray-950 via-orange-900 to-black"
            : "bg-gradient-to-br from-orange-500 via-orange-600 to-red-500"
        }`}
      >
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-36">
          <div className="text-center">
            <span className="inline-block bg-white/20 backdrop-blur-md px-5 py-2 rounded-full text-white text-sm font-medium mb-6">
              🍽 Authentic Ethiopian Cuisine
            </span>

            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
              Taste Tradition
              <span className="block text-amber-300">
                In Every Bite
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/90 mb-10">
              Discover rich flavors, fresh ingredients, and unforgettable
              dining experiences prepared with passion.
            </p>

            <a
              href="/menu"
              className="inline-block bg-white text-orange-600 px-8 py-4 rounded-full font-bold shadow-xl hover:scale-105 transition duration-300"
            >
              Explore Menu
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className={`py-12 ${
          darkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                value: "15+",
                label: "Years Experience",
              },
              {
                value: "20K+",
                label: "Happy Customers",
              },
              {
                value: "50+",
                label: "Special Dishes",
              },
              {
                value: "4.9★",
                label: "Customer Rating",
              },
            ].map((item) => (
              <div
                key={item.label}
                className={`rounded-2xl p-6 text-center ${
                  darkMode
                    ? "bg-gray-800"
                    : "bg-orange-50"
                }`}
              >
                <h3 className="text-3xl font-bold text-orange-500">
                  {item.value}
                </h3>

                <p
                  className={
                    darkMode
                      ? "text-gray-300"
                      : "text-gray-600"
                  }
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section
        className={`py-20 ${
          darkMode
            ? "bg-gray-950"
            : "bg-gray-50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2
            className={`text-4xl font-bold text-center mb-4 ${
              darkMode
                ? "text-white"
                : "text-gray-900"
            }`}
          >
            Featured Dishes
          </h2>

          <p
            className={`text-center mb-12 ${
              darkMode
                ? "text-gray-400"
                : "text-gray-600"
            }`}
          >
            Handpicked favorites loved by our customers.
          </p>

          <Menu
            addToCart={addToCart}
            limit={4}
            darkMode={darkMode}
          />
        </div>
      </section>

      {/* Why Choose Us */}
      <section
        className={`py-20 ${
          darkMode
            ? "bg-gray-900"
            : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2
            className={`text-4xl font-bold text-center mb-12 ${
              darkMode
                ? "text-white"
                : "text-gray-900"
            }`}
          >
            Why Choose Us
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-orange-500 text-white rounded-3xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-3">
                Fresh Ingredients
              </h3>

              <p>
                Carefully selected ingredients delivered fresh every day.
              </p>
            </div>

            <div className="bg-amber-500 text-white rounded-3xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-3">
                Authentic Recipes
              </h3>

              <p>
                Traditional flavors crafted with passion and experience.
              </p>
            </div>

            <div className="bg-red-500 text-white rounded-3xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-3">
                Fast Service
              </h3>

              <p>
                Friendly staff committed to exceptional dining experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section
        className={`py-20 ${
          darkMode
            ? "bg-gray-950"
            : "bg-orange-50"
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2
            className={`text-4xl font-bold mb-6 ${
              darkMode
                ? "text-white"
                : "text-gray-900"
            }`}
          >
            About Tsedey Restaurant
          </h2>

          <p
            className={`text-lg leading-relaxed ${
              darkMode
                ? "text-gray-300"
                : "text-gray-700"
            }`}
          >
            Since 2010, Tsedey Restaurant has proudly served authentic
            Ethiopian cuisine made from the freshest ingredients. Our mission
            is to bring people together through exceptional food, warm
            hospitality, and unforgettable dining experiences.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;