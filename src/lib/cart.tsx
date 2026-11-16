import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { addLine, cartCount, cartSubtotal, setLineQuantity, type CartLine } from "./cart-math";
import { getProduct } from "./products";

const STORAGE_KEY = "xenovault-cart";

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (slug: string, quantity?: number) => void;
  setQuantity: (slug: string, quantity: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        setLines(parsed.filter((l) => getProduct(l.slug)));
      }
    } catch {
      // ignore corrupt storage
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, loaded]);

  const add = useCallback((slug: string, quantity = 1) => setLines((l) => addLine(l, slug, quantity)), []);
  const setQuantity = useCallback(
    (slug: string, quantity: number) => setLines((l) => setLineQuantity(l, slug, quantity)),
    [],
  );
  const remove = useCallback((slug: string) => setLines((l) => setLineQuantity(l, slug, 0)), []);
  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count: cartCount(lines),
      subtotal: cartSubtotal(lines, (slug) => getProduct(slug)?.price ?? 0),
      add,
      setQuantity,
      remove,
      clear,
    }),
    [lines, add, setQuantity, remove, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
