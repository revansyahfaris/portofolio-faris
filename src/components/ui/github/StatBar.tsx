import { memo } from 'react';
import { STAGE, TYPE } from '../shared/stage';

interface StatBarProps {
  readonly label: string;
  readonly value: string;
  /** Porsi terisi, 0 sampai 1. */
  readonly ratio: number;
  readonly color?: string;
}

/** Jumlah petak pada satu batang. Petak, bukan bilah mulus — inilah yang membuatnya terbaca sebagai statistik permainan. */
const SEGMENTS = 14;

/**
 * Satu baris statistik bergaya lembar atribut karakter.
 *
 * Batangnya dipecah menjadi petak-petak miring, bukan digambar sebagai satu bilah
 * mulus. Perbedaannya bukan sekadar gaya: petak membuat besaran dapat dihitung
 * dengan melirik ("sembilan dari empat belas") tanpa perlu membaca angkanya, dan
 * itu persis fungsi yang diemban bilah statistik pada layar status permainan.
 *
 * Porsi terisi tetap disertai angka aslinya. Batang saja tidak pernah cukup —
 * pembaca layar tidak menangkapnya, dan tanpa angka pembaca sighted pun hanya tahu
 * perbandingan relatif tanpa tahu nilai sebenarnya.
 */
export const StatBar = memo(function StatBar({
  label,
  value,
  ratio,
  color = STAGE.primary,
}: StatBarProps) {
  const filled = Math.max(1, Math.round(Math.min(Math.max(ratio, 0), 1) * SEGMENTS));

  return (
    <div className="flex items-center gap-3">
      <span
        className="w-[13ch] shrink-0 font-mono font-black uppercase tracking-[0.18em]"
        style={{ fontSize: TYPE.micro, color: STAGE.paper, opacity: 0.65 }}
      >
        {label}
      </span>

      <span aria-hidden className="flex min-w-0 flex-1 gap-[3px]">
        {Array.from({ length: SEGMENTS }, (_, i) => (
          <span
            key={i}
            className="h-[10px] flex-1"
            style={{
              backgroundColor: i < filled ? color : 'rgba(242,247,244,0.1)',
              clipPath: 'polygon(22% 0, 100% 0, 78% 100%, 0 100%)',
            }}
          />
        ))}
      </span>

      <span
        className="w-[6ch] shrink-0 text-right font-serif font-black tabular-nums leading-none"
        style={{ fontSize: TYPE.lead, color }}
      >
        {value}
      </span>
    </div>
  );
});
