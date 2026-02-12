"use client";

import { useEffect, useState } from "react";
import { addToCart, getCart } from "@/lib/cart";

export function AddToCartButton({ slug }: { slug: string }) {
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    const current = getCart();
    setInCart(current.some((item) => item.slug === slug));
  }, [slug]);

  return (
    <button
      type="button"
      onClick={() => {
        const next = addToCart(slug);
        setInCart(next.some((item) => item.slug === slug));
      }}
      disabled={inCart}
      className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-white/20 px-6 py-3 text-xs uppercase tracking-[0.3em] text-white/80 transition hover:border-white/60 disabled:opacity-60"
    >
      {inCart ? "No carrinho" : "Adicionar ao carrinho"}
    </button>
  );
}
