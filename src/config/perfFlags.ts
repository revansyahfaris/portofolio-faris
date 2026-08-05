// File: src/config/perfFlags.ts

/**
 * SAKELAR PENGUKURAN — SEMENTARA.
 *
 * Menampilkan tombol kecil di Profile untuk mematikan lapisan api tanpa memuat
 * ulang halaman.
 *
 * Bisa dimatikan hidup-hidup, dan itu memang gunanya: perbedaan memori grafis
 * dan kelancaran hanya terbaca jujur kalau dibandingkan pada halaman yang SAMA,
 * pada gulir yang sama, dalam hitungan detik yang berdekatan. Membandingkan dua
 * kali muat halaman memasukkan terlalu banyak hal lain yang ikut berubah —
 * cache, keadaan GPU, beban tab lain — dan angkanya jadi tidak bisa dipercaya.
 *
 * Setel ke false sebelum rilis, atau cabut berkasnya sekalian bersama
 * ProfileFlamesToggle.
 */
export const SHOW_FLAME_TOGGLE = true;

/**
 * Keadaan awal lapisan api saat halaman dimuat.
 *
 * Setel ke false kalau kamu ingin melihat halaman tanpa api sejak awal, tanpa
 * harus menekan tombolnya lebih dulu setiap kali menyegarkan.
 */
export const FLAMES_ON_BY_DEFAULT = true;
