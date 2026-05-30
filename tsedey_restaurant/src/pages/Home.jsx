// src/pages/Home.jsx
import React from 'react'
import Menu from '../components/Menu'

const Home = ({ addToCart, darkMode }) => {
  return (
    <div>
      {/* Hero Section */}
      <section className={`relative ${
        darkMode ? 'bg-gradient-to-r from-orange-600 to-orange-700' : 'bg-gradient-to-r from-orange-500 to-orange-600'
      } text-white`}>
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Welcome to Tsedey Restaurant
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Experience the finest dining with authentic flavors
            </p>
            <a 
              href="/menu" 
              className="inline-block bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition transform hover:scale-105"
            >
              View Our Menu
            </a>
          </div>
        </div>
      </section>

      {/* Featured Menu Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className={`text-3xl font-bold text-center mb-12 ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Our Featured Dishes
          </h2>
          <Menu addToCart={addToCart} limit={4} darkMode={darkMode} />
        </div>
      </section>

      {/* About Section */}
      <section className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                About Us
              </h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Founded in 2010, Tsedey Restaurant has been serving delicious, 
                authentic cuisine made from the freshest ingredients.
              </p>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Our commitment to quality and exceptional service has made us 
                a favorite destination for food lovers.
              </p>
            </div>
            <div className={`${darkMode ? 'bg-gray-700' : 'bg-orange-100'} rounded-lg h-64 flex items-center justify-center`}>
              <span className={darkMode ? 'text-gray-400' : 'text-orange-500'}>
                Restaurant Image Placeholder
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home