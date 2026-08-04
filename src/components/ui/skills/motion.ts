// File: src/components/ui/skills/motion.ts

/**
 * Seluruh waktu dan kurva transisi buka-tutup Skills, terkumpul di satu tempat.
 *
 * Dikumpulkan bukan demi kerapian melainkan karena gerakannya BERANTAI: kipas
 * berputar, bidang merah naik menyusul, teks mengambang menyusul lagi. Setiap
 * jeda dihitung dari gerakan sebelumnya. Bila angkanya tersebar di lima berkas,
 * memperlambat satu gerakan berarti menelusuri sisanya satu per satu untuk
 * menutup celah yang muncul — dan celah setengah detik di tengah rangkaian
 * langsung terbaca sebagai patah, bukan sebagai jeda yang disengaja.
 */

/**
 * Perputaran kipas saat membuka, dalam derajat.
 *
 * Negatif berarti berlawanan arah jarum jam. Kecil saja — kipas hanya perlu
 * "bergeming" sebelum tenggelam, bukan berputar penuh. Porosnya titik hilang
 * yang sama dengan susunan kipasnya, sehingga ketiganya berputar sebagai satu
 * benda dan sudut antarbidangnya tidak berubah.
 */
export const FAN_TURN_DEG = -6;

/** Jarak awal teks Core Skills di bawah tempat akhirnya, dalam vh. */
export const CORE_RISE_VH = 14;

/**
 * Seberapa jauh nama teknologi menukik turun saat berganti, dalam vh.
 *
 * Jauh lebih besar daripada CORE_DIP_VH dengan sengaja. Nama teknologi adalah
 * judulnya — ia yang harus terlihat benar-benar PERGI dan DIGANTI. Daftar di
 * bawahnya hanya perlu ikut bergeming secukupnya supaya terbaca sebagai satu
 * kesatuan yang berganti, bukan sebagai dua hal yang kebetulan bergerak.
 * Menyamakan keduanya membuat seluruh layar bergoyang seperti gempa.
 */
export const TECH_DIP_VH = 7;

/** Seberapa jauh daftar Core Skills ikut menukik saat teknologi berganti. */
export const CORE_DIP_VH = 3;

const EASE = {
  /** Melandai wajar. Untuk perputaran kipas yang harus terasa sigap. */
  quick: 'cubic-bezier(0.33, 1, 0.68, 1)',
  /**
   * Kecepatan awal sangat besar lalu mengendap panjang.
   *
   * Inilah kurva air pasang: bidang merah melompat naik hampir sampai dalam
   * sepertiga waktu pertama, sisanya hanya mengendap. Kurva linear akan terbaca
   * sebagai panel yang digeser mesin, bukan sebagai massa yang punya momentum.
   */
  flood: 'cubic-bezier(0.16, 1, 0.3, 1)',
  /** Melandai lembut. Untuk teks yang mengambang naik tanpa terburu-buru. */
  gentle: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
} as const;

interface Step {
  readonly duration: number;
  readonly delay: number;
}

export interface Move {
  readonly enter: Step;
  readonly exit: Step;
  readonly ease: string;
}

/**
 * Jeda masuk disusun agar setiap gerakan mulai SEBELUM gerakan sebelumnya
 * selesai. Menunggu benar-benar selesai akan menyisakan celah mati; tumpang
 * tindih sedikit membuat rangkaiannya terbaca sebagai satu gerakan beruntun.
 *
 * Jeda keluar dibalik urutannya — teks pergi lebih dulu, kipas terakhir —
 * sehingga menutup terasa seperti membuka yang diputar mundur, bukan seperti
 * rangkaian kedua yang kebetulan mirip.
 */
