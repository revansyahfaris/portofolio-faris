import { memo } from 'react';
import type { ReactNode } from 'react';
import { STAGE, TYPE } from './theme';

interface StageBackdropProps {
  /** Aksara Jepang besar yang menembus tepi layar. */
  readonly glyph: string;
  /** Sudut tempat aksara diletakkan. */
  readonly glyphCorner?: 'bl' | 'br' | 'tl' | 'tr';
  /** Teks yang berjalan pada pita bawah. */
  readonly ticker: string;
  /** Warna pita bawah. */
  readonly tickerColor?: string;
  /** Bentuk khas milik section, digambar di atas lapisan dasar bersama. */
  readonly children?: ReactNode;
}

/** Posisi aksara besar per sudut. */
const GLYPH_POSITION = {
  bl: 'bottom-[-7vh] left-[1vw]',
  br: 'bottom-[-7vh] right-[1vw]',
  tl: 'top-[-4vh] left-[1vw]',
  tr: 'top-[-4vh] right-[1vw]',
} as const;

/**
 * Lapisan latar bersama untuk seluruh section.
 *
 * Berisi hanya tiga hal yang memang sama di setiap layar: bidang dasar bertekstur,
 * aksara besar yang terpotong tepi, dan pita berjalan di dasar layar. Bentuk khas
 * tiap section diteruskan lewat children dan digambar di atasnya.
 *
 * Pemisahan ini menjawab masalah nyata: sebelumnya delapan berkas latar mengulang
 * definisi pola titik, pita berjalan, dan aksara besar dengan perbedaan yang hanya
 * warna. Delapan salinan berarti delapan tempat yang harus disunting setiap kali
 * ada perbaikan, dan sudah terbukti menyimpang satu sama lain.
 *
 * Pola titik dan kisi memakai <pattern> SVG: satu definisi dipakai ulang untuk
 * seluruh bidang, bukan ratusan elemen terpisah yang masing-masing punya biaya
 * layout sendiri.
 */
export const StageBackdrop = memo(function StageBackdrop({
  glyph,
  glyphCorner = 'bl',
  ticker,
  tickerColor = STAGE.primary,
  children,
}: StageBackdropProps) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 select-none overflow-hidden">
      {/* Lapisan dasar: warna gelap, kisi halus, dan gradasi turquoise samar. */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <pattern id="stage-grid" width="4" height="4" patternUnits="userSpaceOnUse">
            <path
              d="M4 0 L0 0 L0 4"
              fill="none"
              stroke={STAGE.primary}
              strokeWidth="0.1"
              opacity="0.16"
            />
          </pattern>
          <linearGradient id="stage-wash" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor={STAGE.primaryDeep} stopOpacity="0.3" />
            <stop offset="65%" stopColor={STAGE.primaryDeep} stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect width="100" height="100" fill={STAGE.ink} />
        <rect width="100" height="100" fill="url(#stage-grid)" />
        <rect width="100" height="100" fill="url(#stage-wash)" />
      </svg>

      {children}

      {/* Aksara besar yang sengaja terpotong tepi layar. Elemen yang menembus keluar
          kanvas memberi kesan bidang gambar lebih luas daripada layarnya. */}
      <span
        className={`absolute font-serif font-black leading-[0.7] tracking-tighter ${GLYPH_POSITION[glyphCorner]}`}
        style={{ fontSize: '30vh', color: STAGE.primary, opacity: 0.055 }}
      >
        {glyph}
      </span>

      {/* Pita berjalan di dasar layar. Isinya digandakan dua kali lalu digeser tepat
          50%, sehingga perulangannya tidak menampakkan sambungan. */}
      <div
        className="absolute bottom-0 left-0 w-full overflow-hidden"
        style={{
          height: '24px',
          backgroundColor: tickerColor,
          clipPath: 'polygon(0 0, 100% 6px, 100% 100%, 0 100%)',
        }}
      >
        <div className="stage-marquee flex w-max whitespace-nowrap">
          {Array.from({ length: 2 }, (_, group) => (
            <div key={group} className="flex">
              {Array.from({ length: 14 }, (_, i) => (
                <span
                  key={i}
                  className="px-5 font-mono font-black uppercase leading-[26px] tracking-[0.35em]"
                  style={{ fontSize: TYPE.micro, color: STAGE.ink }}
                >
                  {ticker}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
