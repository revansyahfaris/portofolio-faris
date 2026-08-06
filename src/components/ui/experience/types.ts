/** Jenis ikatan kerja, dipakai untuk badge kecil di samping nama perusahaan. */
export type EmploymentType =
  | 'Internship'
  | 'Founder'
  | 'Freelance'
  | 'Part-time'
  | 'Organization'
  | 'Research'
  | 'Intern'
  ;

/** Satu angka dampak yang bisa diverifikasi, bukan klaim kualitatif. */
export interface ImpactMetric {
  /** Nilai ringkas, mis. "40%", "12", "3x". */
  value: string;
  /** Arti angka tersebut dalam satu frasa pendek. */
  label: string;
}

/** Satu entri pengalaman profesional atau organisasi. */
export interface ExperienceEntry {
  /** Penomoran bergaya "rank" mengikuti bahasa visual situs. */
  rank: string;
  /** Jabatan. Ditampilkan paling besar karena inilah yang pertama dicari perekrut. */
  role: string;
  /** Nama perusahaan, klien, atau organisasi. */
  company: string;
  employmentType: EmploymentType;
  /** Rentang waktu dalam format yang bisa dibaca manusia, mis. "Jul 2025 - Aug 2025". */
  period: string;
  /** Format ISO (YYYY-MM) untuk atribut dateTime pada elemen <time>. */
  startISO: string;
  /** Format ISO (YYYY-MM) akhir. Dikosongkan jika masih berjalan. */
  endISO?: string;
  location: string;
  /**
   * Nama proyek atau fokus kerja, sependek mungkin. Mis. "Chatbot AI-LLM Project".
   *
   * Dipisah dari `summary` dan bukan dipotong darinya. Keduanya menjawab
   * pertanyaan yang berbeda: `project` menjawab "sedang mengerjakan APA",
   * `summary` menjawab "apa yang dilakukan di sana". Yang pertama muat di satu
   * baris besar dan langsung terbaca; yang kedua sebuah kalimat utuh yang akan
   * tampak janggal bila dipaksa masuk ke posisi judul.
   */
  project: string;
  /** Ringkasan satu kalimat tentang lingkup tanggung jawab. */
  summary: string;
  /** Rincian tanggung jawab. Ditulis diawali kata kerja, maksimal tiga butir agar tetap terpindai. */
  responsibilities: readonly string[];
  /** Angka dampak. Kosongkan bila belum ada data yang jujur untuk ditampilkan. */
  metrics: readonly ImpactMetric[];
  /** Teknologi/tool yang benar-benar dipakai di peran ini. */
  stack: readonly string[];
}
