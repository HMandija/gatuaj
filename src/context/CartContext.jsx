import React, { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // [{id,name,price,qty,image}]

  const add = (product, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((x) => x.id === product.id);
      if (found) {
        return prev.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty + qty } : x
        );
      }
      return [...prev, { ...product, qty }];
    });
  };

  const remove = (id) => setItems((prev) => prev.filter((x) => x.id !== id));
  const setQty = (id, qty) =>
    setItems((prev) =>
      prev.map((x) => (x.id === id ? { ...x, qty: Math.max(1, qty) } : x))
    );
  const clear = () => setItems([]);

  const total = useMemo(
    () => items.reduce((sum, x) => sum + x.price * x.qty, 0),
    [items]
  );
  const count = useMemo(
    () => items.reduce((sum, x) => sum + x.qty, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{ items, add, remove, setQty, clear, total, count }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
