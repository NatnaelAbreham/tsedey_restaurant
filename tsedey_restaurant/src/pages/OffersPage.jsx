// src/pages/OffersPage.jsx
import React from 'react'

const OffersPage = ({ addToCart, darkMode }) => {
  const offers = [
    {
      id: 1,
      title: "Weekend Special",
      description: "20% off on all main courses",
      code: "WEEKEND20",
      validUntil: "Dec 31, 2024"
    },
    {
      id: 2,
      title: "Family Pack",
      description: "Buy 2 get 1 free on selected items",
      code: "FAMILY2024",
      validUntil: "Dec 31, 2024"
    },
    {
      id: 3,
      title: "Happy Hours",
      description: "Free dessert with every meal (6-8 PM)",
      code: "HAPPYHOUR",
      validUntil: "Dec 31, 2024"
    }
  ]

  return (
    <div className={`max-w-7xl mx-auto px-4 py-12 ${darkMode ? 'bg-gray-900' : ''}`}>
      <h1 className={`text-4xl font-bold text-center mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        Special Offers
      </h1>
      <p className={`text-center mb-12 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        Check out our amazing deals and save on your favorite dishes
      </p>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {offers.map(offer => (
          <div key={offer.id} className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-lg overflow-hidden border`}>
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4">
              <h3 className="text-xl font-bold text-white">{offer.title}</h3>
            </div>
            <div className="p-6">
              <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{offer.description}</p>
              <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded p-3 mb-4`}>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Promo Code:</p>
                <p className="font-mono font-bold text-orange-600">{offer.code}</p>
              </div>
              <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Valid until: {offer.validUntil}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OffersPage