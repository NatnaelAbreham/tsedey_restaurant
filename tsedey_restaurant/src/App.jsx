import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import CartSidebar from "./components/CartSidebar";
import OrderSuccess from "./components/OrderSuccess";
import PaymentMethod from "./components/PaymentMethod";
import OrderConfirmation from "./components/OrderConfirmation";
import Footer from "./components/Footer";
import { useCart, CartProvider } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext";

const Layout = () => {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isOrderConfirmationOpen, setIsOrderConfirmationOpen] = useState(false);
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    updateQuantity,
    removeItem,
    totalPrice,
    /* handlePlaceOrder, */
    showSuccess,
    setShowSuccess,
    /* totalItems */
  } = useCart();
  const [orderResult, setOrderResult] = useState(null);



  return (
    <>
      <Navbar />

      <AppRoutes />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
        totalPrice={totalPrice}
        /* onPlaceOrder={handlePlaceOrder} */
        onPlaceOrder={() => setIsPaymentOpen(true)}
      />

      <PaymentMethod
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        onCashSelected={() => {
          setIsPaymentOpen(false);
          setIsOrderConfirmationOpen(true);
        }}
      />

      <OrderConfirmation
        isOpen={isOrderConfirmationOpen}
        onClose={() => setIsOrderConfirmationOpen(false)}
        cartItems={cartItems}
        totalPrice={totalPrice}
      />
      {showSuccess && (
        <OrderSuccess onClose={() => setShowSuccess(false)} />
      )}

      <Footer />
    </>
  );
};



const App = () => {
  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <Layout />
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
};

export default App;