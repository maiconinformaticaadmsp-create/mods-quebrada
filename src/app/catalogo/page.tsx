import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { categories, products } from "@/lib/products";

export default function CatalogoPage() {
  const visibleCategories = categories.filter((category) =>
    products.some((product) => product.category === category.name)
  );

  return (
    <div className="bg-grid">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-10">
        <div className="rounded-[36px] border border-white/10 bg-white/5 px-8 py-12">
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">
            Catálogo
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-white">
            Mods gráficos prontos para seu estilo.
          </h1>
          <p className="mt-4 max-w-2xl text-white/60">
            Escolha seu game, compare pacotes e finalize o pagamento via PIX.
          </p>
        </div>

        {visibleCategories.map((category) => {
          const items = products.filter((product) => product.category === category.name);
          return (
            <section key={category.name} className="mt-16">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-white/50">
                    {category.name}
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">
                    {category.description}
                  </h2>
                </div>
                <span className="text-xs uppercase tracking-[0.3em] text-white/50">
                  {items.length} mods
                </span>
              </div>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {items.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            </section>
          );
        })}
      </main>
      <SiteFooter />
    </div>
  );
}

