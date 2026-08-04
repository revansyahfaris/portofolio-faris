/**
 * Validasi isian formulir kontak.
 *
 * Dijalankan di sisi server, bukan hanya di browser. Validasi di browser hanya
 * berguna untuk memberi tahu pengguna lebih cepat; siapa pun tetap bisa mengirim
 * permintaan langsung ke endpoint tanpa melewati formulir, sehingga aturan yang
 * sebenarnya harus ditegakkan di sini.
 */

export interface ContactPayload {
  name: string;
  email: string;
  topic: string;
  message: string;
  /** Umpan untuk bot: bidang tersembunyi yang seharusnya selalu kosong. */
  honeypot?: string;
}

export type ValidationResult =
  | { ok: true; value: ContactPayload }
  | { ok: false; field: string; message: string };

/** Topik yang diizinkan. Daftar tertutup agar isinya tidak bisa diisi teks sembarang. */
export const CONTACT_TOPICS = [
  'Peluang Kerja',
  'Proyek Freelance',
  'Kolaborasi',
  'Lainnya',
] as const;

const MAX_LENGTH = { name: 80, email: 160, message: 2000 } as const;
const MIN_LENGTH = { name: 2, message: 20 } as const;

/**
 * Pemeriksaan format email yang sengaja longgar.
 *
 * Aturan email yang benar-benar sesuai standar sangat rumit dan pola regex yang
 * terlalu ketat justru menolak alamat yang sah. Pemeriksaan di sini hanya menyaring
 * kesalahan ketik yang nyata; keabsahan sesungguhnya baru terbukti saat pesan
 * balasan berhasil terkirim.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function asTrimmedString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export function validateContactPayload(input: unknown): ValidationResult {
  if (typeof input !== 'object' || input === null) {
    return { ok: false, field: 'form', message: 'Format data tidak dikenali.' };
  }

  const raw = input as Record<string, unknown>;

  // Bidang umpan. Bot pengisi otomatis mengisi semua input yang ditemukannya,
  // termasuk yang disembunyikan dari pengguna. Permintaan sengaja dijawab seolah
  // berhasil di lapisan route agar pengirim otomatis tidak belajar dari penolakan.
  const honeypot = asTrimmedString(raw.honeypot);
  if (honeypot.length > 0) {
    return { ok: false, field: 'honeypot', message: 'Permintaan ditolak.' };
  }

  const name = asTrimmedString(raw.name);
  if (name.length < MIN_LENGTH.name) {
    return { ok: false, field: 'name', message: 'Nama minimal 2 karakter.' };
  }
  if (name.length > MAX_LENGTH.name) {
    return { ok: false, field: 'name', message: 'Nama terlalu panjang.' };
  }

  const email = asTrimmedString(raw.email);
  if (!EMAIL_PATTERN.test(email) || email.length > MAX_LENGTH.email) {
    return { ok: false, field: 'email', message: 'Alamat email tidak valid.' };
  }

  const topic = asTrimmedString(raw.topic);
  if (!CONTACT_TOPICS.includes(topic as (typeof CONTACT_TOPICS)[number])) {
    return { ok: false, field: 'topic', message: 'Topik tidak dikenali.' };
  }

  const message = asTrimmedString(raw.message);
  if (message.length < MIN_LENGTH.message) {
    return {
      ok: false,
      field: 'message',
      message: `Pesan minimal ${MIN_LENGTH.message} karakter agar bisa ditindaklanjuti.`,
    };
  }
  if (message.length > MAX_LENGTH.message) {
    return { ok: false, field: 'message', message: 'Pesan melebihi batas 2000 karakter.' };
  }

  return { ok: true, value: { name, email, topic, message } };
}

/**
 * Melarikan karakter HTML sebelum isian pengguna dimasukkan ke badan email HTML.
 *
 * Tanpa ini, teks yang dikirim pengunjung bisa menyisipkan markup ke dalam email
 * yang dibaca pemilik situs. Sederhana, tetapi wajib: setiap tempat data pengguna
 * berpindah ke format lain adalah tempat data itu harus dilarikan lebih dulu.
 */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
