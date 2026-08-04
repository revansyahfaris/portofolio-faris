// File: src/components/ui/skills/units.ts

/**
 * Viewport acuan tempat seluruh komposisi Skills disetel.
 *
 * DIUKUR, bukan diasumsikan — dibaca langsung dari window.innerWidth dan
 * window.innerHeight pada mode fullscreen yang dipakai menyetel. Sengaja bukan
 * resolusi monitor: bilah browser memakan tinggi, sehingga rasio viewport dan
 * rasio monitor bisa berbeda jauh. Menebaknya dari spesifikasi layar persis
 * itulah kekeliruan yang membuat percobaan sebelumnya gagal.
 */
export const REFERENCE_VIEWPORT = { width: 1440, height: 900 } as const;

/**
 * Lebar batang gulir vertikal.
 *
 * Bukan angka karangan: nilainya dibaca dari aturan ::-webkit-scrollbar di
 * globals.css, dan batangnya selalu tampil karena html memakai
 * overflow-y: scroll. Diperlukan di sini karena satuan vw menghitung batang
 * gulir sedangkan lebar kotak section tidak — selisih 8px itu yang membedakan
 * nilai vw dari nilai persen.
 */
const SCROLLBAR_WIDTH = 8;

/** Rasio viewport acuan. Dipakai untuk nilai bersatuan vw. */
const VIEWPORT_ASPECT = REFERENCE_VIEWPORT.width / REFERENCE_VIEWPORT.height;

/** Rasio kotak section acuan. Dipakai untuk nilai persen terhadap lebar. */
const BOX_ASPECT =
  (REFERENCE_VIEWPORT.width - SCROLLBAR_WIDTH) / REFERENCE_VIEWPORT.height;

/** Memangkas ekor pecahan biner: 42 * 1.6 = 67.20000000000001. */
const trim = (n: number) => Number(n.toFixed(4));

/**
 * Mengubah nilai vw menjadi vh yang setara PADA RASIO ACUAN.
 *
 * Inilah seluruh perbaikannya. Setiap ukuran di section ini sudah digerakkan
 * tinggi — font, tebal bidang, besar bintang, semuanya vh. Yang tersisa hanya
 * sebagian POSISI mendatar yang masih digerakkan lebar. Satu komposisi kaku
 * yang ditarik dua faktor skala berbeda: begitu rasio layar berubah, ukurannya
 * mengikuti satu faktor dan jarak mendatarnya mengikuti faktor lain. Itulah
 * bintang yang menjauh dari kipas.
 *
 * Dengan memindahkan nilai mendatar ke kelipatan vh, seluruh komposisi kembali
 * digerakkan satu faktor saja dan menjadi kaku terhadap perubahan rasio.
 *
 * Pada viewport acuan hasilnya sama persis dengan nilai aslinya — bukan
 * kira-kira, melainkan piksel yang sama: 42vw = 42 × 14.4px = 604.8px, dan
 * 67.2vh = 67.2 × 9px = 604.8px.
 */
export const vw = (n: number) => `${trim(n * VIEWPORT_ASPECT)}vh`;

/**
 * Mengubah persen-terhadap-lebar-kotak menjadi vh yang setara.
 *
 * Dipisah dari vw() karena penyebutnya berbeda. Persen pada properti `right`
 * diukur terhadap lebar containing block, yang TIDAK memuat batang gulir,
 * sedangkan 1vw memuatnya. Memakai satu fungsi untuk keduanya akan meleset
 * sekitar satu piksel — kecil, tetapi tidak ada alasan untuk menerimanya.
 */
export const boxWidthPercent = (percent: number) => `${trim(percent * BOX_ASPECT)}vh`;

/**
 * Menulis ulang satuan sebuah nilai penempatan bila satuannya vw.
 *
 * Ada supaya data penempatan bintang dan perabot tidak perlu disentuh sama
 * sekali: nilai bersatuan vh dilewatkan apa adanya, hanya vw yang dialihkan.
 * Dengan begitu angka yang sudah kamu setel tetap tertulis persis seperti
 * semula, dan tidak ada peluang salah ketik saat memindahkannya.
 */
export const rigid = (value?: string): string | undefined => {
  if (value === undefined || !value.endsWith('vw')) return value;
  return vw(parseFloat(value));
};

/**
 * Kelebihan lebar layar terhadap lebar yang seharusnya pada rasio acuan.
 *
 * Bernilai TEPAT NOL pada viewport acuan — bukan mendekati nol, melainkan nol
 * secara aritmetika: 100vw = 1440px dan 160vh = 1.6 × 900 = 1440px. Makin lebar
 * dan pendek jendelanya, makin besar nilainya; makin sempit dan tinggi, makin
 * negatif.
 *
 * Ini yang memungkinkan penyesuaian khusus windowed tanpa media query. Media
 * query memberi lompatan pada satu ambang, dan ambangnya harus ditebak. Ungkapan
 * ini bergerak mulus dan mati dengan sendirinya persis di rasio acuan, sehingga
 * tampilan fullscreen tidak bisa ikut berubah walau satu piksel.
 */
const WIDTH_EXCESS = `(100vw - ${trim(100 * VIEWPORT_ASPECT)}vh)`;

/**
 * Nilai penempatan beserta simpangan yang HANYA muncul saat rasio menyimpang
 * dari acuan.
 *
 * factor adalah seberapa jauh elemen bergeser per satu piksel kelebihan lebar.
 * Tandanya mengikuti properti CSS-nya: pada `top`, negatif berarti naik; pada
 * `left`, positif berarti ke kanan.
 *
 * Contoh pada jendela 1440 × 731, kelebihan lebarnya 1440 − 160 × 7.31 = 270.4px,
 * jadi factor -0.25 pada `top` menaikkan elemen sekitar 68px. Pada fullscreen
 * suku itu bernilai nol dan nilainya kembali persis seperti aslinya.
 */
export const withDrift = (value?: string, factor?: number): string | undefined => {
  const base = rigid(value);
  if (base === undefined || !factor) return base;
  const sign = factor < 0 ? '-' : '+';
  return `calc(${base} ${sign} ${Math.abs(factor)} * ${WIDTH_EXCESS})`;
};
