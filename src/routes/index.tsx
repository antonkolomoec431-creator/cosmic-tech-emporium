import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Orbit, ShieldCheck, Sparkles } from "lucide-react";

import heroImage from "@/assets/hero-artifact.jpg";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Xenovault — Premium Alien Technology & Extraterrestrial Devices" },
      {
        name: "description",
        content:
          "Shop authenticated alien gadgets: gravity manipulators, neural interfaces, cloaking orbs and energy crystals.",
      },
      { property: "og:title", content: "Xenovault — Premium Alien Technology" },
      {
        property: "og:description",
        content: "Authenticated extraterrestrial gadgets and devices, shipped to Earth.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const pillars = [
  {
    icon: ShieldCheck,
    title: "Certified off-world",
    body: "Every artifact is spectrally verified and ships with a certificate of origin.",
  },
  {
    icon: Orbit,
    title: "Free interstellar shipping",
    body: "Delivered in a shielded containment case, anywhere on this planet.",
  },
  {
    icon: Sparkles,
    title: "Restored to spec",
    body: "Recalibrated by our xeno-engineers so it works on Earth's gravity and voltage.",
  },
];

function Index() {
  const featured = products.filter((p) => p.featured);

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImage}
          alt="A levitating obsidian alien artifact glowing with violet energy"
          width={1920}
          height={1088}
          className="absolute inset-0 -z-20 size-full object-cover opacity-70"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/30 via-background/60 to-background" />
        <div className="absolute inset-0 -z-10 grid-lines opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

        <div className="mx-auto flex min-h-[86vh] max-w-7xl flex-col justify-end px-6 pb-20 pt-32">
          <p className="label-mono text-primary-glow animate-in fade-in slide-in-from-bottom-2 duration-700">
            ◇ Signal received · Catalogue 2026
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.02] sm:text-7xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Technology <span className="text-plasma">not of this world.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground animate-in fade-in duration-1000">
            Recovered, restored and certified extraterrestrial devices — curated for collectors,
            engineers and the curious.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button variant="plasma" size="xl" asChild>
              <Link to="/shop">
                Explore the vault <ArrowRight />
              </Link>
            </Button>
            <Button variant="hull" size="xl" asChild>
              <Link to="/products/$slug" params={{ slug: "phase-cloak-orb" }}>
                Featured: Phase Cloak Orb
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pt-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label-mono text-primary-glow">Featured artifacts</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Fresh from the crash site</h2>
          </div>
          <Link
            to="/shop"
            className="label-mono inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            View all {products.length} <ArrowRight className="size-3.5" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pt-28">
        <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3">
          {pillars.map(({ icon: Icon, title, body }) => (
            <div key={title} className="bg-background p-8">
              <Icon className="size-6 text-primary-glow" />
              <h3 className="mt-6 text-lg font-medium">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pt-28">
        <div className="relative overflow-hidden rounded-2xl border border-primary/40 bg-card-gradient p-10 shadow-glow sm:p-16">
          <div className="absolute -right-24 -top-24 size-72 rounded-full bg-plasma opacity-30 blur-3xl animate-pulse-glow" />
          <p className="label-mono text-primary-glow">Limited recovery</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold sm:text-5xl">
            Only a handful survive re-entry.
          </h2>
          <p className="mt-4 max-w-lg text-muted-foreground">
            Each device in the vault is one of a kind. When it's gone, it's gone — until the next
            signal.
          </p>
          <Button variant="plasma" size="xl" className="mt-8" asChild>
            <Link to="/shop">
              Browse the full catalogue <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
