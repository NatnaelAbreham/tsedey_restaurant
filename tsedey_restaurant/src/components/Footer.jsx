// src/components/Footer.jsx
import React from 'react'

const Footer = ({ darkMode }) => {
  return (
    <footer className={`${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-900'} text-white py-8 mt-auto`}>
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p>&copy; 2024 Tsedey Restaurant. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer