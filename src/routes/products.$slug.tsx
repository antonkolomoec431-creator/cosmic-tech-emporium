import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Minus, Plus, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { MAX_QUANTITY } from "@/lib/cart-math";
import { formatPrice, getProduct, products } from "@/lib/products";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const product = loaderData?.product;
    if (!product) {
      return { meta: [{ title: "Artifact not found — Xenovault" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${product.name} — ${product.tagline} | Xenovault`;
    return {
      meta: [
        { title },
        { name: "description", content: product.description },
        { property: "og:title", content: title },
        { property: "og:description", content: product.description },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-6 py-32 text-center">
      <h1 className="text-3xl font-semibold">Artifact not found</h1>
      <p className="mt-3 text-muted-foreground">This device may have drifted back into deep space.</p>
      <Button variant="plasma" className="mt-8" asChild>
        <Link to="/shop">Back to the vault</Link>
      </Button>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-6 pt-10">
      <Link
        to="/shop"
        className="label-mono inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" /> All artifacts
      </Link>

      <div className="mt-8 grid gap-12 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-2xl border border-border shadow-glow">
          <img
            src={product.image}
            alt={product.name}
            width={1024}
            height={1024}
            className="aspect-square size-full object-cover"
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-primary/10 to-transparent animate-scan" />
        </div>

        <div className="flex flex-col">
          <p className="label-mono text-primary-glow">
            {product.category} · Origin: {product.origin}
          </p>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">{product.name}</h1>
          <p className="mt-2 text-lg text-muted-foreground">{product.tagline}</p>
          <p className="mt-8 font-mono text-3xl">{formatPrice(product.price)}</p>
          <p className="mt-8 leading-relaxed text-muted-foreground">{product.description}</p>

          <dl className="mt-10 divide-y divide-border rounded-xl border border-border bg-card-gradient">
            {product.specs.map((s) => (
              <div key={s.label} className="flex items-center justify-between px-5 py-4">
                <dt className="label-mono text-muted-foreground">{s.label}</dt>
                <dd className="font-mono text-sm">{s.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <div className="flex h-12 items-center rounded-md border border-border">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid h-full w-11 place-items-center text-muted-foreground hover:text-foreground"
              >
                <Minus className="size-4" />
              </button>
              <span className="w-8 text-center font-mono" aria-live="polite">
                {qty}
              </span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQty((q) => Math.min(MAX_QUANTITY, q + 1))}
                className="grid h-full w-11 place-items-center text-muted-foreground hover:text-foreground"
              >
                <Plus className="size-4" />
              </button>
            </div>
            <Button
              variant="plasma"
              size="xl"
              className="flex-1"
              onClick={() => {
                add(product.slug, qty);
                toast.success(`${qty} × ${product.name} added to cart`);
              }}
            >
              Add to cart · {formatPrice(product.price * qty)}
            </Button>
          </div>
          <p className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="size-4 text-primary-glow" /> Certificate of off-world origin
            included · Free interstellar shipping
          </p>
        </div>
      </div>

      <section className="pt-28">
        <h2 className="text-2xl font-semibold">You may also detect</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
