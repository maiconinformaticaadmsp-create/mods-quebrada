import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const user = process.env.ADMIN_USER || "";
  const pass = process.env.ADMIN_PASS || "";

  const auth = request.headers.get("authorization");
  if (!auth || !auth.startsWith("Basic ")) {
    return new NextResponse("Autenticação necessária", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Admin"',
      },
    });
  }

  const base64 = auth.replace("Basic ", "");
  let decoded = "";
  try {
    decoded = atob(base64);
  } catch {
    decoded = "";
  }

  const [username, password] = decoded.split(":");
  const isValid = username === user && password === pass;

  if (!isValid) {
    return new NextResponse("Credenciais inválidas", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Admin"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
