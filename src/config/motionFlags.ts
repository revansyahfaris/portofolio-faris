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
 * HASIL PENGUKURANNYA: bukan beban mesin. Lompatan yang membuat kami curiga
 * ternyata berasal dari focus() yang bawaannya menggulirkan elemen ke dalam
 * pandangan, melawan animasi yang sedang berjalan. Diperbaiki dengan
 * preventScroll di SkillsSection.
 *
 * Karena itu sakelar ini dimatikan. Dibiarkan ada karena pertanyaan yang sama
 * hampir pasti muncul lagi pada section berikutnya, dan membangunnya ulang dari
 * nol lebih mahal daripada membalik satu boolean.
 *
 * Section yang tetap hidup saat sakelar menyala ditentukan di globals.css,
 * bukan di sini — aturan :not() harus berupa CSS statis dan tidak bisa dirangkai
 * dari nilai JavaScript.
 */
export const FREEZE_IDLE_SECTIONS = false;
