import type { LucideIcon } from 'lucide-react';

/** Tab yang tersedia pada TopNav/TabContentCard di ProfileSection. */
export type TabType = 'status' | 'params' | 'equipment';

/** Satu kemampuan/keahlian yang ditampilkan sebagai badge pada tab "status". */
export interface Capability {
  name: string;
  icon: LucideIcon;
  color: string;
}

/** Satu baris item pada tab "equipment" (nama alat dan keterangannya). */
export interface EquipmentItem {
  label: string;
  value: string;
}

/** Bentuk respons dari GitHub Search Commits API yang dipakai untuk menghitung jumlah commit. */
export interface GithubCommitSearchResponse {
  total_count: number;
}
