// File: src/config/motionFlags.ts

/**
 * SAKELAR DIAGNOSIS — SEMENTARA.
 *
 * Membekukan seluruh gerak di section yang sedang tidak digarap, supaya sisa
 * tenaga mesin terkumpul pada satu section yang sedang diuji.
 *
 * Gunanya untuk memisahkan dua kemungkinan yang gejalanya sama persis: transisi
 * yang memang terlalu cepat, atau transisi yang durasinya benar tetapi
 * frame-nya dilompati karena mesin kehabisan tenaga. Keduanya terlihat sebagai
 * "melompat", dan tidak ada cara membedakannya dengan mata selain mengurangi
 * bebannya lalu melihat apakah gejalanya hilang.
 *
 * Setel ke false sebelum rilis. Kalau lupa, yang hilang bukan sekadar hiasan —
 * seluruh gerak masuk di enam section ikut mati.
 */
export const FREEZE_IDLE_SECTIONS = true;

/**
 * Section yang gerakannya TETAP hidup saat sakelar di atas menyala.
 *
 * Hero dan Profile karena keduanya sudah selesai dan menjadi patokan rasa
 * gerak situs ini; Skills karena itulah yang sedang dikerjakan.
 */
export const LIVE_SECTION_IDS = ['hero', 'profile', 'skills'] as const;
