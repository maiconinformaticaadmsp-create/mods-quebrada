"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/products";
import { addToCart, getCart } from "@/lib/cart";

export function ProductCard({ product }: { product: Product }) {
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    const current = getCart();
    setInCart(current.some((item) => item.slug === product.slug));
  }, [product.slug]);

  return (
    <div className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_0_40px_rgba(0,0,0,0.35)] transition hover:-translate-y-1 hover:border-white/30">
      <div className="relative h-44 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>
      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between">
          <span className="rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-brand">
            {product.badge}
          </span>
          <span className="text-xs uppercase tracking-[0.2em] text-white/50">
            {product.category}
          </span>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">{product.name}</h3>
          <p className="mt-2 text-sm text-white/60">{product.short}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-white">
            {product.customPrice ? "Você escolhe" : formatPrice(product.price)}
          </span>
          <Link
            href={`/produto/${product.slug}`}
            className="text-xs uppercase tracking-[0.3em] text-white/70 transition group-hover:text-white"
          >
            Ver detalhes
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/checkout?produto=${product.slug}`}
            className="flex-1 rounded-full bg-brand px-4 py-2 text-center text-xs uppercase tracking-[0.3em] text-black"
          >
            Comprar
          </Link>
          <button
            type="button"
            onClick={() => {
              const next = addToCart(product.slug);
              setInCart(next.some((item) => item.slug === product.slug));
            }}
            disabled={inCart}
            className="flex-1 rounded-full border border-white/20 px-4 py-2 text-center text-xs uppercase tracking-[0.3em] text-white/80 transition hover:border-white/60 disabled:opacity-60"
          >
            {inCart ? "No carrinho" : "Adicionar"}
          </button>
        </div>
      </div>
    </div>
  );
}
