import { memo } from 'react';
import { SKILLS } from './palette';
import type { LetterSpec } from './types';

interface CategoryLabelProps {
  /** Nama kategori. Dipakai apa adanya bila letters tidak diisi. */
  readonly text: string;
  /** Tatanan per huruf. Bila kosong, label dirender rata seperti teks biasa. */
  readonly letters?: readonly LetterSpec[];
  /** Slot tengah adalah kategori terpilih; teksnya putih, sisanya hitam tembus. */
  readonly isActive: boolean;
  /** Ukuran huruf dalam vh. */
  readonly size: number;
  /** Warna bidang tempat label ini menempel. */
  readonly surfaceColor: string;
}

/** Jarak bawaan kotak ke hurufnya, dalam em, saat invert aktif. */
const DEFAULT_PAD = { x: 0.08, y: 0.04 };

export const CategoryLabel = memo(function CategoryLabel({
  text,
  letters,
  isActive,
  size,
  surfaceColor,
}: CategoryLabelProps) {
  const specs: readonly LetterSpec[] = letters ?? [...text].map((c) => ({ c }));
  const inkColor = isActive ? SKILLS.white : SKILLS.ink;

  return (
    <span
      className="block whitespace-nowrap text-right font-serif font-bold uppercase leading-none"
      style={{
        fontSize: `${size}vh`,
        color: inkColor,
        opacity: isActive ? 1 : 0.5,
      }}
    >
      {specs.map((spec, index) => {
        const {
          c,
          x = 0,
          y = 0,
          r = 0,
          boxR = 0,
          skew = 0,
          s = 1,
          gap = 0,
          invert = false,
          padX = DEFAULT_PAD.x,
          padY = DEFAULT_PAD.y,
        } = spec;

        return (
          <span
            key={`${c}-${index}`}
            className="inline-block relative leading-none"
            style={{
              transform: `translate(${x}em, ${y}em) rotate(${r}deg) scale(${s})`,
              marginRight: gap ? `${gap}em` : undefined,
              color: !invert ? inkColor : undefined,
            }}
          >
            {/* 📍 KOTAK BACKGROUND (Mengatur ukuran, rotasi, & skew secara terisolasi) */}
            {invert && (
              <span
                className="absolute -z-10 block pointer-events-none"
                style={{
                  backgroundColor: inkColor,
                  transform: `rotate(${boxR}deg) skewX(${skew}deg)`,
                  transformOrigin: 'center',
                  // Menggunakan offset em langsung ke atribut top/bottom/left/right
                  top: `${-padY}em`,
                  bottom: `${-padY}em`,
                  left: `${-padX}em`,
                  right: `${-padX}em`,
                }}
              />
            )}

            {/* 📍 Teks Hurufnya */}
            <span
              className="relative z-10"
              style={{
                color: invert ? surfaceColor : undefined,
              }}
            >
              {c === ' ' ? '\u00A0' : c}
            </span>
          </span>
        );
      })}
    </span>
  );
});