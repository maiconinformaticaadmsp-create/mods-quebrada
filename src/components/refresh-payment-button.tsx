"use client";

import { useState } from "react";

export function RefreshPaymentButton({ txId }: { txId: string }) {
  const [loading, setLoading] = useState(false);

  return (
    <button
      type="button"
      disabled={loading}
      onClick={async () => {
        setLoading(true);
        try {
          await fetch("/api/admin/refresh-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tx_id: txId }),
          });
          window.location.reload();
        } finally {
          setLoading(false);
        }
      }}
      className="rounded-full border border-white/20 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-white/70 disabled:opacity-60"
    >
      {loading ? "Atualizando..." : "Atualizar"}
    </button>
  );
}
