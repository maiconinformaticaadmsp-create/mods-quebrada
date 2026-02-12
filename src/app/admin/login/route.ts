import { NextResponse } from "next/server";
import crypto from "crypto";

const ADMIN_USER = process.env.ADMIN_USER || "";
const ADMIN_PASS = process.env.ADMIN_PASS || "";

function buildToken() {
  return crypto.createHash("sha256").update(`${ADMIN_USER}:${ADMIN_PASS}`).digest("hex");
}

export async function POST(request: Request) {
  const form = await request.formData();
  const username = String(form.get("username") || "");
  const password = String(form.get("password") || "");

  const isValid = username === ADMIN_USER && password === ADMIN_PASS;

  if (!isValid) {
    return NextResponse.redirect(new URL("/admin/login?erro=1", request.url));
  }

  const response = NextResponse.redirect(new URL("/admin", request.url));
  response.cookies.set("admin_auth", buildToken(), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
