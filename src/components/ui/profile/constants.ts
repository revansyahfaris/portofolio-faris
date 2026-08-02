import { Shield, Zap, Sword, Terminal, Cpu, Layers } from 'lucide-react';
import { portofolioConfig } from '../../../config/portofolioConfig';
import type { Capability, EquipmentItem, TabType } from './types';

// Data statis yang ditampilkan di ProfileSection. Dipusatkan di sini agar
// isi konten (capability, tech stack, equipment) mudah diubah tanpa
// menyentuh logika komponen.

export const MAX_GPA = 4.0;
export const FALLBACK_COMMIT_COUNT = 1250;
export const DEFAULT_GITHUB_USERNAME = 'revansyahfaris';

export const TABS: readonly TabType[] = ['status', 'params', 'equipment'];

export const TAB_LABELS: Record<TabType, string> = {
  status: 'STATUS',
  params: 'TECH STACK',
  equipment: 'EQUIPMENT',
};

export const CAPABILITIES: readonly Capability[] = [
  { name: 'UI/UX Design', icon: Sword, color: 'border-emerald-400 text-emerald-400' },
  { name: 'Frontend Dev', icon: Zap, color: 'border-cyan-400 text-cyan-400' },
  { name: 'Backend Dev', icon: Shield, color: 'border-teal-400 text-teal-400' },
  { name: 'AI Engineer', icon: Cpu, color: 'border-amber-400 text-amber-400' },
  { name: 'Graphic Designer', icon: Layers, color: 'border-emerald-400 text-emerald-300' },
  { name: 'Embedded Eng.', icon: Terminal, color: 'border-cyan-300 text-cyan-300' },
];

export const TECH_STACK: readonly string[] = [
  'React / Next.js',
  'Laravel & Express',
  'ASP.NET C#',
  'MySQL & Relational',
  'Tailwind & Figma',
  'C++ / Embedded',
];

export const EQUIPMENT: readonly EquipmentItem[] = [
  { label: 'IDE / DESIGN', value: 'VS Code, Figma, Visual Studio' },
  { label: 'HARDWARE KIT', value: 'ESP32, STM32, Logic Analyzer' },
];

// portofolioConfig adalah import statis (module-level), jadi kalkulasi GPA
// cukup sekali saat module di-load, bukan setiap render komponen.
export const CURRENT_GPA = parseFloat(portofolioConfig.personal.gpa || '0');
export const GPA_PERCENTAGE = Math.min((CURRENT_GPA / MAX_GPA) * 100, 100);
