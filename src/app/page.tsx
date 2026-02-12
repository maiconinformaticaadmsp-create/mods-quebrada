import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { categories, products } from "@/lib/products";

export default function Home() {
  return (
    <div className="bg-grid">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 pb-24">
        <section className="relative overflow-hidden rounded-[48px] border border-white/10 bg-white/5 px-8 py-16 shadow-[0_0_60px_rgba(0,0,0,0.45)] md:px-14">
          <div className="absolute right-10 top-10 hidden h-40 w-40 rounded-full bg-brand/20 blur-3xl md:block" />
          <div className="absolute bottom-10 left-10 hidden h-32 w-32 rounded-full bg-cyan-400/20 blur-3xl md:block" />
          <div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-white/60">
                Mods gráficos premium
              </p>
              <h1 className="mt-6 text-5xl font-semibold leading-[1.05] text-white md:text-6xl">
                Visual de cinema para <span className="text-gradient">GTA V</span>, FiveM
                e MTA.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-white/70">
                Escolha o mod, pague via PIX e receba o link no WhatsApp. Tudo
                rápido, seguro e com suporte direto.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/catalogo"
                  className="rounded-full bg-brand px-6 py-3 text-xs uppercase tracking-[0.35em] text-black transition hover:brightness-110"
                >
                  Ver catálogo
                </Link>
                <Link
                  href="/checkout"
                  className="rounded-full border border-white/20 px-6 py-3 text-xs uppercase tracking-[0.35em] text-white/80 transition hover:border-white/60 hover:text-white"
                >
                  Finalizar compra
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap gap-6 text-sm text-white/60">
                <span>Entrega via WhatsApp</span>
                <span>Suporte direto</span>
                <span>PIX e cartão</span>
              </div>
            </div>
            <div className="space-y-6">
              <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                  Em destaque
                </p>
                <p className="mt-3 text-3xl font-semibold text-white">
                  Packs exclusivos para roleplay
                </p>
                <p className="mt-4 text-sm text-white/60">
                  Configurações prontas para servidores RP com estabilidade e visual
                  cinematográfico.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                  Atendimento
                </p>
                <p className="mt-3 text-xl font-semibold text-white">
                  Suporte rápido no WhatsApp
                </p>
                <p className="mt-4 text-sm text-white/60">
                  Assim que o pagamento confirma, enviamos link e instruções.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-6 md:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.name}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                {category.name}
              </p>
              <p className="mt-3 text-lg font-semibold text-white">
                {category.description}
              </p>
              <Link
                href="/catalogo"
                className="mt-6 inline-flex text-xs uppercase tracking-[0.3em] text-brand"
              >
                Ver mods
              </Link>
            </div>
          ))}
        </section>

        <section className="mt-20">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold text-white">Destaques</h2>
            <Link
              href="/catalogo"
              className="text-xs uppercase tracking-[0.3em] text-white/60"
            >
              Ver tudo
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {products.slice(0, 3).map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>

        <section className="mt-20 grid gap-6 rounded-[40px] border border-white/10 bg-white/5 p-10 md:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/50">
              Como funciona
            </p>
            <h3 className="mt-4 text-3xl font-semibold text-white">
              Compra rápida em 3 passos
            </h3>
          </div>
          <div className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-brand">1</p>
              <p className="mt-2 text-lg text-white">Escolha o mod ideal</p>
              <p className="mt-2 text-sm text-white/60">
                Compare estilos e escolha o visual que combina com seu servidor.
              </p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-brand">2</p>
              <p className="mt-2 text-lg text-white">Pague com PIX</p>
              <p className="mt-2 text-sm text-white/60">
                Aceitamos PIX e cartão com confirmação rápida.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-brand">3</p>
              <p className="mt-2 text-lg text-white">Receba no WhatsApp</p>
              <p className="mt-2 text-sm text-white/60">
                Enviamos o link e instruções assim que o pagamento confirma.
              </p>
            </div>
            <div>
              <Link
                href="/catalogo"
                className="inline-flex rounded-full bg-brand px-6 py-3 text-xs uppercase tracking-[0.35em] text-black"
              >
                Quero comprar
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

