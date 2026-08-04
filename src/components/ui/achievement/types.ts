/**
 * Tingkat kompetisi. Dipakai untuk menentukan urutan tampil dan penekanan visual,
 * karena "juara di tingkat nasional" dan "juara di tingkat kampus" bukan sinyal
 * yang setara dan tidak boleh terlihat setara.
 */
export type AchievementLevel = 'Internasional' | 'Nasional' | 'Regional' | 'Universitas';

/** Bobot urutan tampil per tingkat: makin besar makin didahulukan. */
export const LEVEL_WEIGHT: Readonly<Record<AchievementLevel, number>> = {
  Internasional: 4,
  Nasional: 3,
  Regional: 2,
  Universitas: 1,
};

/** Satu capaian atau penghargaan eksternal. */
export interface Achievement {
  /** Nama penghargaan/posisi yang diraih, mis. "Juara 2". */
  award: string;
  /** Nama kompetisi atau program. */
  competition: string;
  /** Pihak penyelenggara. Kredibilitas penyelenggara adalah bagian dari nilai penghargaan. */
  organizer: string;
  year: string;
  level: AchievementLevel;
  /** Apa yang dibuat/dikerjakan sehingga penghargaan itu diraih. */
  description: string;
  /** Jumlah peserta atau tim, bila diketahui. Memberi konteks tingkat kesulitan. */
  participants?: string;
  /** Teknologi atau bidang yang terlibat. */
  tags?: readonly string[];
}
