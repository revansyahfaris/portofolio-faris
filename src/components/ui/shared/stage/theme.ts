/**
 * Arah seni tunggal untuk seluruh section.
 *
 * Sebelumnya tiap section memakai paletnya sendiri-sendiri. Hasilnya memang
 * bervariasi, tetapi variasinya datang dari warna — cara termurah sekaligus paling
 * dangkal untuk membedakan layar. Akibatnya susunan setiap section jadi mirip
 * (persegi dimiringkan, isi di dalamnya) dan hanya warnanya yang berganti.
 *
 * Sekarang paletnya dikunci menjadi satu, dan pembeda antar section dipindahkan ke
 * tempat yang seharusnya: bentuk bidang, susunan, dan cara konten diletakkan.
 * Pembatasan ini disengaja — keterbatasan warna memaksa keputusan komposisi.
 *
 * Peran warna:
 * - ink       : hitam kehijauan, latar seluruh halaman
 * - primary   : turquoise, warna identitas dan penanda aktif
 * - accent    : merah, penekanan paling keras (satu per layar, jangan lebih)
 * - warm      : oranye, penekanan kedua dan penanda status
 * - highlight : kuning, aksen kecil dan angka
 * - paper     : putih, teks di atas bidang gelap
 *
 * Pengecualian yang disadari: SkillsSection tidak memakai STAGE untuk warna
 * dasarnya (merah dominan, bukan aksen tunggal) karena mengikuti rancangan yang
 * sudah dibuat terpisah untuk section itu — lihat komponen di ui/skills/. Ia
 * tetap memakai Panel/CLIP/TYPE dari berkas ini (keduanya tidak terikat warna)
 * dan sebagian warna STAGE (primary, highlight, warm) untuk penomoran dan
 * sorotan, sebagai satu-satunya benang yang menyambungkannya ke section lain.
 */
export const STAGE = {
  ink: '#06100D',
  inkSoft: '#0C1A16',
  primary: '#19E3B1',
  primaryDeep: '#0B8F70',
  accent: '#FF3B2D',
  warm: '#FF8A1F',
  highlight: '#FFD426',
  paper: '#F2F7F4',
} as const;

/**
 * Kumpulan siluet clip-path.
 *
 * Alasan keberadaannya: bidang persegi membuat halaman terbaca sebagai kumpulan
 * kartu, seberapa pun bidang itu dimiringkan — kemiringan hanya memutar persegi,
 * tidak mengubah bahwa siluetnya tetap empat sudut siku. Memotong sudutnya dengan
 * clip-path mengubah siluetnya secara nyata, dan siluet itulah yang pertama
 * ditangkap mata sebelum isinya terbaca.
 *
 * Dipakai lewat properti CSS clipPath. Perlu diingat: clip-path memotong juga
 * bayangan dan garis tepi CSS, sehingga bidang berclip yang butuh "bayangan cetak"
 * harus ditumpuk dua lapis — lapisan bawah berwarna aksen dan digeser, lapisan atas
 * berisi kontennya. Komponen Panel di berkas ini sudah menanganinya.
 */
export const CLIP = {
  /** Jajar genjang penuh, tanpa satu pun sudut siku. */
  blade: 'polygon(3.5% 0, 100% 0, 96.5% 100%, 0 100%)',
  /** Sudut kanan atas dan kiri bawah dipotong, meniru pelat mesin. */
  cut: 'polygon(0 0, calc(100% - 26px) 0, 100% 26px, 100% 100%, 26px 100%, 0 calc(100% - 26px))',
  /** Hanya sudut kanan atas yang dipotong, untuk panel yang menempel di kiri. */
  cutTR: 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)',
  /** Hanya sudut kiri bawah yang dipotong. */
  cutBL: 'polygon(0 0, 100% 0, 100% 100%, 24px 100%, 0 calc(100% - 24px))',
  /** Ujung kanan meruncing seperti anak panah — untuk penanda arah dan tombol. */
  arrow: 'polygon(0 0, calc(100% - 16px) 0, 100% 50%, calc(100% - 16px) 100%, 0 100%)',
  /** Pita dengan kedua ujung berlekuk masuk. */
  banner: 'polygon(0 0, 100% 0, calc(100% - 14px) 50%, 100% 100%, 0 100%, 14px 50%)',
  /** Serpihan tidak beraturan; sisi atas dan bawah tidak sejajar. */
  shard: 'polygon(0 6%, 100% 0, 97% 100%, 3% 93%)',
  /** Bidang yang menyempit ke bawah, memberi kesan menjauh. */
  taper: 'polygon(0 0, 100% 0, 93% 100%, 7% 100%)',
} as const;

/**
 * Gaya wadah untuk ilusi kedalaman.
 *
 * perspective harus dipasang pada elemen induk, bukan pada elemen yang diputar.
 * Kesalahan yang sering terjadi adalah memasang perspective pada elemen yang sama
 * dengan rotate — hasilnya bukan kedalaman melainkan sekadar bidang yang terjepit.
 *
 * Nilai 1100px dipilih cukup jauh: perspective yang terlalu dekat membuat sisi yang
 * menjauh menyusut drastis dan teks di dalamnya menjadi tidak terbaca.
 */
export const PERSPECTIVE_PARENT = {
  perspective: '1100px',
  perspectiveOrigin: '50% 50%',
} as const;

/** Ukuran huruf berbasis tinggi layar, dipakai berulang di seluruh section. */
export const TYPE = {
  micro: 'clamp(0.4rem, 0.95vh, 0.56rem)',
  tiny: 'clamp(0.45rem, 1.05vh, 0.62rem)',
  small: 'clamp(0.56rem, 1.28vh, 0.76rem)',
  body: 'clamp(0.62rem, 1.42vh, 0.84rem)',
  lead: 'clamp(0.78rem, 1.95vh, 1.1rem)',
  h3: 'clamp(1.1rem, 3.2vh, 2.1rem)',
  h2: 'clamp(1.5rem, 5vh, 3.4rem)',
  display: 'clamp(2.2rem, 8.4vh, 5.6rem)',
  giant: 'clamp(5rem, 22vh, 15rem)',
} as const;
