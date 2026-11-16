import gravity from "@/assets/product-gravity.jpg";
import crystal from "@/assets/product-crystal.jpg";
import neural from "@/assets/product-neural.jpg";
import cloak from "@/assets/product-cloak.jpg";
import starmap from "@/assets/product-starmap.jpg";
import translator from "@/assets/product-translator.jpg";
import plasma from "@/assets/product-plasma.jpg";

export type Category = "Devices" | "Wearables" | "Energy" | "Tools";

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  category: Category;
  origin: string;
  image: string;
  specs: { label: string; value: string }[];
  featured?: boolean;
}

export const products: Product[] = [
  {
    slug: "graviton-lift",
    name: "Graviton Lift",
    tagline: "Handheld gravity manipulator",
    description:
      "Recovered from a Zeta Reticuli survey craft, the Graviton Lift bends local gravity in a two-metre field. Levitate cargo, soften landings, or simply let your coffee hover.",
    price: 4890,
    category: "Devices",
    origin: "Zeta Reticuli",
    image: gravity,
    specs: [
      { label: "Field radius", value: "2.0 m" },
      { label: "Max load", value: "640 kg" },
      { label: "Power", value: "Zero-point cell" },
    ],
    featured: true,
  },
  {
    slug: "void-crystal-cell",
    name: "Void Crystal Cell",
    tagline: "Self-sustaining energy core",
    description:
      "A lattice-grown violet crystal sealed in a xeno-alloy cage. Harvests vacuum fluctuations to power a household for roughly four hundred years. Hum not included.",
    price: 7250,
    category: "Energy",
    origin: "Arcturus IV",
    image: crystal,
    specs: [
      { label: "Output", value: "12 kW continuous" },
      { label: "Lifespan", value: "~400 years" },
      { label: "Mass", value: "1.8 kg" },
    ],
    featured: true,
  },
  {
    slug: "synapse-halo",
    name: "Synapse Halo",
    tagline: "Neural interface band",
    description:
      "A biomechanical circlet that reads intent before you finish the thought. Control devices, record dreams, and learn languages while you sleep.",
    price: 3420,
    category: "Wearables",
    origin: "Pleiades Cluster",
    image: neural,
    specs: [
      { label: "Latency", value: "0.2 ms" },
      { label: "Nodes", value: "11 synaptic" },
      { label: "Fit", value: "Adaptive, any species" },
    ],
    featured: true,
  },
  {
    slug: "phase-cloak-orb",
    name: "Phase Cloak Orb",
    tagline: "Personal cloaking field",
    description:
      "Activate the hexagonal lattice and fade out of the visible spectrum. Ideal for discreet arrivals, birdwatching, and avoiding small talk.",
    price: 9980,
    category: "Devices",
    origin: "Sirius B",
    image: cloak,
    specs: [
      { label: "Coverage", value: "Full body + 1 m" },
      { label: "Runtime", value: "6 hours" },
      { label: "Spectrum", value: "Visible, IR, UV" },
    ],
  },
  {
    slug: "astral-cartograph",
    name: "Astral Cartograph",
    tagline: "Holographic star map projector",
    description:
      "Projects a living map of 400 billion stars above any surface. Charts wormhole routes and updates in real time from an unknown signal source.",
    price: 2760,
    category: "Devices",
    origin: "Andromeda",
    image: starmap,
    specs: [
      { label: "Stars mapped", value: "4 × 10¹¹" },
      { label: "Projection", value: "3 m sphere" },
      { label: "Updates", value: "Live, subspace" },
    ],
  },
  {
    slug: "lingua-coil",
    name: "Lingua Coil",
    tagline: "Universal translator earpiece",
    description:
      "Slip it on and understand every spoken language in this galaxy and the next. Includes 2,400 alien dialects, whale song, and cat.",
    price: 1890,
    category: "Wearables",
    origin: "Tau Ceti",
    image: translator,
    specs: [
      { label: "Languages", value: "11,000+" },
      { label: "Delay", value: "Real time" },
      { label: "Battery", value: "Bio-kinetic" },
    ],
  },
  {
    slug: "plasma-stylus",
    name: "Plasma Stylus",
    tagline: "Extraterrestrial multi-tool",
    description:
      "A segmented plasma edge that cuts, welds, and engraves at the molecular level. Used by Vegan star-wrights to repair hull fractures mid-flight.",
    price: 3150,
    category: "Tools",
    origin: "Vega",
    image: plasma,
    specs: [
      { label: "Edge temp", value: "11,000 °C" },
      { label: "Modes", value: "Cut · Weld · Etch" },
      { label: "Length", value: "38 cm" },
    ],
  },
];

export const categories: Category[] = ["Devices", "Wearables", "Energy", "Tools"];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}
