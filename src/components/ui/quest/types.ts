/** Kategori proyek, dipakai sebagai penanda jenis pekerjaan pada daftar quest. */
export type QuestCategory =
  | 'Full-Stack Web'
  | 'Computer Vision'
  | 'Embedded System'
  | 'UI/UX Design';

/** Tautan keluar milik sebuah proyek. */
export interface QuestLinks {
  /** Demo yang bisa dicoba langsung. Paling berpengaruh terhadap penilaian, jadi ditampilkan pertama. */
  demo?: string;
  repository?: string;
  /** Tulisan panjang yang menguraikan proses pengerjaan. */
  caseStudy?: string;
  /** Berkas desain, bila proyeknya berupa perancangan antarmuka. */
  design?: string;
}

/** Satu proyek pada arsip Quest. */
export interface Quest {
  /** Kode proyek bergaya penomoran misi. */
  code: string;
  title: string;
  /** Satu kalimat yang menjelaskan proyek ini apa, tanpa jargon. */
  tagline: string;
  category: QuestCategory;
  year: string;
  /** Status pengerjaan, memberi konteks kalau proyek belum selesai. */
  status: 'Selesai' | 'Berjalan' | 'Purwarupa';
  /** Masalah yang ingin dipecahkan. Bagian ini yang membuat proyek terasa punya alasan. */
  problem: string;
  /** Pendekatan yang diambil untuk memecahkannya. */
  solution: string;
  /** Fitur utama, ditulis singkat karena akan dibaca sebagai daftar. */
  features: readonly string[];
  technologies: readonly string[];
  /** Tangkapan layar. Dikosongkan bila belum ada gambar yang layak ditampilkan. */
  image?: string;
  /** Teks alternatif gambar, wajib diisi bila image ada. */
  imageAlt?: string;
  links: QuestLinks;
}
