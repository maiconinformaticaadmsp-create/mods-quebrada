"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { cartToProducts, clearCart, getCart, removeFromCart } from "@/lib/cart";
import { formatPrice, products } from "@/lib/products";

export function CartClient() {
  const [cart, setCart] = useState(getCart());

  useEffect(() => {
    setCart(getCart());
  }, []);

  const items = useMemo(() => cartToProducts(cart, products), [cart]);
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="bg-grid">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-6 pb-24 pt-12">
        <div className="rounded-[36px] border border-white/10 bg-white/5 px-8 py-10">
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">
            Carrinho
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-white">
            Seus itens
          </h1>
          <p className="mt-3 text-white/60">
            Máximo de 1 unidade por item.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-[32px] border border-white/10 bg-black/60 p-6">
            {items.length === 0 ? (
              <div className="space-y-4 text-white/70">
                <p>Seu carrinho está vazio.</p>
                <Link
                  href="/catalogo"
                  className="text-xs uppercase tracking-[0.3em] text-brand"
                >
                  Ver catálogo
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.slug}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <div>
                      <p className="text-white">{item.name}</p>
                      <p className="text-xs text-white/50">{item.category}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-white">
                        {item.customPrice ? "Valor a definir" : formatPrice(item.price)}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const next = removeFromCart(item.slug);
                          setCart(next);
                        }}
                        className="text-xs uppercase tracking-[0.3em] text-red-300"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <aside className="space-y-6">
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold text-white">Resumo</h3>
              <div className="mt-4 flex items-center justify-between text-sm text-white/70">
                <span>Total</span>
                <span className="text-white">{formatPrice(total)}</span>
              </div>
              <div className="mt-6 space-y-3">
                <Link
                  href="/checkout?carrinho=1"
                  className={`block w-full rounded-full px-4 py-3 text-center text-xs uppercase tracking-[0.3em] ${
                    items.length === 0
                      ? "bg-white/10 text-white/40"
                      : "bg-brand text-black"
                  }`}
                >
                  Ir para pagamento
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    clearCart();
                    setCart([]);
                  }}
                  disabled={items.length === 0}
                  className="w-full rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/80 disabled:opacity-50"
                >
                  Limpar carrinho
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
