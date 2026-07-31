// Supabase Edge Function: xendit-webhook
//
// URL function ini didaftarkan di dashboard Xendit -> Settings -> Webhooks
// sebagai "Invoice Paid" callback URL. Xendit akan memanggil endpoint ini
// setiap kali status invoice berubah (lunas, expired, dll).
//
// Keamanan: setiap request dari Xendit menyertakan header `x-callback-token`
// yang HARUS dicocokkan dengan token verifikasi webhook dari dashboard Xendit
// (Settings -> Webhooks -> Verification Token). Kalau tidak cocok, request
// ditolak -- ini mencegah orang lain memalsukan "pembayaran lunas" dengan
// mengirim request palsu langsung ke URL ini.
//
// Env vars yang dibutuhkan:
//   XENDIT_WEBHOOK_TOKEN -- Verification Token dari dashboard Xendit
// Otomatis tersedia dari Supabase runtime:
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY

import { corsHeaders } from "../_shared/cors.ts";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const callbackToken = req.headers.get("x-callback-token");
  const expectedToken = Deno.env.get("XENDIT_WEBHOOK_TOKEN");

  if (!expectedToken || callbackToken !== expectedToken) {
    return new Response(JSON.stringify({ error: "Invalid callback token." }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const payload = await req.json();
    const externalId = payload.external_id;
    const xenditStatus = String(payload.status ?? "").toUpperCase();

    if (!externalId) {
      return new Response(JSON.stringify({ error: "Missing external_id." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let newStatus: "paid" | "expired" | "failed" | null = null;
    if (xenditStatus === "PAID" || xenditStatus === "SETTLED") newStatus = "paid";
    else if (xenditStatus === "EXPIRED") newStatus = "expired";
    else if (xenditStatus === "FAILED") newStatus = "failed";

    if (!newStatus) {
      // Status lain (mis. PENDING) -- tidak perlu diubah, cukup ack.
      return new Response(JSON.stringify({ ok: true, ignored: xenditStatus }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const updateBody: Record<string, unknown> = { status: newStatus };
    if (newStatus === "paid") updateBody.paid_at = new Date().toISOString();

    const updateRes = await fetch(
      `${SUPABASE_URL}/rest/v1/cv_unlocks?xendit_external_id=eq.${encodeURIComponent(externalId)}`,
      {
        method: "PATCH",
        headers: {
          apikey: SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify(updateBody),
      }
    );

    if (!updateRes.ok) {
      const errText = await updateRes.text();
      console.error("Failed to update cv_unlocks from webhook:", errText);
      return new Response(JSON.stringify({ error: "Failed to update record." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("xendit-webhook error:", err);
    return new Response(JSON.stringify({ error: "Terjadi kesalahan pada server." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
