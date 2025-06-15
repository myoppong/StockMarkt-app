import React, { createContext, useContext, useState, useEffect } from 'react';
import * as cartService from '../services/cartService';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items,    setItems]    = useState([]);
  const [loading,  setLoading]  = useState(true);

  const loadCart = async () => {
    try {
      const res = await cartService.fetchCart();
      setItems(res.data);
    } catch {
      // On 401 or other error, treat as empty
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <CartContext.Provider value={{ items, loading, reload: loadCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
