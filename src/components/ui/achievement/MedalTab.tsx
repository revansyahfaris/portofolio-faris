import { memo } from 'react';
import { CLIP, Panel, STAGE, TYPE } from '../shared/stage';
import type { Achievement } from './types';

interface MedalTabProps {
  readonly achievement: Achievement;
  readonly index: number;
  readonly isActive: boolean;
  readonly onSelect: (index: number) => void;
}

/**
 * Kartu pemilih pada rel Achievement.
 *
 * Sengaja dibuat kecil dan padat — hanya sebutan penghargaan dan tahun — karena
 * seluruh uraiannya sudah ditampilkan di panel besar. Kartu pemilih yang ikut
 * memuat rincian membuat layar berisi dua salinan informasi yang sama dan
 * menghabiskan ruang yang justru dibutuhkan panel utamanya.
 */
export const MedalTab = memo(function MedalTab({
  achievement,
  index,
  isActive,
  onSelect,
}: MedalTabProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-controls="ach-panel"
      tabIndex={isActive ? 0 : -1}
      onClick={() => onSelect(index)}
      className="block w-full text-left transition-transform duration-200 ease-out"
      style={{
        transform: isActive
          ? `translate3d(${index * 15 + 20}px, 0, 0) scale(1.03)`
          : `translate3d(${index * 15}px, 0, 0)`,
      }}
    >
      <Panel
        clip={CLIP.blade}
        fill={isActive ? STAGE.highlight : 'rgba(25,227,177,0.09)'}
        shadow={isActive ? STAGE.accent : undefined}
        offset={8}
        innerClassName="flex items-center gap-3 px-4 py-2"
      >
        <span
          className="shrink-0 font-serif font-black leading-none tabular-nums"
          style={{
            fontSize: 'clamp(1.05rem, 2.7vh, 1.7rem)',
            color: isActive ? STAGE.accent : STAGE.primary,
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        <span className="min-w-0 flex-1">
          <span
            className="block truncate font-serif font-black uppercase leading-tight tracking-tight"
            style={{ fontSize: TYPE.small, color: isActive ? STAGE.ink : STAGE.paper }}
          >
            {achievement.award}
          </span>
          <span
            className="block truncate font-mono uppercase tracking-wider"
            style={{
              fontSize: TYPE.micro,
              color: isActive ? STAGE.ink : STAGE.paper,
              opacity: isActive ? 0.68 : 0.5,
            }}
          >
            {achievement.level} · {achievement.year}
          </span>
        </span>
      </Panel>
    </button>
  );
});
