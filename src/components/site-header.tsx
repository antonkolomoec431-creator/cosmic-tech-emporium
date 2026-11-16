import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";

import { useCart } from "@/lib/cart";

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
] as const;

export function SiteHeader() {
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="group flex items-center gap-3">
          <span className="relative grid size-8 place-items-center rounded-full border border-primary/60">
            <span className="size-2.5 rounded-full bg-plasma shadow-glow animate-pulse-glow" />
          </span>
          <span className="font-display text-sm font-semibold tracking-[0.3em]">XENOVAULT</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-6">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="label-mono px-2 py-1 text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-primary-glow"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/cart"
            aria-label={`Cart, ${count} items`}
            className="relative ml-2 grid size-10 place-items-center rounded-full border border-border transition-all hover:border-primary hover:shadow-glow"
          >
            <ShoppingBag className="size-4" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-plasma px-1 font-mono text-[10px] font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
