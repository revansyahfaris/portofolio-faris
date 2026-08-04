/**
 * Pembatas laju permintaan sederhana berbasis memori proses.
 *
 * BATASAN YANG HARUS DISADARI: penyimpanannya ada di memori satu instance server.
 * Pada penyebaran serverless, tiap instance punya hitungannya sendiri dan hitungan
 * itu hilang saat instance dimatikan. Jadi ini bukan perlindungan terhadap serangan
 * terdistribusi, melainkan pengaman terhadap pengiriman berulang yang tidak
 * disengaja dan bot sederhana — cukup untuk formulir kontak portofolio.
 *
 * Bila suatu saat lalu lintasnya jauh lebih besar atau penyalahgunaannya nyata,
 * ganti dengan penyimpanan bersama (misalnya Upstash Redis) tanpa perlu mengubah
 * pemanggilnya, karena antarmuka fungsinya sudah dibuat menyerupai.
 */

interface Bucket {
  count: number;
  /** Waktu jendela pembatasan saat ini berakhir, dalam milidetik epoch. */
  resetAt: number;
}

const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 3;
/** Batas jumlah kunci yang disimpan, mencegah memori tumbuh tanpa batas. */
const MAX_TRACKED_KEYS = 5000;

const buckets = new Map<string, Bucket>();

/** Membuang catatan yang jendelanya sudah lewat agar Map tidak menumpuk selamanya. */
function evictExpired(now: number) {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export interface RateLimitResult {
  allowed: boolean;
  /** Sisa jatah pada jendela saat ini. */
  remaining: number;
  /** Detik yang harus ditunggu sebelum mencoba lagi. */
  retryAfterSeconds: number;
}

export function checkRateLimit(key: string): RateLimitResult {
  const now = Date.now();

  if (buckets.size > MAX_TRACKED_KEYS) evictExpired(now);

  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return {
      allowed: true,
      remaining: MAX_REQUESTS_PER_WINDOW - 1,
      retryAfterSeconds: 0,
    };
  }

  if (existing.count >= MAX_REQUESTS_PER_WINDOW) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil((existing.resetAt - now) / 1000),
    };
  }

  existing.count++;
  return {
    allowed: true,
    remaining: MAX_REQUESTS_PER_WINDOW - existing.count,
    retryAfterSeconds: 0,
  };
}
