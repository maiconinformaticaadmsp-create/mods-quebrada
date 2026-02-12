import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "crypto";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { formatPrice, products } from "@/lib/products";

type PaymentRow = {
  id: string;
  tx_id: string;
  status: string | null;
  amount: number | null;
  customer_name: string | null;
  customer_email: string | null;
  customer_phone: string | null;
  created_at: string;
};

async function getPayments(statusFilter?: string): Promise<PaymentRow[]> {
  const SUPABASE_URL = process.env.SUPABASE_URL || "";
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) return [];

  const params = new URLSearchParams({
    select: "*",
    order: "created_at.desc",
    limit: "50",
  });

  if (statusFilter && statusFilter !== "all") {
    params.set("status", `eq.${statusFilter}`);
  }

  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/payments?${params.toString()}`,
    {
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) return [];
  return response.json();
}

async function getMonthlyTotal(): Promise<number> {
  const SUPABASE_URL = process.env.SUPABASE_URL || "";
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) return 0;

  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  const params = new URLSearchParams({
    select: "amount",
    created_at: `gte.${start.toISOString()}`,
  });
  params.append("created_at", `lt.${end.toISOString()}`);

  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/payments?${params.toString()}`,
    {
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) return 0;
  const rows = (await response.json()) as { amount: number | null }[];
  return rows.reduce((sum, row) => sum + (row.amount || 0), 0);
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams?: { status?: string };
}) {
  const ADMIN_USER = process.env.ADMIN_USER || "";
  const ADMIN_PASS = process.env.ADMIN_PASS || "";
  const expected = crypto
    .createHash("sha256")
    .update(`${ADMIN_USER}:${ADMIN_PASS}`)
    .digest("hex");
  const cookieStore = await cookies();
  const auth = cookieStore.get("admin_auth")?.value;

  if (!auth || auth !== expected) {
    redirect("/admin/login");
  }

  const statusFilter = searchParams?.status?.toLowerCase() || "all";
  const payments = await getPayments(statusFilter);
  const monthlyTotal = await getMonthlyTotal();

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
            Pagamentos confirmados aparecerão aqui automaticamente.
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
              Recebido no mês
            </p>
            <p className="mt-4 text-3xl font-semibold text-white">
              {formatPrice(monthlyTotal / 100)}
            </p>
          </div>
        </section>

        <section className="mt-12 rounded-[32px] border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">
              Pagamentos recentes
            </h2>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/60">
              <span>Filtro:</span>
              <div className="flex items-center gap-2">
                {[
                  { label: "Todos", value: "all" },
                  { label: "Pago", value: "paid" },
                  { label: "Pendente", value: "pending" },
                  { label: "Falhou", value: "failed" },
                ].map((item) => (
                  <a
                    key={item.value}
                    href={`/admin?status=${item.value}`}
                    className={`rounded-full border px-3 py-1 text-[10px] ${
                      statusFilter === item.value
                        ? "border-brand/40 bg-brand/10 text-brand"
                        : "border-white/20 text-white/70"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6 overflow-hidden rounded-3xl border border-white/10">
            <table className="w-full text-left text-sm text-white/70">
              <thead className="bg-black/60 text-xs uppercase tracking-[0.3em] text-white/50">
                <tr>
                  <th className="px-4 py-3">Transação</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Valor</th>
                  <th className="px-4 py-3">Cliente</th>
                  <th className="px-4 py-3">WhatsApp</th>
                  <th className="px-4 py-3">Data</th>
                </tr>
              </thead>
              <tbody>
                {payments.length === 0 ? (
                  <tr className="border-t border-white/10">
                    <td className="px-4 py-4" colSpan={6}>
                      Nenhum pagamento registrado ainda.
                    </td>
                  </tr>
                ) : (
                  payments.map((payment) => {
                    const status = (payment.status || "desconhecido").toLowerCase();
                    const statusClass =
                      status === "paid"
                        ? "border-green-400/40 bg-green-400/10 text-green-300"
                        : status === "pending"
                        ? "border-orange-400/40 bg-orange-400/10 text-orange-300"
                        : "border-white/20 bg-white/10 text-white/70";
                    return (
                    <tr key={payment.id} className="border-t border-white/10">
                      <td className="px-4 py-4 text-xs text-white/70">
                        {payment.tx_id}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`rounded-full border px-3 py-1 text-xs ${statusClass}`}
                        >
                          {payment.status || "desconhecido"}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-white">
                        {payment.amount !== null
                          ? formatPrice(payment.amount / 100)
                          : "-"}
                      </td>
                      <td className="px-4 py-4">
                        {payment.customer_name || payment.customer_email || "-"}
                      </td>
                      <td className="px-4 py-4">
                        {payment.customer_phone ? (
                          <a
                            href={`https://wa.me/${payment.customer_phone.replace(
                              /\D/g,
                              ""
                            )}`}
                            className="text-brand"
                            target="_blank"
                            rel="noreferrer"
                          >
                            {payment.customer_phone}
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="px-4 py-4 text-xs text-white/60">
                        {new Date(payment.created_at).toLocaleString("pt-BR")}
                      </td>
                    </tr>
                  );
                  })
                )}
              </tbody>
            </table>
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
                    <td className="px-4 py-4">
                      {product.customPrice
                        ? "Valor a definir"
                        : formatPrice(product.price)}
                    </td>
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
