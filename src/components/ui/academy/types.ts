/** Kelompok mata kuliah relevan, dikelompokkan per bidang agar tidak jadi satu daftar panjang. */
export interface CourseworkGroup {
  /** Nama bidang, mis. "Sistem & Jaringan". */
  area: string;
  courses: readonly string[];
}

/** Peran akademik di luar perkuliahan reguler: asisten, laboratorium, riset. */
export interface AcademicRole {
  title: string;
  /** Unit/lab/mata kuliah tempat peran ini dijalankan. */
  scope: string;
  period: string;
  description: string;
}

/** Proyek akademik besar yang layak disebut terpisah dari daftar Quest. */
export interface AcademicProject {
  title: string;
  course: string;
  description: string;
  stack: readonly string[];
}

/** Data pendidikan formal. */
export interface AcademyProfile {
  university: string;
  faculty: string;
  major: string;
  degree: string;
  period: string;
  startISO: string;
  endISO?: string;
  location: string;
  /** IPK. Dikosongkan bila tidak ingin ditampilkan — tidak semua konteks lamaran membutuhkannya. */
  gpa?: string;
  gpaScale?: string;
  /** Ringkasan fokus studi dalam satu kalimat. */
  focus: string;
  coursework: readonly CourseworkGroup[];
  roles: readonly AcademicRole[];
  projects: readonly AcademicProject[];
}
