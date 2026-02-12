import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { formatPrice, getProductBySlug, products } from "@/lib/products";

type ProductPageProps = {
  params: { slug: string };
};

export default function ProdutoPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return (
      <div className="bg-grid">
        <SiteHeader />
        <main className="mx-auto max-w-4xl px-6 py-24 text-center">
          <h1 className="text-3xl font-semibold text-white">Produto não encontrado</h1>
          <p className="mt-4 text-white/60">
            Volte para o catálogo e escolha outro mod.
          </p>
          <Link
            href="/catalogo"
            className="mt-8 inline-flex rounded-full bg-brand px-6 py-3 text-xs uppercase tracking-[0.3em] text-black"
          >
            Ver catálogo
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const related = products.filter(
    (item) => item.category === product.category && item.slug !== product.slug
  );

  return (
    <div className="bg-grid">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-12">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[40px] border border-white/10 bg-white/5 p-8">
            <div className="relative h-72 overflow-hidden rounded-3xl">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </div>
            <div className="mt-8 space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-white/50">
                  {product.category}
                </p>
                <h1 className="mt-4 text-4xl font-semibold text-white">
                  {product.name}
                </h1>
                <p className="mt-3 text-white/60">{product.description}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {product.features.map((feature) => (
                  <div
                    key={feature}
                    className="rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-white/70"
                  >
                    {feature}
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/60 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                  Destaque
                </p>
                <p className="mt-3 text-lg text-white">{product.highlight}</p>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">
              <span className="rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-brand">
                {product.badge}
              </span>
              <p className="mt-6 text-4xl font-semibold text-white">
                {product.customPrice
                  ? "Você escolhe o valor"
                  : formatPrice(product.price)}
              </p>
              <p className="mt-2 text-sm text-white/60">
                Pagamento seguro via PIX.
              </p>
              <div className="mt-6 space-y-3 text-sm text-white/70">
                <p>Entrega: {product.delivery}</p>
                <p>Plataformas: {product.platforms.join(", ")}</p>
              </div>
              <Link
                href={`/checkout?produto=${product.slug}`}
                className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-brand px-6 py-3 text-xs uppercase tracking-[0.3em] text-black"
              >
                Comprar agora
              </Link>
              <AddToCartButton slug={product.slug} />
              <p className="mt-4 text-xs text-white/50">
                Após o pagamento, enviamos instruções completas via WhatsApp.
              </p>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-black/60 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                Precisa de ajuda?
              </p>
              <p className="mt-4 text-lg text-white">
                Atendimento rápido no WhatsApp.
              </p>
              <a
                href="https://wa.me/5511954901966"
                className="mt-6 inline-flex rounded-full border border-white/20 px-5 py-3 text-xs uppercase tracking-[0.3em] text-white/80"
              >
                Falar agora
              </a>
            </div>
          </aside>
        </div>

        {related.length > 0 ? (
          <section className="mt-16">
            <h2 className="text-2xl font-semibold text-white">Outros mods</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/produto/${item.slug}`}
                  className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/50">
                    <span>{item.category}</span>
                    <span>{item.badge}</span>
                  </div>
                  <p className="mt-4 text-lg font-semibold text-white">
                    {item.name}
                  </p>
                  <p className="mt-2 text-sm text-white/60">{item.short}</p>
                  <p className="mt-4 text-sm text-brand">
                    {formatPrice(item.price)}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </main>
      <SiteFooter />
    </div>
  );
}