export const MOTION = {
  fan: {
    enter: { duration: 200, delay: 0 },
    exit: { duration: 220, delay: 180 },
    ease: EASE.quick,
  },
  panel: {
    enter: { duration: 360, delay: 120 },
    exit: { duration: 300, delay: 60 },
    ease: EASE.flood,
  },
  core: {
    enter: { duration: 520, delay: 400 },
    exit: { duration: 180, delay: 0 },
    ease: EASE.gentle,
  },

  /**
   * Pergantian teknologi. "enter" adalah saat naik kembali, "exit" saat menukik.
   *
   * Naik dibuat lebih lama daripada turun dengan sengaja. Yang lama tidak perlu
   * dipandangi — ia hanya perlu minggir. Yang baru justru harus sempat terbaca
   * saat datang. Menyamakan keduanya membuat pergantiannya terasa seperti
   * kedipan, bukan seperti serah terima.
   */
  techSwap: {
    enter: { duration: 340, delay: 0 },
    exit: { duration: 190, delay: 0 },
    ease: EASE.gentle,
  },
  coreSwap: {
    enter: { duration: 420, delay: 60 },
    exit: { duration: 190, delay: 0 },
    ease: EASE.gentle,
  },

  /**
   * Perpindahan lembar kipas antar slot.
   *
   * Simetris — masuk dan keluar sama, karena bagi sebuah lembar tidak ada beda
   * antara "datang" dan "pergi": ia hanya berpindah slot, dan slot mana yang
   * kebetulan berada di luar layar bukan urusannya.
   */
  sheet: {
    enter: { duration: 420, delay: 0 },
    exit: { duration: 420, delay: 0 },
    ease: EASE.quick,
  },
} as const satisfies Record<string, Move>;

/**
 * Transisi untuk seluruh properti yang berubah saat lembar berpindah slot.
 *
 * Warna ikut ditransisikan, bukan diganti seketika. Bidang tengah memakai merah
 * terang dan tetangganya merah biasa; tanpa transisi, lembar yang berpindah dari
 * tengah akan berkedip ganti warna di tengah gerakannya, dan kedipan itu
 * mematahkan kesan bahwa yang bergerak adalah satu benda yang sama.
 */
export const SHEET_TRANSITION = ['top', 'transform', 'background-color', 'right', 'color', 'opacity']
  .map((property) => `${property} ${MOTION.sheet.enter.duration}ms ${MOTION.sheet.ease}`)
  .join(', ');

/**
 * Durasi peleburan warna HURUF, dipisah dari durasi perpindahan lembar.
 *
 * Jauh lebih pendek, dan itu justru untuk menyamakan yang TERLIHAT alih-alih
 * yang tertulis. Kotak pada huruf ber-invert dan huruf polos sebenarnya menempuh
 * perjalanan warna yang sama, putih ke hitam, dalam waktu yang sama. Tetapi
 * bidang pejal terbaca sudah "sampai" jauh lebih awal daripada guratan huruf
 * tipis di atas merah, yang masih tampak ragu-ragu di pertengahan.
 *
 * Menyamakan angkanya karena itu justru membuat keduanya terasa berbeda.
 * Memendekkan yang tipis adalah cara membuat keduanya terasa sama.
 */
export const LABEL_TINT_MS = 50;

export const LABEL_TINT_TRANSITION = ['color', 'opacity']
  .map((property) => `${property} ${LABEL_TINT_MS}ms ${EASE.quick}`)
  .join(', ');

/**
 * Saat bintang keadaan terbuka mulai tampak: tepat ketika bidang merah mendarat.
 *
 * Sengaja potongan tegas lewat `visibility`, bukan peleburan lewat `opacity`.
 * Nilai opacity di bawah 1 membentuk batas isolasi, dan bintang-bintang itu
 * seluruhnya bergantung pada mix-blend-mode terhadap bidang di belakangnya —
 * meleburkannya akan mematikan pembauran selama animasi berlangsung lalu
 * menyalakannya kembali di akhir, dan kedipan itu jauh lebih terlihat daripada
 * potongan tegas yang jatuh bersamaan dengan mendaratnya bidang merah.
 */
export const OPEN_STARS_CUT = {
  enter: MOTION.panel.enter.delay + MOTION.panel.enter.duration,
  exit: 0,
} as const;

/** Merangkai satu deklarasi transition CSS untuk arah yang sedang berlaku. */
export const transition = (property: string, move: Move, isOpen: boolean): string => {
  const step = isOpen ? move.enter : move.exit;
  return `${property} ${step.duration}ms ${move.ease} ${step.delay}ms`;
};
