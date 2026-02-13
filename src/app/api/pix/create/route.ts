import { NextResponse } from "next/server";
import crypto from "crypto";

const PODPAY_BASE_URL =
  process.env.PODPAY_BASE_URL ||
  process.env.URL_BASE_PODPAY ||
  "https://api.podpay.app";
const PODPAY_SECRET_KEY = process.env.PODPAY_SECRET_KEY || "";
const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

async function savePayment(data: {
  tx_id: string;
  status?: string | null;
  amount?: number | null;
  customer_name?: string | null;
  customer_email?: string | null;
  customer_phone?: string | null;
  raw: unknown;
}) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) return;
  const payload: Record<string, unknown> = {
    tx_id: data.tx_id,
    raw: data.raw,
  };
  if (data.status) payload.status = data.status;
  if (typeof data.amount === "number") payload.amount = data.amount;
  if (data.customer_name) payload.customer_name = data.customer_name;
  if (data.customer_email) payload.customer_email = data.customer_email;
  if (data.customer_phone) payload.customer_phone = data.customer_phone;

  await fetch(`${SUPABASE_URL}/rest/v1/payments`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates",
    },
    body: JSON.stringify(payload),
  });
}

export async function POST(request: Request) {
  if (!PODPAY_SECRET_KEY) {
    return NextResponse.json(
      { success: false, error: "PODPAY_SECRET_KEY não configurada" },
      { status: 500 }
    );
  }

  const body = await request.json();
  const idempotencyKey = crypto.randomUUID();

  const response = await fetch(`${PODPAY_BASE_URL}/v1/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": PODPAY_SECRET_KEY,
      "X-Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok || data?.success === false) {
    return NextResponse.json(
      { success: false, error: data?.error || "Erro ao criar PIX" },
      { status: response.status || 500 }
    );
  }

  const txId = data?.data?.id || data?.id;
  const status = data?.data?.status || data?.status || null;
  const amount = data?.data?.amount || data?.amount || null;
  const customer = body?.customer || {};

  if (txId) {
    await savePayment({
      tx_id: String(txId),
      status: status ? String(status) : null,
      amount: typeof amount === "number" ? amount : null,
      customer_name: customer?.name || null,
      customer_email: customer?.email || null,
      customer_phone: customer?.phone || null,
      raw: data,
    });
  }

  return NextResponse.json(data);
}
