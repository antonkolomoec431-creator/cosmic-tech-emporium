import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Minus, Plus, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { MAX_QUANTITY } from "@/lib/cart-math";
import { formatPrice, getProduct } from "@/lib/products";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Xenovault" },
      { name: "description", content: "Review the alien devices in your cart before checkout." },
      { property: "og:title", content: "Your Cart — Xenovault" },
      { property: "og:description", content: "Review your extraterrestrial devices." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { lines, subtotal, count, setQuantity, remove } = useCart();

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-6 py-32 text-center">
        <div className="mx-auto grid size-20 place-items-center rounded-full border border-primary/50 shadow-glow">
          <span className="size-3 rounded-full bg-plasma animate-pulse-glow" />
        </div>
        <h1 className="mt-8 text-3xl font-semibold">Your cart is empty</h1>
        <p className="mt-3 text-muted-foreground">No signals detected. Explore the vault to begin.</p>
        <Button variant="plasma" size="xl" className="mt-8" asChild>
          <Link to="/shop">
            Explore artifacts <ArrowRight />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 pt-16">
      <p className="label-mono text-primary-glow">Cargo manifest</p>
      <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">Your cart</h1>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_380px]">
        <ul className="divide-y divide-border rounded-xl border border-border">
          {lines.map((line) => {
            const product = getProduct(line.slug);
            if (!product) return null;
            return (
              <li key={line.slug} className="flex gap-5 p-5">
                <Link to="/products/$slug" params={{ slug: product.slug }} className="shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    width={1024}
                    height={1024}
                    loading="lazy"
                    className="size-24 rounded-lg border border-border object-cover sm:size-28"
                  />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="label-mono text-primary-glow">{product.origin}</p>
                      <Link to="/products/$slug" params={{ slug: product.slug }}>
                        <h2 className="mt-1 truncate text-lg font-medium">{product.name}</h2>
                      </Link>
                      <p className="truncate text-sm text-muted-foreground">{product.tagline}</p>
                    </div>
                    <button
                      type="button"
                      aria-label={`Remove ${product.name}`}
                      onClick={() => remove(product.slug)}
                      className="grid size-8 shrink-0 place-items-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex h-9 items-center rounded-md border border-border">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => setQuantity(product.slug, line.quantity - 1)}
                        className="grid h-full w-9 place-items-center text-muted-foreground hover:text-foreground"
                      >
                        <Minus className="size-3.5" />
                      </button>
                      <span className="w-7 text-center font-mono text-sm">{line.quantity}</span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        disabled={line.quantity >= MAX_QUANTITY}
                        onClick={() => setQuantity(product.slug, line.quantity + 1)}
                        className="grid h-full w-9 place-items-center text-muted-foreground hover:text-foreground disabled:opacity-40"
                      >
                        <Plus className="size-3.5" />
                      </button>
                    </div>
                    <p className="font-mono">{formatPrice(product.price * line.quantity)}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <aside className="h-fit rounded-xl border border-primary/40 bg-card-gradient p-6 shadow-glow lg:sticky lg:top-24">
          <h2 className="text-lg font-medium">Summary</h2>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Items</dt>
              <dd className="font-mono">{count}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="font-mono">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Interstellar shipping</dt>
              <dd className="font-mono text-primary-glow">Free</dd>
            </div>
          </dl>
          <div className="mt-6 flex items-baseline justify-between border-t border-border pt-6">
            <span className="label-mono text-muted-foreground">Total</span>
            <span className="font-mono text-2xl">{formatPrice(subtotal)}</span>
          </div>
          <Button
            variant="plasma"
            size="xl"
            className="mt-6 w-full"
            onClick={() =>
              toast("Checkout is coming soon", {
                description: "Payments aren't connected yet — your cart is saved.",
              })
            }
          >
            Proceed to checkout <ArrowRight />
          </Button>
          <Link
            to="/shop"
            className="label-mono mt-4 block text-center text-muted-foreground hover:text-foreground"
          >
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
