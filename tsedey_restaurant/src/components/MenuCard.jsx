// src/components/MenuCard.jsx
import React, { useState } from 'react'

const MenuCard = ({ item, addToCart }) => {
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    addToCart(item)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 1500)
  }

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover hover:scale-105 transition duration-500"
        />
        {item.popular && (
          <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Popular
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
          <span className="text-orange-500 font-bold">${item.price}</span>
        </div>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{item.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
            {item.category}
          </span>
          <button
            onClick={handleAddToCart}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center space-x-1 ${
              isAdded 
                ? "bg-green-500 text-white" 
                : "bg-orange-500 text-white hover:bg-orange-600"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>{isAdded ? "Added!" : "Add to Cart"}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default MenuCard