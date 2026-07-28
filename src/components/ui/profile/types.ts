import type { LucideIcon } from 'lucide-react';

export type TabType = 'status' | 'params' | 'equipment';

export interface Capability {
  name: string;
  icon: LucideIcon;
  color: string;
}

export interface EquipmentItem {
  label: string;
  value: string;
}

export interface GithubCommitSearchResponse {
  total_count: number;
}
