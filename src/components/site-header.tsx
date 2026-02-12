import Link from "next/link";

const navItems = [
  { label: "Início", href: "/" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Carrinho", href: "/carrinho" },
  { label: "Admin", href: "/admin" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="text-2xl font-semibold tracking-[0.18em] text-white/80">
            MODS
          </span>
          <span className="text-sm uppercase tracking-[0.4em] text-brand">
            QUEBRADA
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm uppercase tracking-[0.2em] text-white/70 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/catalogo"
            className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white/80 transition hover:border-white/60 hover:text-white"
          >
            Ver Mods
          </Link>
          <a
            href="https://wa.me/5511954901966"
            className="hidden rounded-full bg-brand px-4 py-2 text-xs uppercase tracking-[0.25em] text-black transition hover:brightness-110 md:inline-flex"
            aria-label="Falar no WhatsApp"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
