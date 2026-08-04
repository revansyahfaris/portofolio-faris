/** Satu layanan inti yang ditawarkan studio. */
export interface StudioService {
  /** Nomor urut bergaya kode layanan, mis. "S-01". */
  code: string;
  name: string;
  description: string;
  /** Contoh keluaran konkret yang diterima klien. Menghilangkan ambiguitas soal cakupan kerja. */
  deliverables: readonly string[];
}

/** Satu tahap dalam alur kerja proyek. */
export interface WorkflowStep {
  step: string;
  name: string;
  description: string;
  /** Perkiraan durasi tahap. Membantu klien menakar jadwal sejak awal. */
  duration: string;
}

/** Profil studio/agensi. */
export interface StudioProfile {
  brand: string;
  tagline: string;
  /** Posisi profesional dalam satu paragraf: untuk siapa dan mengapa berbeda. */
  positioning: string;
  vision: string;
  mission: readonly string[];
  services: readonly StudioService[];
  /** Kategori klien yang dilayani, bukan nama klien (nama butuh izin). */
  clientCategories: readonly string[];
  workflow: readonly WorkflowStep[];
  /** Angka ringkas yang membangun kepercayaan. */
  proofPoints: readonly { value: string; label: string }[];
}
