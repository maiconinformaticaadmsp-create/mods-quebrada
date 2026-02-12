import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";

const PODPAY_BASE_URL =
  process.env.PODPAY_BASE_URL ||
  process.env.URL_BASE_PODPAY ||
  "https://api.podpay.app";
const PODPAY_SECRET_KEY = process.env.PODPAY_SECRET_KEY || "";
const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

function isAdminAuthorized() {
  const ADMIN_USER = process.env.ADMIN_USER || "";
  const ADMIN_PASS = process.env.ADMIN_PASS || "";
  const expected = crypto
    .createHash("sha256")
    .update(`${ADMIN_USER}:${ADMIN_PASS}`)
    .digest("hex");
  const auth = cookies().get("admin_auth")?.value;
  return Boolean(auth && auth === expected);
}

export async function POST(request: Request) {
  if (!isAdminAuthorized()) {
    return NextResponse.json({ success: false, error: "Não autorizado" }, { status: 401 });
  }

  if (!PODPAY_SECRET_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { success: false, error: "Configuração incompleta" },
      { status: 500 }
    );
  }

  const { tx_id } = (await request.json()) as { tx_id?: string };
  if (!tx_id) {
    return NextResponse.json({ success: false, error: "tx_id ausente" }, { status: 400 });
  }

  const response = await fetch(`${PODPAY_BASE_URL}/v1/transactions/${tx_id}`, {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": PODPAY_SECRET_KEY,
    },
  });

  const data = await response.json();
  if (!response.ok || data?.success === false) {
    return NextResponse.json(
      { success: false, error: data?.error || "Erro ao consultar transação" },
      { status: response.status || 500 }
    );
  }

  const status = data?.data?.status || data?.status || null;

  if (status) {
    await fetch(
      `${SUPABASE_URL}/rest/v1/payments?tx_id=eq.${encodeURIComponent(tx_id)}`,
      {
        method: "PATCH",
        headers: {
          apikey: SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      }
    );
  }

  return NextResponse.json({ success: true, status });
}
