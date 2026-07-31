// Supabase Edge Function: reveal-cv
//
// Dipanggil dari frontend setelah pengunjung diarahkan kembali dari halaman
// pembayaran Xendit (lewat query param ?cv_unlock=<token> di success_redirect_url).
// Function ini mengecek apakah unlock_token tersebut memang berstatus "paid" di
// cv_unlocks, dan HANYA jika lunas, mengembalikan data sensitif kandidat
// (nama asli, telepon, email, sosial media). Ini satu-satunya jalan data sensitif
// bisa keluar dari database -- publishable key TIDAK PERNAH bisa membaca kolom
// ini langsung karena tabel cv_candidates tidak punya policy RLS untuk anon.
//
// Otomatis tersedia dari Supabase runtime:
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY

import { corsHeaders } from "../_shared/cors.ts";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const token =
      req.method === "GET"
        ? url.searchParams.get("token")
        : (await req.json().catch(() => ({})))?.token;

    if (!token) {
      return new Response(JSON.stringify({ error: "token wajib diisi." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const unlockRes = await fetch(
      `${SUPABASE_URL}/rest/v1/cv_unlocks?unlock_token=eq.${encodeURIComponent(token)}&select=cv_id,status`,
      {
        headers: {
          apikey: SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
        },
      }
    );
    const unlockRows = await unlockRes.json();
    if (!Array.isArray(unlockRows) || unlockRows.length === 0) {
      return new Response(JSON.stringify({ status: "not_found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const unlock = unlockRows[0];
    if (unlock.status !== "paid") {
      return new Response(JSON.stringify({ status: unlock.status }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const cvRes = await fetch(
      `${SUPABASE_URL}/rest/v1/cv_candidates?id=eq.${unlock.cv_id}&select=id,full_name,phone,email,linkedin_url,portfolio_url,other_social,cv_file_url`,
      {
        headers: {
          apikey: SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
        },
      }
    );
    const cvRows = await cvRes.json();
    if (!Array.isArray(cvRows) || cvRows.length === 0) {
      return new Response(JSON.stringify({ status: "not_found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ status: "paid", cv_id: unlock.cv_id, ...cvRows[0] }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("reveal-cv error:", err);
    return new Response(JSON.stringify({ error: "Terjadi kesalahan pada server." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
