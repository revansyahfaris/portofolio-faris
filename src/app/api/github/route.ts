import { NextResponse } from 'next/server';
import {
  fetchGithubStats,
  GithubFetchError,
  GITHUB_REVALIDATE_SECONDS,
} from '@/lib/github/fetchGithubStats';
import { portofolioConfig } from '@/config/portofolioConfig';

/**
 * Endpoint statistik GitHub.
 *
 * Keberadaan route ini bukan sekadar perantara. Fungsinya ada tiga:
 * 1. Menyimpan personal access token di server sehingga tidak pernah dikirim ke browser.
 * 2. Menyatukan hasil beberapa permintaan GitHub menjadi satu balasan, sehingga
 *    browser cukup melakukan satu permintaan jaringan.
 * 3. Memberi lapisan cache, sehingga kunjungan berikutnya tidak lagi memanggil
 *    GitHub dan kuota API tidak habis saat halaman ramai dibuka.
 */

export const revalidate = 3600;

/** Nama pengguna diambil dari tautan GitHub pada konfigurasi portofolio. */
const GITHUB_LOGIN = portofolioConfig.socials.github.split('/').filter(Boolean).pop() ?? '';

/** Memetakan penyebab kegagalan ke status HTTP yang sesuai. */
const STATUS_BY_REASON: Record<GithubFetchError['reason'], number> = {
  'missing-token': 503,
  unauthorized: 503,
  'rate-limited': 429,
  'not-found': 404,
  unknown: 502,
};

export async function GET() {
  try {
    const stats = await fetchGithubStats(GITHUB_LOGIN);

    return NextResponse.json(stats, {
      headers: {
        // Mengizinkan CDN menyajikan data lama sementara data baru diambil di latar,
        // sehingga pengunjung tidak pernah menunggu pengambilan ulang.
        'Cache-Control': `public, s-maxage=${GITHUB_REVALIDATE_SECONDS}, stale-while-revalidate=86400`,
      },
    });
  } catch (error) {
    if (error instanceof GithubFetchError) {
      // Pesan dikembalikan apa adanya karena isinya sudah disusun untuk dibaca
      // manusia dan tidak memuat token maupun detail internal.
      return NextResponse.json(
        { error: error.message, reason: error.reason },
        { status: STATUS_BY_REASON[error.reason] }
      );
    }

    console.error('Gagal mengambil statistik GitHub:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan tak terduga saat menghubungi GitHub.', reason: 'unknown' },
      { status: 500 }
    );
  }
}
