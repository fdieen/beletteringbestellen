import React, { createContext, useContext, useState, useCallback } from 'react';
import { ColorOption, FontOption, PriceCalculation } from '@/lib/pricing';

export interface CartItem {
  id: string;
  text: string;
  font: FontOption;
  color: ColorOption;
  heightCm: number;
  quantity: number;
  priceCalculation: PriceCalculation;
  // Logo upload properties (optional)
  logoImage?: string;
  logoWidth?: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  editingItem: CartItem | null;
  startEdit: (item: CartItem) => void;
  clearEdit: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [editingItem, setEditingItem] = useState<CartItem | null>(null);

  const addItem = useCallback((item: Omit<CartItem, 'id'>) => {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setItems(prev => [...prev, { ...item, id }]);
  }, []);

  const startEdit = useCallback((item: CartItem) => {
    setEditingItem(item);
  }, []);

  const clearEdit = useCallback(() => {
    setEditingItem(null);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.priceCalculation.total, 0);

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
      editingItem,
      startEdit,
      clearEdit,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
