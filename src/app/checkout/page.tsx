import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { formatPrice, getProductBySlug, products } from "@/lib/products";

type CheckoutPageProps = {
  searchParams?: { produto?: string };
};

export default function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const product = getProductBySlug(searchParams?.produto);

  return (
    <div className="bg-grid">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-6 pb-24 pt-12">
        <div className="rounded-[36px] border border-white/10 bg-white/5 px-8 py-10">
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">
            Checkout
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-white">
            Finalize sua compra com PIX
          </h1>
          <p className="mt-3 text-white/60">
            Informe seu WhatsApp para receber o mod após a confirmação do pagamento.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-[32px] border border-white/10 bg-black/60 p-8">
            <h2 className="text-2xl font-semibold text-white">Seus dados</h2>
            <form className="mt-6 space-y-5">
              <label className="block text-sm text-white/70">
                WhatsApp
                <input
                  type="tel"
                  placeholder="(11) 90000-0000"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/40 focus:border-brand focus:outline-none"
                />
              </label>
              <label className="block text-sm text-white/70">
                Observações (opcional)
                <textarea
                  placeholder="Ex: servidor, configuração desejada..."
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/40 focus:border-brand focus:outline-none"
                  rows={4}
                />
              </label>
              <button
                type="button"
                className="w-full rounded-full bg-brand px-6 py-3 text-xs uppercase tracking-[0.35em] text-black"
              >
                Pagar com PIX
              </button>
              <p className="text-xs text-white/50">
                Integração com PIX será ativada após configurarmos a API.
              </p>
            </form>
          </section>

          <aside className="space-y-6">
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold text-white">Resumo do pedido</h3>
              {product ? (
                <div className="mt-4 space-y-3 text-sm text-white/70">
                  <p>{product.name}</p>
                  <p className="text-white">{formatPrice(product.price)}</p>
                  <p className="text-xs text-white/50">{product.category}</p>
                </div>
              ) : (
                <div className="mt-4 space-y-3 text-sm text-white/70">
                  <p>Nenhum produto selecionado.</p>
                  <Link
                    href="/catalogo"
                    className="text-xs uppercase tracking-[0.3em] text-brand"
                  >
                    Escolher mod
                  </Link>
                </div>
              )}
              <div className="mt-6 rounded-2xl border border-white/10 bg-black/60 p-4 text-xs text-white/60">
                Entrega via WhatsApp após confirmação do pagamento.
              </div>
            </div>
            <div className="rounded-[32px] border border-white/10 bg-black/60 p-6">
              <h4 className="text-xs uppercase tracking-[0.3em] text-white/50">
                Outros mods
              </h4>
              <div className="mt-4 space-y-4">
                {products.slice(0, 3).map((item) => (
                  <Link
                    key={item.slug}
                    href={`/checkout?produto=${item.slug}`}
                    className="flex items-center justify-between text-sm text-white/70"
                  >
                    <span>{item.name}</span>
                    <span className="text-white/50">{formatPrice(item.price)}</span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}


