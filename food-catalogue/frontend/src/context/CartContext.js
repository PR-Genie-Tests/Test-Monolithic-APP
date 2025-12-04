import React, { createContext, useState } from 'react';

export const CartContext = createContext();

// Bug: Race conditions
const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addToCart = (item) => {
    setItems([...items, item]);
  };

  const removeFromCart = (itemToRemove) => {
    setItems(items.filter((item) => item.id !== itemToRemove.id));
  };

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
