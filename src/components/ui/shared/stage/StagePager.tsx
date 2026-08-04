import { memo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CLIP, STAGE, TYPE } from './theme';

interface StagePagerProps {
  readonly count: number;
  readonly activeIndex: number;
  readonly pageLabel: string;
  readonly onPrev: () => void;
  readonly onNext: () => void;
  /** Kata benda yang dipakai pada label tombol, mis. "Pengalaman", "Proyek". */
  readonly itemNoun: string;
}

/**
 * Navigasi halaman untuk section satu layar.
 *
 * Keberadaannya bukan hiasan. Pada tata letak satu layar, sebagian besar isi memang
 * tersembunyi di balik pilihan, sehingga pengunjung harus bisa melihat ada berapa
 * banyak entri seluruhnya. Tanpa penomoran "02 / 04", tidak ada apa pun di layar
 * yang memberi tahu bahwa masih ada yang lain — dan yang tidak diketahui
 * keberadaannya tidak akan pernah dibuka.
 *
 * Tombolnya tidak memindahkan fokus papan ketik ke daftar pilihan. Bila fokus ikut
 * berpindah, tombol yang baru ditekan kehilangan fokus dan tidak bisa ditekan
 * berulang — masalah yang hanya muncul saat dicoba tanpa tetikus.
 *
 * Deret penanda halaman diberi aria-hidden karena statusnya sudah disampaikan oleh
 * atribut aria-selected pada pola tab; mengumumkannya dua kali membingungkan.
 */
export const StagePager = memo(function StagePager({
  count,
  activeIndex,
  pageLabel,
  onPrev,
  onNext,
  itemNoun,
}: StagePagerProps) {
  const buttonStyle = {
    backgroundColor: STAGE.primary,
    color: STAGE.ink,
    clipPath: CLIP.cut,
  };

  return (
    <footer className="flex items-center gap-3">
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={onPrev}
          aria-label={`${itemNoun} sebelumnya`}
          className="flex h-8 w-9 items-center justify-center transition-opacity duration-150 hover:opacity-75"
          style={{ ...buttonStyle, transform: 'scaleX(-1)' }}
        >
          <ChevronLeft aria-hidden size={16} style={{ transform: 'scaleX(-1)' }} />
        </button>
        <button
          type="button"
          onClick={onNext}
          aria-label={`${itemNoun} berikutnya`}
          className="flex h-8 w-9 items-center justify-center transition-opacity duration-150 hover:opacity-75"
          style={buttonStyle}
        >
          <ChevronRight aria-hidden size={16} />
        </button>
      </div>

      <span
        className="font-serif font-black leading-none tabular-nums"
        style={{ fontSize: TYPE.lead, color: STAGE.paper }}
      >
        {pageLabel}
      </span>

      {/* Penanda halaman berbentuk baji, bukan garis persegi: yang aktif memanjang
          sekaligus meruncing ke kanan, memberi arah baca. */}
      <div aria-hidden className="flex flex-1 items-center gap-1.5">
        {Array.from({ length: count }, (_, index) => {
          const isActive = index === activeIndex;
          return (
            <span
              key={index}
              className={isActive ? 'stage-pulse' : undefined}
              style={{
                display: 'block',
                height: '5px',
                flex: isActive ? '0 0 52px' : '0 0 16px',
                backgroundColor: isActive ? STAGE.accent : STAGE.paper,
                opacity: isActive ? 1 : 0.22,
                clipPath: isActive ? 'polygon(0 0, 100% 0, 88% 100%, 0 100%)' : undefined,
                transform: 'skewX(-28deg)',
                transition: 'flex-basis 220ms ease-out',
              }}
            />
          );
        })}
      </div>
    </footer>
  );
});
