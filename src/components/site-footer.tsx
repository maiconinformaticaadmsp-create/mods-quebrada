export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/70">
      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 text-sm text-white/70 md:grid-cols-3">
        <div>
          <h3 className="text-base uppercase tracking-[0.3em] text-white">
            Mods da Quebrada
          </h3>
          <p className="mt-3 text-white/60">
            Loja especializada em mods gráficos premium para GTA V, FiveM e MTA.
          </p>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.3em] text-white/80">
            Atendimento
          </h4>
          <p className="mt-3">WhatsApp: (11) 95490-1966</p>
          <p className="mt-2">Seg a Sex: 10h às 20h</p>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.3em] text-white/80">
            Pagamentos
          </h4>
          <p className="mt-3">Pagamento via PIX</p>
          <p className="mt-2">Entrega via WhatsApp após confirmação.</p>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-4 text-center text-xs text-white/40">
        © 2026 Mods da Quebrada. Todos os direitos reservados.
      </div>
    </footer>
  );
}

