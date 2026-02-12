import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { formatPrice, products } from "@/lib/products";

export default function AdminPage() {
  return (
    <div className="bg-grid">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-12">
        <div className="rounded-[36px] border border-white/10 bg-white/5 px-8 py-10">
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">
            Admin
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-white">
            Painel de produtos
          </h1>
          <p className="mt-3 text-white/60">
            Esta é uma visualização inicial. O painel real será conectado ao banco de
            dados depois.
          </p>
        </div>

        <section className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-[28px] border border-white/10 bg-black/60 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">
              Produtos ativos
            </p>
            <p className="mt-4 text-3xl font-semibold text-white">
              {products.length}
            </p>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-black/60 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">
              Pagamentos
            </p>
            <p className="mt-4 text-3xl font-semibold text-white">PIX</p>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-black/60 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">
              Entrega
            </p>
            <p className="mt-4 text-3xl font-semibold text-white">WhatsApp</p>
          </div>
        </section>

        <section className="mt-12 rounded-[32px] border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">Catálogo</h2>
            <button className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/70">
              Novo mod
            </button>
          </div>
          <div className="mt-6 overflow-hidden rounded-3xl border border-white/10">
            <table className="w-full text-left text-sm text-white/70">
              <thead className="bg-black/60 text-xs uppercase tracking-[0.3em] text-white/50">
                <tr>
                  <th className="px-4 py-3">Produto</th>
                  <th className="px-4 py-3">Categoria</th>
                  <th className="px-4 py-3">Preço</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.slug} className="border-t border-white/10">
                    <td className="px-4 py-4 text-white">{product.name}</td>
                    <td className="px-4 py-4">{product.category}</td>
                    <td className="px-4 py-4">{formatPrice(product.price)}</td>
                    <td className="px-4 py-4">
                      <span className="rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs text-brand">
                        Ativo
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}


