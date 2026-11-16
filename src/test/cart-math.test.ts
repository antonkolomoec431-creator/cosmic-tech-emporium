import { describe, expect, it } from "vitest";

import { addLine, cartCount, cartSubtotal, setLineQuantity } from "@/lib/cart-math";

describe("cart math", () => {
  it("adding the same product twice increases quantity instead of duplicating", () => {
    const lines = addLine(addLine([], "graviton-lift"), "graviton-lift");
    expect(lines).toEqual([{ slug: "graviton-lift", quantity: 2 }]);
  });

  it("setting quantity to zero removes the product", () => {
    const lines = setLineQuantity([{ slug: "lingua-coil", quantity: 3 }], "lingua-coil", 0);
    expect(lines).toEqual([]);
  });

  it("subtotal multiplies price by quantity", () => {
    const prices: Record<string, number> = { a: 1890, b: 4890 };
    const lines = [
      { slug: "a", quantity: 2 },
      { slug: "b", quantity: 1 },
    ];
    expect(cartSubtotal(lines, (s) => prices[s] ?? 0)).toBe(8670);
    expect(cartCount(lines)).toBe(3);
  });
});
