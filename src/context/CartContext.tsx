import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface CartItem {
  id: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (id: string, quantity: number) => void;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (id: string, quantity: number) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [...prevItems, { id, quantity }];
    });
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, getTotalItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 