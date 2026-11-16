import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { useCart } from "@/lib/cart";
import { formatPrice, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <article className="group relative overflow-hidden rounded-xl border border-border bg-card-gradient transition-all duration-500 hover:-translate-y-1 hover:border-primary/70 hover:shadow-glow">
      <Link to="/products/$slug" params={{ slug: product.slug }} className="block">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={1024}
            height={1024}
            className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="label-mono absolute left-4 top-4 rounded-full border border-border bg-background/70 px-3 py-1 text-muted-foreground backdrop-blur">
            {product.category}
          </span>
        </div>
      </Link>
      <div className="flex items-end justify-between gap-4 p-5">
        <div className="min-w-0">
          <p className="label-mono text-primary-glow">{product.origin}</p>
          <Link to="/products/$slug" params={{ slug: product.slug }}>
            <h3 className="mt-2 truncate text-lg font-medium">{product.name}</h3>
          </Link>
          <p className="mt-1 truncate text-sm text-muted-foreground">{product.tagline}</p>
          <p className="mt-3 font-mono text-base">{formatPrice(product.price)}</p>
        </div>
        <button
          type="button"
          aria-label={`Add ${product.name} to cart`}
          onClick={() => {
            add(product.slug);
            toast.success(`${product.name} added to cart`);
          }}
          className="grid size-11 shrink-0 place-items-center rounded-full border border-primary/50 text-foreground transition-all hover:bg-plasma hover:text-primary-foreground hover:shadow-glow"
        >
          <Plus className="size-4" />
        </button>
      </div>
    </article>
  );
}
