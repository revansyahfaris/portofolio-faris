import { NextResponse } from 'next/server';
import {
  escapeHtml,
  validateContactPayload,
  type ContactPayload,
} from '@/lib/contact/validateContactPayload';
import { checkRateLimit } from '@/lib/contact/rateLimit';

/**
 * Endpoint pengiriman formulir kontak.
 *
 * Email dikirim lewat REST API Resend memakai fetch biasa, bukan lewat paket SDK.
 * Pertimbangannya sederhana: satu permintaan HTTP tidak memerlukan pustaka
 * tambahan, dan setiap dependensi yang tidak dipasang adalah satu hal lebih
 * sedikit yang perlu diperbarui dan diaudit keamanannya.
 *
 * Variabel lingkungan yang dibutuhkan (letakkan di .env.local, jangan di-commit):
 *   RESEND_API_KEY     kunci API dari dasbor Resend
 *   CONTACT_TO_EMAIL   alamat tujuan pesan masuk
 *   CONTACT_FROM_EMAIL alamat pengirim pada domain yang sudah diverifikasi di Resend
 */

/** Route ini selalu diproses saat permintaan datang; tidak ada yang layak di-cache. */
export const dynamic = 'force-dynamic';

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

/**
 * Mengambil alamat IP pengirim dari header proksi.
 *
 * Nilainya hanya dipakai sebagai kunci pembatas laju, bukan untuk otentikasi —
 * header semacam ini bisa dipalsukan, jadi tidak boleh dijadikan dasar keputusan
 * keamanan apa pun yang lebih serius.
 */
function getClientKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') ?? 'unknown';
}

/** Menyusun badan email. Seluruh isian pengguna dilarikan sebelum disisipkan. */
function buildEmailHtml(payload: ContactPayload): string {
  const name = escapeHtml(payload.name);
  const email = escapeHtml(payload.email);
  const topic = escapeHtml(payload.topic);
  const message = escapeHtml(payload.message).replace(/\n/g, '<br />');

  return `
    <div style="font-family: ui-sans-serif, system-ui, sans-serif; line-height: 1.6;">
      <h2 style="margin: 0 0 12px;">Pesan baru dari portofolio</h2>
      <p style="margin: 0 0 4px;"><strong>Nama:</strong> ${name}</p>
      <p style="margin: 0 0 4px;"><strong>Email:</strong> ${email}</p>
      <p style="margin: 0 0 12px;"><strong>Topik:</strong> ${topic}</p>
      <hr style="border: none; border-top: 1px solid #e4e4e7;" />
      <p style="margin: 12px 0 0;">${message}</p>
    </div>
  `;
}

export async function POST(request: Request) {
  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;

  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    // Pesan ke pengguna sengaja tidak menyebut variabel mana yang kurang: itu
    // informasi untuk pengelola, bukan untuk pengunjung, dan tidak membantu mereka.
    console.error('Konfigurasi pengiriman email belum lengkap pada variabel lingkungan.');
    return NextResponse.json(
      { error: 'Pengiriman pesan sedang tidak tersedia. Silakan hubungi lewat email langsung.' },
      { status: 503 }
    );
  }

  const rateLimit = checkRateLimit(getClientKey(request));
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: 'Terlalu banyak pengiriman. Coba lagi beberapa saat lagi.' },
      { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfterSeconds) } }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Format permintaan tidak valid.' }, { status: 400 });
  }

  const result = validateContactPayload(body);

  if (!result.ok) {
    // Kasus umpan bot dijawab seolah berhasil. Menolaknya secara terbuka justru
    // memberi tahu pengirim otomatis bahwa umpannya terdeteksi.
    if (result.field === 'honeypot') {
      return NextResponse.json({ ok: true }, { status: 200 });
    }
    return NextResponse.json({ error: result.message, field: result.field }, { status: 400 });
  }

  const payload = result.value;

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: [CONTACT_TO_EMAIL],
        subject: `[Portofolio] ${payload.topic} — ${payload.name}`,
        html: buildEmailHtml(payload),
        // Membalas langsung dari kotak masuk akan tertuju ke pengirim, bukan ke
        // alamat sistem. Tanpa ini, tiap balasan harus disalin manual alamatnya.
        reply_to: payload.email,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error('Resend menolak permintaan:', response.status, detail);
      return NextResponse.json(
        { error: 'Pesan gagal dikirim. Silakan coba lagi atau hubungi lewat email langsung.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error('Gagal menghubungi layanan email:', error);
    return NextResponse.json(
      { error: 'Pesan gagal dikirim. Silakan coba lagi atau hubungi lewat email langsung.' },
      { status: 502 }
    );
  }
}
