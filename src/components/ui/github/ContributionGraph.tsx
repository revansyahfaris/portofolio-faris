import { memo, useMemo } from 'react';
import { STAGE } from '../shared/stage';
import type { ContributionDay } from '@/lib/github/types';

interface ContributionGraphProps {
  readonly days: readonly ContributionDay[];
  readonly total: number;
}

/** Ukuran satu kotak hari dan jarak antar kotak, dalam satuan koordinat SVG. */
const CELL = 11;
const GAP = 3;
const STEP = CELL + GAP;

/**
 * Warna per tingkat intensitas.
 *
 * Tingkat 0 memakai warna gelap, bukan transparan, supaya kerangka kalender tetap
 * terbaca sebagai kisi utuh. Tanpa itu, minggu-minggu tanpa aktivitas akan tampak
 * seperti bagian grafik yang gagal dimuat.
 */
const LEVEL_FILL: Record<ContributionDay['level'], string> = {
  0: 'rgba(242,247,244,0.07)',
  1: 'rgba(25,227,177,0.28)',
  2: 'rgba(25,227,177,0.55)',
  3: STAGE.primary,
  4: STAGE.highlight,
};

/** Setiap kotak dipangkas dua sudutnya agar kisinya tidak terbaca sebagai tabel. */
const CELL_CLIP_OFFSET = 3;

const WEEKDAY_LABELS = ['Sen', 'Rab', 'Jum'];
/** Baris yang diberi label. Memberi label pada ketujuh baris membuat sumbu penuh sesak. */
const LABELLED_ROWS = [1, 3, 5];

interface GraphCell {
  key: string;
  x: number;
  y: number;
  level: ContributionDay['level'];
  count: number;
  date: string;
}

/**
 * Kalender kontribusi setahun terakhir.
 *
 * Digambar sebagai satu elemen SVG, bukan ratusan <div>. Kalender berisi sekitar
 * 371 kotak; bila tiap kotak menjadi elemen DOM tersendiri, biaya layout dan memori
 * naik jauh lebih besar daripada satu pohon SVG yang dirender sekali.
 *
 * Posisi kotak dihitung dari tanggalnya, bukan dari indeks dibagi tujuh, karena
 * minggu pertama dan terakhir pada kalender GitHub hampir selalu tidak genap tujuh
 * hari. Menghitung dari indeks akan menggeser seluruh grafik.
 *
 * Untuk pembaca layar, grafik diberi role="img" dengan ringkasan angka. Membacakan
 * 371 kotak satu per satu tidak menyampaikan informasi apa pun yang berguna.
 */
export const ContributionGraph = memo(function ContributionGraph({
  days,
  total,
}: ContributionGraphProps) {
  const { cells, columns } = useMemo<{ cells: GraphCell[]; columns: number }>(() => {
    if (days.length === 0) return { cells: [], columns: 0 };

    const firstWeekday = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();

    const mapped = days.map((day, index) => {
      const absolute = index + firstWeekday;
      return {
        key: day.date,
        x: Math.floor(absolute / 7) * STEP,
        y: (absolute % 7) * STEP,
        level: day.level,
        count: day.count,
        date: day.date,
      };
    });

    const lastColumn = Math.floor((days.length - 1 + firstWeekday) / 7);
    return { cells: mapped, columns: lastColumn + 1 };
  }, [days]);

  if (cells.length === 0) return null;

  const width = columns * STEP;
  const height = 7 * STEP;

  return (
    <div className="flex gap-2">
      {/* Label hari diletakkan di luar SVG agar tetap menyesuaikan ukuran font
          pengguna, sedangkan grafiknya menskala mengikuti lebar. */}
      <div
        aria-hidden
        className="hidden flex-col justify-between py-[2px] font-mono text-[8px] sm:flex"
        style={{ height: `${height}px`, color: STAGE.paper, opacity: 0.4 }}
      >
        {LABELLED_ROWS.map((row, i) => (
          <span key={row}>{WEEKDAY_LABELS[i]}</span>
        ))}
      </div>

      <div className="min-w-0 grow overflow-x-auto">
        <svg
          role="img"
          aria-label={`Kalender kontribusi GitHub setahun terakhir, total ${total} kontribusi.`}
          viewBox={`0 0 ${width} ${height}`}
          className="h-auto w-full min-w-[560px]"
          preserveAspectRatio="xMinYMin meet"
        >
          {cells.map((cell) => (
            <polygon
              key={cell.key}
              points={`${cell.x + CELL_CLIP_OFFSET},${cell.y} ${cell.x + CELL},${cell.y} ${cell.x + CELL - CELL_CLIP_OFFSET},${cell.y + CELL} ${cell.x},${cell.y + CELL}`}
              fill={LEVEL_FILL[cell.level]}
            >
              {/* Tooltip bawaan browser hanya dipasang pada hari yang ada
                  aktivitasnya, agar jumlah node teks tidak membengkak. */}
              {cell.count > 0 && <title>{`${cell.count} kontribusi pada ${cell.date}`}</title>}
            </polygon>
          ))}
        </svg>
      </div>
    </div>
  );
});
