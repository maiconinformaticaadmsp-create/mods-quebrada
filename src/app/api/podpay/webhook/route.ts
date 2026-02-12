import { NextResponse } from "next/server";
import crypto from "crypto";

const WEBHOOK_SECRET = process.env.PODPAY_WEBHOOK_SECRET || "";
const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

type PaymentInsert = {
  tx_id: string;
  status?: string | null;
  amount?: number | null;
  customer_name?: string | null;
  customer_email?: string | null;
  customer_phone?: string | null;
  raw: unknown;
};

async function savePayment(data: PaymentInsert) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return { error: "Supabase nao configurado" };
  }

  const response = await fetch(`${SUPABASE_URL}/rest/v1/payments`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const text = await response.text();
    return { error: text || "Erro ao salvar pagamento" };
  }

  return { error: null };
}

export async function POST(request: Request) {
  const signatureHeader = request.headers.get("x-podpay-signature") || "";
  const signature = signatureHeader.replace(/^sha256=/i, "").trim();
  const rawBody = await request.text();

  if (WEBHOOK_SECRET) {
    const hmac = crypto.createHmac("sha256", WEBHOOK_SECRET).update(rawBody);
    const hex = hmac.digest("hex");
    const base64 = Buffer.from(hex, "hex").toString("base64");

    const valid =
      signature.toLowerCase() === hex.toLowerCase() || signature === base64;
    if (!valid) {
      return NextResponse.json(
        { success: false, error: "Assinatura invalida" },
        { status: 401 }
      );
    }
  }

  let payload: any = {};
  try {
    payload = JSON.parse(rawBody);
  } catch {
    payload = {};
  }

  const data = payload?.data || payload?.transaction || payload;
  const txId =
    data?.id ||
    data?.txId ||
    data?.transactionId ||
    data?.paymentId ||
    data?.transaction?.id ||
    data?.payment?.id ||
    payload?.id ||
    "";

  if (txId) {
    const status = data?.status || payload?.status || payload?.event || null;
    const amount =
      typeof data?.amount === "number" ? data.amount : payload?.amount ?? null;
    const customer = data?.customer || payload?.customer || {};

    await savePayment({
      tx_id: String(txId),
      status: status ? String(status) : null,
      amount: typeof amount === "number" ? amount : null,
      customer_name: customer?.name || null,
      customer_email: customer?.email || null,
      customer_phone: customer?.phone || null,
      raw: payload,
    });
  }

  return NextResponse.json({ success: true });
}
