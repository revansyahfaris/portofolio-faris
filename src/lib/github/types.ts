/**
 * Bentuk data GitHub yang dipakai antarmuka.
 *
 * Sengaja dibuat sebagai tipe tersendiri, bukan memakai bentuk mentah balasan
 * GitHub. Dengan begitu perubahan pada API GitHub cukup ditangani di satu tempat
 * (lapisan pengambil data), dan komponen tampilan tidak ikut berubah.
 */

/** Satu hari pada kalender kontribusi. */
export interface ContributionDay {
  /** Tanggal format YYYY-MM-DD. */
  date: string;
  count: number;
  /** Tingkat intensitas 0-4, sudah dinormalisasi di sisi server. */
  level: 0 | 1 | 2 | 3 | 4;
}

/** Ringkasan satu repositori publik. */
export interface RepoSummary {
  name: string;
  description: string | null;
  url: string;
  stars: number;
  forks: number;
  language: string | null;
  /** Warna bahasa dari GitHub. Dipakai sebagai penanda, selalu didampingi teks nama bahasa. */
  languageColor: string | null;
  updatedAt: string;
}

/** Porsi satu bahasa pemrograman terhadap keseluruhan repositori publik. */
export interface LanguageShare {
  name: string;
  color: string | null;
  /** Jumlah repositori yang memakai bahasa ini sebagai bahasa utama. */
  repoCount: number;
  /** Persentase terhadap total repositori yang punya bahasa utama. */
  percentage: number;
}

/** Seluruh data GitHub yang ditampilkan pada section GitHub. */
export interface GithubStats {
  login: string;
  profileUrl: string;
  followers: number;
  publicRepos: number;
  totalStars: number;
  totalForks: number;
  /** Total kontribusi setahun terakhir menurut kalender kontribusi GitHub. */
  totalContributions: number;
  /** Rentetan hari berturut-turut dengan minimal satu kontribusi, dihitung sampai hari terakhir. */
  currentStreak: number;
  longestStreak: number;
  contributions: readonly ContributionDay[];
  pinned: readonly RepoSummary[];
  topRepos: readonly RepoSummary[];
  languages: readonly LanguageShare[];
  /** Waktu data diambil dari GitHub, agar pembaca tahu seberapa mutakhir angkanya. */
  fetchedAt: string;
}
