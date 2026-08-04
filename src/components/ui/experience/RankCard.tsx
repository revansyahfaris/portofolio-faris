import { memo } from 'react';
import { CLIP, Panel, STAGE, TYPE } from '../shared/stage';
import type { ExperienceEntry } from './types';

interface RankCardProps {
  readonly entry: ExperienceEntry;
  readonly index: number;
  readonly isActive: boolean;
  readonly onSelect: (index: number) => void;
}

/**
 * Satu kartu pada rel pemilih Experience.
 *
 * Siluetnya jajar genjang penuh — tidak ada satu pun sudut siku — dan kartunya
 * digeser mendatar sebanding dengan urutannya sehingga keempatnya membentuk tangga
 * diagonal. Pergeseran dihitung dari indeks, bukan ditulis manual per kartu, agar
 * menambah entri baru tidak menuntut penyesuaian apa pun.
 *
 * Tidak ada garis tepi sama sekali. Garis tepi adalah penanda paling kuat bahwa
 * sebuah elemen adalah kotak, dan clip-path memotong border CSS mengikuti bentuk
 * persegi aslinya sehingga hasilnya justru rusak. Pembeda antara kartu aktif dan
 * tidak aktif seluruhnya dikerjakan oleh warna isi dan bayangan cetak.
 */
export const RankCard = memo(function RankCard({
  entry,
  index,
  isActive,
  onSelect,
}: RankCardProps) {
  return (
    <button
      type="button"
      role="tab"
      id={`exp-tab-${index}`}
      aria-selected={isActive}
      aria-controls="exp-panel"
      tabIndex={isActive ? 0 : -1}
      onClick={() => onSelect(index)}
      className="block w-full text-left transition-transform duration-200 ease-out"
      style={{
        transform: isActive
          ? `translate3d(${index * 18 + 22}px, 0, 0) scale(1.03)`
          : `translate3d(${index * 18}px, 0, 0)`,
      }}
    >
      <Panel
        clip={CLIP.blade}
        fill={isActive ? STAGE.primary : 'rgba(25,227,177,0.10)'}
        shadow={isActive ? STAGE.accent : undefined}
        offset={8}
        innerClassName="flex items-center gap-3 px-4 py-2"
      >
        <span
          className="shrink-0 font-serif font-black leading-none"
          style={{
            fontSize: 'clamp(1.4rem, 3.3vh, 2.3rem)',
            color: isActive ? STAGE.accent : STAGE.primary,
          }}
        >
          {entry.rank}
        </span>

        <span className="min-w-0 flex-1">
          <span
            className="block truncate font-serif font-black uppercase leading-tight tracking-tight"
            style={{ fontSize: TYPE.small, color: isActive ? STAGE.ink : STAGE.paper }}
          >
            {entry.role}
          </span>
          <span
            className="block truncate font-mono uppercase tracking-wider"
            style={{
              fontSize: TYPE.micro,
              color: isActive ? STAGE.ink : STAGE.paper,
              opacity: isActive ? 0.7 : 0.5,
            }}
          >
            {entry.company}
          </span>
        </span>

        {isActive && (
          <span
            aria-hidden
            className="h-3 w-3 shrink-0"
            style={{ backgroundColor: STAGE.accent, clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}
          />
        )}
      </Panel>
    </button>
  );
});
