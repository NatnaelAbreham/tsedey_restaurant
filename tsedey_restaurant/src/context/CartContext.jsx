import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const clearCart = () => {
    setCartItems([]);
  };
  const addToCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);

      if (existing) {

        // Limited stock
        if (
          item.quantity_limit === true &&
          item.quantityAvailable !== null &&
          existing.quantity >= item.quantityAvailable
        ) {
          return prev;
        }

        return prev.map(i =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      // If limited and no stock available, don't add
      if (
        item.quantity_limit === true &&
        item.quantityAvailable !== null &&
        item.quantityAvailable <= 0
      ) {
        return prev;
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id, qty) => {
    setCartItems(prev =>
      prev.flatMap(item => {

        if (item.id !== id) {
          return [item];
        }

        // Remove item
        if (qty <= 0) {
          return [];
        }

        // Limited stock
        if (
          item.quantity_limit === true &&
          item.quantityAvailable !== null &&
          qty > item.quantityAvailable
        ) {
          return [item];
        }

        return [
          {
            ...item,
            quantity: qty
          }
        ];
      })
    );
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const handlePlaceOrder = () => {
    if (!cartItems.length) return;
    setShowSuccess(true);
    setCartItems([]);
    setIsCartOpen(false);
  };

  const totalItems = useMemo(
    () => cartItems.reduce((sum, i) => sum + i.quantity, 0),
    [cartItems]
  );

  const totalPrice = useMemo(
    () => cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [cartItems]
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        isCartOpen,
        setIsCartOpen,
        showSuccess,
        setShowSuccess,
        addToCart,
        updateQuantity,
        removeItem,
        handlePlaceOrder,
        totalItems,
        totalPrice,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);