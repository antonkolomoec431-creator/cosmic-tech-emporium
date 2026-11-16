import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { ProductCard } from "@/components/product-card";
import { categories, products, type Category } from "@/lib/products";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop Alien Gadgets & Devices — Xenovault" },
      {
        name: "description",
        content:
          "Browse every extraterrestrial device in the vault: devices, wearables, energy cores and tools.",
      },
      { property: "og:title", content: "Shop Alien Gadgets — Xenovault" },
      {
        property: "og:description",
        content: "Every extraterrestrial device in the vault, with prices and specs.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Shop,
});

function Shop() {
  const [active, setActive] = useState<Category | "All">("All");
  const list = active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <div className="mx-auto max-w-7xl px-6 pt-16">
      <p className="label-mono text-primary-glow">The vault</p>
      <h1 className="mt-3 text-4xl font-semibold sm:text-6xl">All artifacts</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        {products.length} certified extraterrestrial devices, each restored and ready for Earth.
      </p>

      <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
        {(["All", ...categories] as const).map((c) => (
          <button
            key={c}
            type="button"
            role="tab"
            aria-selected={active === c}
            onClick={() => setActive(c)}
            className={cn(
              "label-mono rounded-full border px-4 py-2 transition-all",
              active === c
                ? "border-primary bg-plasma text-primary-foreground shadow-glow"
                : "border-border text-muted-foreground hover:border-primary/60 hover:text-foreground",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}
