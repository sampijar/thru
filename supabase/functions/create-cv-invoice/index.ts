// Supabase Edge Function: create-cv-invoice
//
// Dipanggil dari frontend saat pengunjung klik "Buka Kontak — Rp 25.000" di sebuah
// kartu CV. Function ini:
//   1. Mengambil harga CV yang benar dari database (BUKAN dari frontend, supaya
//      harga tidak bisa dimanipulasi lewat DevTools/request palsu).
//   2. Membuat invoice Xendit lewat Invoice API (pakai secret key, sisi server).
//   3. Menyimpan baris "pending" di cv_unlocks dengan unlock_token acak.
//   4. Mengembalikan invoice_url (untuk redirect browser ke halaman bayar Xendit)
//      dan unlock_token (dipakai frontend untuk polling status lewat reveal-cv).
//
// Env vars yang dibutuhkan (set lewat `supabase secrets set ...`):
//   XENDIT_SECRET_KEY   -- secret key dari dashboard Xendit (test atau live)
//   SITE_URL            -- contoh: https://thrucorp.com (untuk redirect setelah bayar)
// Otomatis tersedia dari Supabase runtime (tidak perlu di-set manual):
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY

import { corsHeaders } from "../_shared/cors.ts";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { cv_id, buyer_email, buyer_whatsapp } = await req.json();

    if (!cv_id || !buyer_email) {
      return new Response(JSON.stringify({ error: "cv_id dan buyer_email wajib diisi." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const XENDIT_SECRET_KEY = Deno.env.get("XENDIT_SECRET_KEY")!;
    const SITE_URL = Deno.env.get("SITE_URL") ?? "https://thrucorp.com";

    // 1. Ambil harga & pastikan CV ini memang ada & aktif (harga dari DB, bukan dari client).
    const cvRes = await fetch(
      `${SUPABASE_URL}/rest/v1/cv_candidates?id=eq.${cv_id}&is_active=eq.true&select=id,price_idr,display_name`,
      {
        headers: {
          apikey: SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
        },
      }
    );
    const cvRows = await cvRes.json();
    if (!Array.isArray(cvRows) || cvRows.length === 0) {
      return new Response(JSON.stringify({ error: "CV tidak ditemukan." }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const cv = cvRows[0];
    const amount = cv.price_idr;

    // 2. Siapkan referensi unik & token unlock.
    const externalId = `cv-unlock-${crypto.randomUUID()}`;
    const unlockToken = crypto.randomUUID().replace(/-/g, "");

    // 3. Buat invoice di Xendit.
    const xenditRes = await fetch("https://api.xendit.co/v2/invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(`${XENDIT_SECRET_KEY}:`)}`,
      },
      body: JSON.stringify({
        external_id: externalId,
        amount,
        currency: "IDR",
        payer_email: buyer_email,
        description: `Buka kontak CV kandidat: ${cv.display_name}`,
        success_redirect_url: `${SITE_URL}/index.html?cv_unlock=${unlockToken}#cv-database`,
        failure_redirect_url: `${SITE_URL}/index.html?cv_unlock_failed=1#cv-database`,
      }),
    });

    if (!xenditRes.ok) {
      const errText = await xenditRes.text();
      console.error("Xendit invoice creation failed:", errText);
      return new Response(JSON.stringify({ error: "Gagal membuat invoice pembayaran." }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const invoice = await xenditRes.json();

    // 4. Simpan baris pending di cv_unlocks (pakai service_role, RLS diabaikan).
    const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/cv_unlocks`, {
      method: "POST",
      headers: {
        apikey: SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        cv_id,
        buyer_email,
        buyer_whatsapp: buyer_whatsapp ?? null,
        amount,
        xendit_invoice_id: invoice.id,
        xendit_external_id: externalId,
        status: "pending",
        unlock_token: unlockToken,
      }),
    });

    if (!insertRes.ok) {
      const errText = await insertRes.text();
      console.error("Failed to insert cv_unlocks row:", errText);
      return new Response(JSON.stringify({ error: "Gagal menyimpan transaksi." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ invoice_url: invoice.invoice_url, unlock_token: unlockToken }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("create-cv-invoice error:", err);
    return new Response(JSON.stringify({ error: "Terjadi kesalahan pada server." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
