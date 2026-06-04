import { BrowserRouter as Router } from "react-router-dom";


import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import CartSidebar from "./components/CartSidebar";
import OrderSuccess from "./components/OrderSuccess";
import Footer from "./components/Footer";
import { useCart,CartProvider } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext";

const Layout = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    updateQuantity,
    removeItem,
    totalPrice,
    handlePlaceOrder,
    showSuccess,
    setShowSuccess,
    totalItems
  } = useCart();

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
        onPlaceOrder={handlePlaceOrder}
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