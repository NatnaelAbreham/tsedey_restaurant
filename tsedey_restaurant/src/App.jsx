// src/App.jsx
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Menu from './components/Menu'
import CartSidebar from './components/CartSidebar'
import OrderSuccess from './components/OrderSuccess'
import Footer from "./components/Footer"
import Home from './pages/Home'
import ContactPage from './pages/ContactPage'
import OffersPage from './pages/OffersPage'

const App = () => {
  const [cartItems, setCartItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })

  // Apply dark mode to body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const addToCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id)
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      }
      return [...prevItems, { ...item, quantity: 1 }]
    })
  }

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      setCartItems(prev => prev.filter(item => item.id !== id))
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      )
    }
  }

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return
    setShowSuccess(true)
    setCartItems([])
    setIsCartOpen(false)
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-300 ${
        darkMode 
          ? 'bg-gray-900' 
          : 'bg-gradient-to-b from-[#e7f2fd] via-[#f8fbff] to-white'
      }`}>
        <Navbar 
          cartItemCount={totalItems} 
          onCartClick={() => setIsCartOpen(true)}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
        
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} darkMode={darkMode} />} />
          <Route path="/menu" element={<Menu addToCart={addToCart} darkMode={darkMode} />} />
          <Route path="/contact" element={<ContactPage darkMode={darkMode} />} />
          <Route path="/offers" element={<OffersPage addToCart={addToCart} darkMode={darkMode} />} />
        </Routes>
        
        <CartSidebar 
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          updateQuantity={updateQuantity}
          removeItem={removeItem}
          totalPrice={totalPrice}
          onPlaceOrder={handlePlaceOrder}
          darkMode={darkMode}
        />
        
        {showSuccess && (
          <OrderSuccess 
            onClose={() => setShowSuccess(false)} 
            darkMode={darkMode}
          />
        )}
        
        <Footer darkMode={darkMode} />
      </div>
    </Router>
  )
}

export default App