"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { formatPrice, products } from "@/lib/products";

type PixResponse = {
  success: boolean;
  data?: {
    id: string;
    status: string;
    amount: number;
    pixQrCode: string;
    pixQrCodeImage: string;
  };
  error?: { message?: string } | string;
};

export function CheckoutClient() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("produto") || undefined;
  const product = useMemo(
    () => products.find((item) => item.slug === slug),
    [slug]
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [pix, setPix] = useState<PixResponse["data"] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);

  const priceInCents = product ? Math.round(product.price * 100) : 0;

  const handleCopy = async () => {
    if (!pix?.pixQrCode) return;
    await navigator.clipboard.writeText(pix.pixQrCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!product) {
      setError("Selecione um produto antes de continuar.");
      return;
    }

    setLoading(true);
    setPix(null);

    const cpfDigits = cpf.replace(/\D/g, "");
    const phoneDigits = phone.replace(/\D/g, "");

    if (cpfDigits.length !== 11) {
      setError("CPF inválido. Informe 11 dígitos.");
      setLoading(false);
      return;
    }

    if (phoneDigits.length < 10 || phoneDigits.length > 11) {
      setError("WhatsApp inválido. Use DDD + número (10 ou 11 dígitos).");
      setLoading(false);
      return;
    }

    const payload = {
      paymentMethod: "pix",
      amount: priceInCents,
      customer: {
        document: { type: "cpf", number: cpfDigits },
        name,
        email,
        phone: phoneDigits,
      },
      items: [
        {
          title: product.name,
          unitPrice: priceInCents,
          quantity: 1,
          tangible: false,
        },
      ],
    };

    try {
      const response = await fetch("/api/pix/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as PixResponse;

      if (!response.ok || !data.success || !data.data) {
        throw new Error(
          typeof data.error === "string"
            ? data.error
            : data.error?.message || "Erro ao gerar PIX"
        );
      }

      setPix(data.data);
      setImgError(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao gerar PIX");
    } finally {
      setLoading(false);
    }
  };

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
            Preencha seus dados para gerar o QR Code e o copia e cola.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-[32px] border border-white/10 bg-black/60 p-8">
            <h2 className="text-2xl font-semibold text-white">Seus dados</h2>
            <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
              <label className="block text-sm text-white/70">
                Nome completo
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/40 focus:border-brand focus:outline-none"
                />
              </label>
              <label className="block text-sm text-white/70">
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/40 focus:border-brand focus:outline-none"
                />
              </label>
              <label className="block text-sm text-white/70">
                CPF
                <input
                  type="text"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  required
                  placeholder="Somente números"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/40 focus:border-brand focus:outline-none"
                />
              </label>
              <label className="block text-sm text-white/70">
                WhatsApp
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  placeholder="(11) 90000-0000"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/40 focus:border-brand focus:outline-none"
                />
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-brand px-6 py-3 text-xs uppercase tracking-[0.35em] text-black disabled:opacity-60"
              >
                {loading ? "Gerando PIX..." : "Gerar PIX"}
              </button>

              {error && (
                <p className="rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200">
                  {error}
                </p>
              )}
            </form>

            {pix && (
              <div className="mt-8 space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="text-sm text-white/60">Pagamento PIX</div>
                <div className="relative mx-auto h-56 w-56 overflow-hidden rounded-2xl bg-black/40">
                  {(() => {
                    const raw = pix.pixQrCodeImage || "";
                    const trimmed = raw.trim();
                    const cleaned = trimmed.replace(/\s/g, "");
                    const fallback =
                      pix.pixQrCode && pix.pixQrCode.length > 0
                        ? `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(
                            pix.pixQrCode
                          )}`
                        : "";

                    if (!trimmed) {
                      return fallback ? (
                        <img
                          src={fallback}
                          alt="QR Code PIX"
                          className="h-full w-full object-contain"
                        />
                      ) : null;
                    }

                    if (trimmed.startsWith("data:") || trimmed.startsWith("http")) {
                      return (
                        <img
                          src={trimmed}
                          alt="QR Code PIX"
                          className="h-full w-full object-contain"
                          onError={() => setImgError(true)}
                        />
                      );
                    }

                    if (trimmed.startsWith("<svg")) {
                      const svgSrc = `data:image/svg+xml;utf8,${encodeURIComponent(
                        trimmed
                      )}`;
                      return (
                        <img
                          src={svgSrc}
                          alt="QR Code PIX"
                          className="h-full w-full object-contain"
                          onError={() => setImgError(true)}
                        />
                      );
                    }

                    const isSvgBase64 = cleaned.startsWith("PHN2Zy");
                    const src = isSvgBase64
                      ? `data:image/svg+xml;base64,${cleaned}`
                      : `data:image/png;base64,${cleaned}`;

                    return (
                      // Usar img normal para evitar bloqueio do next/image
                      <img
                        src={src}
                        alt="QR Code PIX"
                        className="h-full w-full object-contain"
                        onError={() => setImgError(true)}
                      />
                    );
                  })()}
                </div>
                {imgError && pix.pixQrCode && (
                  <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-3 text-xs text-yellow-100">
                    QR original não carregou. Mostrando QR alternativo.
                  </div>
                )}
                {imgError && pix.pixQrCode && (
                  <div className="relative mx-auto h-56 w-56 overflow-hidden rounded-2xl bg-black/40">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(
                        pix.pixQrCode
                      )}`}
                      alt="QR Code PIX"
                      className="h-full w-full object-contain"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      const raw = pix.pixQrCodeImage || "";
                      const trimmed = raw.trim();
                      const cleaned = trimmed.replace(/\s/g, "");
                      let src = trimmed;
                      if (
                        !trimmed.startsWith("data:") &&
                        !trimmed.startsWith("http")
                      ) {
                        if (trimmed.startsWith("<svg")) {
                          src = `data:image/svg+xml;utf8,${encodeURIComponent(
                            trimmed
                          )}`;
                        } else if (cleaned.startsWith("PHN2Zy")) {
                          src = `data:image/svg+xml;base64,${cleaned}`;
                        } else {
                          src = `data:image/png;base64,${cleaned}`;
                        }
                      }
                      if (!src && pix.pixQrCode) {
                        src = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(
                          pix.pixQrCode
                        )}`;
                      }
                      window.open(src, "_blank");
                    }}
                    className="w-full rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/80"
                  >
                    Abrir QR em nova aba
                  </button>
                  {imgError && (
                    <p className="text-xs text-red-300">
                      Não foi possível carregar o QR Code. Use “Abrir QR em nova
                      aba”.
                    </p>
                  )}
                </div>
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                    Copia e cola
                  </p>
                  <textarea
                    readOnly
                    value={pix.pixQrCode}
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-xs text-white/70"
                    rows={4}
                  />
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="w-full rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/80"
                  >
                    {copied ? "Copiado!" : "Copiar código"}
                  </button>
                </div>
              </div>
            )}
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
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
