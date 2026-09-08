import { useState } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import CartSidebar from "./components/CartSidebar";
import OrderSuccess from "./components/OrderSuccess";
import PaymentMethod from "./components/PaymentMethod";
import InternalTransfer from "./components/InternalTransfer";
import OrderConfirmation from "./components/OrderConfirmation";
import Footer from "./components/Footer";

import { useCart, CartProvider } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";


const Layout = () => {

    const location = useLocation();

    const isLoginPage = location.pathname === "/login";

    const [isPaymentOpen, setIsPaymentOpen] = useState(false);

    const [isInternalTransferOpen, setIsInternalTransferOpen] =
        useState(false);

    const [transferAccountNumber, setTransferAccountNumber] =
        useState("");

    const [accountDetails, setAccountDetails] = useState(null);

    const [isOrderConfirmationOpen, setIsOrderConfirmationOpen] =
        useState(false);

    const {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        updateQuantity,
        removeItem,
        totalPrice,
        showSuccess,
        setShowSuccess
    } = useCart();

    const [orderResult, setOrderResult] = useState(null);


    // LOGIN PAGE
    if (isLoginPage) {
        return <AppRoutes />;
    }


    // APPLICATION
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
                onPlaceOrder={() => setIsPaymentOpen(true)}
            />

            <PaymentMethod
                isOpen={isPaymentOpen}
                onClose={() => setIsPaymentOpen(false)}
                totalPrice={totalPrice}
                onCashSelected={() => {
                    setIsPaymentOpen(false);
                    setIsOrderConfirmationOpen(true);
                }}
                onTransferSelected={(accountNumber) => {
                    setTransferAccountNumber(accountNumber);
                    setIsPaymentOpen(false);
                    setIsInternalTransferOpen(true);
                }}
            />

            <InternalTransfer
                isOpen={isInternalTransferOpen}
                onClose={() => setIsInternalTransferOpen(false)}
                accountNumber={transferAccountNumber}
                totalPrice={totalPrice}
                cartItems={cartItems}
                onOrderCreated={(order) => {
                    setOrderResult(order);
                    setShowSuccess(true);
                }}
            />

            <OrderConfirmation
                isOpen={isOrderConfirmationOpen}
                onClose={() => setIsOrderConfirmationOpen(false)}
                cartItems={cartItems}
                totalPrice={totalPrice}
                onOrderCreated={(order) => {
                    setOrderResult(order);
                    setShowSuccess(true);
                }}
            />

            {showSuccess && (
                <OrderSuccess
                    order={orderResult}
                    onClose={() => {
                        setShowSuccess(false);
                        setOrderResult(null);
                    }}
                />
            )}

            <Footer />
        </>
    );
};


const App = () => {
    return (
        <ThemeProvider>
            <CartProvider>
                <AuthProvider>
                    <Router>
                        <Layout />
                    </Router>
                </AuthProvider>
            </CartProvider>
        </ThemeProvider>
    );
};

export default App;