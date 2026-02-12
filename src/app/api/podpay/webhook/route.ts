import { NextResponse } from "next/server";
import crypto from "crypto";

const WEBHOOK_SECRET = process.env.PODPAY_WEBHOOK_SECRET || "";

export async function POST(request: Request) {
  const signature = request.headers.get("x-podpay-signature") || "";
  const rawBody = await request.text();

  if (WEBHOOK_SECRET) {
    const hmac = crypto.createHmac("sha256", WEBHOOK_SECRET).update(rawBody);
    const hex = hmac.digest("hex");
    const base64 = Buffer.from(hex, "hex").toString("base64");

    const valid = signature === hex || signature === base64;
    if (!valid) {
      return NextResponse.json(
        { success: false, error: "Assinatura inválida" },
        { status: 401 }
      );
    }
  }

  // Responder rápido para confirmar recebimento
  return NextResponse.json({ success: true });
}
