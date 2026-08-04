/**
 * Primitif untuk section bergaya layar menu permainan.
 *
 * Palet dan siluet bidang dikunci di theme.ts dan dipakai identik oleh seluruh
 * section. Pembeda antar section berada pada bentuk dan susunannya, bukan pada
 * warnanya — pembatasan yang disengaja, karena variasi warna adalah cara termurah
 * sekaligus paling dangkal untuk membedakan layar.
 */
export { STAGE, CLIP, TYPE, PERSPECTIVE_PARENT } from './theme';
export { Panel } from './Panel';
export { StageBackdrop } from './StageBackdrop';
export { StageTitle } from './StageTitle';
export { StagePager } from './StagePager';
export { StageTag } from './StageTag';
