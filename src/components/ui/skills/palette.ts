/**
 * Palet Skills section.
 *
 * Diambil dari rancangan yang dibuat sendiri di Photoshop, bukan dari palet
 * bersama di shared/stage/theme.ts. Section ini memang dikecualikan: merahnya
 * dominan sebagai bidang, bukan sekadar aksen.
 *
 * Semua nilai di sini adalah TEBAKAN AWAL dari gambar acuan dan memang untuk
 * disetel. Kalau ada yang meleset, cukup ubah satu nilai di berkas ini — tidak ada
 * satu pun kode heksadesimal yang ditulis langsung di komponen.
 */
export const SKILLS = {
  /** Merah bidang atas dan bawah pada keadaan tertutup. */
  red: '#DC2626',
  /** Merah bidang tengah — paling jenuh, sehingga bidang tengah maju ke depan. */
  redBright: '#FF0000',
  /** Putih bidang atas pada keadaan terbuka, sekaligus dasar keadaan tertutup. */
  white: '#FFFFFF',
  /** Abu sangat muda untuk watermark raksasa di atas bidang putih. */
  ghost: '#E8E8E8',
  /** Teal untuk penomoran besar. */
  teal: '#7EE8D8',
  /** Kuning untuk judul dan daftar di dalam bidang merah. */
  yellow: '#F0CB5E',
  /** Hitam untuk tipografi berat yang menimpa bidang merah. */
  ink: '#0B0B0B',
  orange: '#ff5500',

  /** Kuning pekat pada lapisan bintang paling belakang. */
  starBack: '#FFE400',
  /** Hijau pada cincin bintang bernomor ganjil. */
  starA: '#10B981',
  /** Hitam pada cincin bintang bernomor genap. */
  starB: '#000000',
} as const;

/**
 * Sudut acuan komposisi, dalam derajat, menurun ke kanan.
 *
 * Nilainya positif dan dibaca sebagai "turun ke kanan": ujung kiri tiap bidang
 * berada lebih tinggi daripada ujung kanannya.
 *
 * Ini hanya sudut ACUAN, bukan sudut yang dipakai seragam. Ketiga bidang pada
 * keadaan tertutup masing-masing punya sudutnya sendiri yang memancar dari satu
 * titik hilang (lihat FAN_SHAPES di SkillsField.tsx). Sudut acuan dipakai oleh
 * elemen yang memang harus sejajar dengan komposisi secara umum — arah sapuan
 * transisi, dan kemiringan tipografi yang menimpanya.
 */
export const SKEW_ANGLE = 27;
