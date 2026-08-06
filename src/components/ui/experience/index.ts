// File: src/components/ui/experience/index.ts

export { EXPERIENCES } from './constants';
export { XP, FIELD } from './palette';
export { ArcTitle } from './ArcTitle';
export { DesignFrame } from './DesignFrame';
export { FieldEllipse } from './FieldEllipse';
export { PortraitTrack } from './PortraitTrack';
export { RoleBanner } from './RoleBanner';
export { EntryDetails } from './EntryDetails';
export { DetailButton } from './DetailButton';
export { EntryPager } from './EntryPager';
export { EntryNumber } from './EntryNumber';
export { EntrySlide } from './EntrySlide';
export { useArcSwap } from './useArcSwap';
export type { SwapPhase } from './useArcSwap';
export { SLIDE, PIVOT, SWEEP_DEGREES, SWEEP_SCALE, DEBUG_ARC_MOTION } from './motion';

// 📍 TAMBAHKAN BARIS INI:
export { ArcMotionDebug } from './ArcMotionDebug';

export { CANVAS, ux, uy, pct, toX, toY, rectStyle, elasticRectStyle } from './canvas';
export type { CanvasRect } from './canvas';
export { toTransform, toOrigin } from './transform';
export type { ShapeTransform } from './transform';
export type { ArcLetter } from './ArcTitle';
export type { ExperienceEntry, EmploymentType, ImpactMetric } from './types';

export { ExperienceDetail } from './ExperienceDetail';
export { RankCard } from './RankCard';