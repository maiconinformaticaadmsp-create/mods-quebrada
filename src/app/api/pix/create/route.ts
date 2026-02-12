import { NextResponse } from "next/server";
import crypto from "crypto";

const PODPAY_BASE_URL = process.env.PODPAY_BASE_URL || "https://api.podpay.app";
const PODPAY_SECRET_KEY = process.env.PODPAY_SECRET_KEY || "";

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

  return NextResponse.json(data);
}
