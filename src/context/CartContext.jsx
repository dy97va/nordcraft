import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, fs } from '../config/Config';

const CartContext = createContext();

export function CartContextProvider({ children }) {
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const cartRef = fs.collection('Cart ' + user.uid);
        const unsubscribeCart = cartRef.onSnapshot((snapshot) => {
          const qty = snapshot.docs.length;
          setTotalProducts(qty);
        });

        return () => {
          unsubscribeCart();
        };
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <CartContext.Provider value={totalProducts}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
