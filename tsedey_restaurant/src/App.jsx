// src/App.jsx
import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Menu from './components/Menu'
import CartSidebar from './components/CartSidebar'
import OrderSuccess from './components/OrderSuccess'
import Footer from "./components/Footer";

const App = () => {
  const [cartItems, setCartItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

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
    setTimeout(() => {
      setShowSuccess(false)
    }, 3000)
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e7f2fd] via-[#f8fbff] to-white">
      <Navbar 
        cartItemCount={totalItems} 
        onCartClick={() => setIsCartOpen(true)} 
      />
      <Menu addToCart={addToCart} />
      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
        totalPrice={totalPrice}
        onPlaceOrder={handlePlaceOrder}
      />
      {showSuccess && <OrderSuccess />}
      <Footer />
    </div>
  )
}

export default App