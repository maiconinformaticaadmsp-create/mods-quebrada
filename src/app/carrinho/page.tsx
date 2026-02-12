import { Suspense } from "react";
import { CartClient } from "./CartClient";

export default function CartPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-grid" />}>
      <CartClient />
    </Suspense>
  );
}
