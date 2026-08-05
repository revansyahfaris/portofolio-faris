// Titik ekspor terpusat (barrel export) untuk komponen ProfileSection.
// Komponen kecil yang hanya dipakai secara internal antar file di folder ini
// (SectionCard, CapabilityBadge, EquipmentCard, MetricCard, GpaCard, TechItem)
// sengaja tidak diekspor ulang di sini, dan diimpor langsung dari file aslinya.
export { FlameBackground } from './FlameBackground';
export { Banner3D } from './Banner3D';
export { CharacterPhoto } from './CharacterPhoto';
export { FlameFlareForeground } from './FlameFlareForeground';
export { BackgroundWatermark } from './BackgroundWatermark';
export { SectionFooter } from './SectionFooter';
export { TopNav } from './TopNav';
export { IdentityCard } from './IdentityCard';
export { TabContentCard } from './TabContentCard';
export { DegreeCard } from './DegreeCard';
export { MetricsCard } from './MetricsCard';
/** SEMENTARA — alat ukur, hapus bersama perfFlags.ts. */
export { FlamesToggle } from './FlamesToggle';
export type { TabType } from './types';
