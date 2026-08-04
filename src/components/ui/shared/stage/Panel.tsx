import type { CSSProperties, ReactNode } from 'react';
import { STAGE } from './theme';

interface PanelProps {
  readonly children: ReactNode;
  /** Siluet bidang. Ambil dari CLIP pada theme.ts, jangan tulis polygon mentah di section. */
  readonly clip: string;
  /** Warna isi bidang. */
  readonly fill?: string;
  /**
   * Warna lapisan bayangan di belakang bidang. Dikosongkan bila panel tidak
   * membutuhkan kesan cetak bertumpuk.
   */
  readonly shadow?: string;
  /** Jarak geser lapisan bayangan, dalam piksel. */
  readonly offset?: number;
  /** Kemiringan bidang dalam derajat. Isi di dalamnya dimiringkan balik otomatis. */
  readonly skew?: number;
  readonly className?: string;
  readonly style?: CSSProperties;
  readonly innerClassName?: string;
}

/**
 * Bidang berclip dengan bayangan cetak bertumpuk.
 *
 * Komponen ini ada untuk memecahkan satu masalah teknis yang selalu muncul saat
 * meninggalkan bidang persegi: clip-path memotong SEGALANYA milik elemen tersebut,
 * termasuk box-shadow dan border. Artinya "bayangan cetak" bergaya offset — ciri
 * utama tata letak yang dijadikan rujukan — tidak mungkin dibuat dengan box-shadow
 * pada elemen yang sama.
 *
 * Solusinya menumpuk dua lapisan dengan siluet identik: lapisan belakang diberi
 * warna aksen dan digeser beberapa piksel, lapisan depan berisi kontennya. Karena
 * keduanya memakai clip yang sama, bayangannya mengikuti bentuk apa pun tanpa
 * perlu dihitung ulang.
 *
 * Kemiringan diterapkan pada bidang lalu dibalik pada isinya, sehingga bidang
 * tidak sejajar sumbu tetapi hurufnya tetap tegak. Teks yang ikut miring terbaca
 * jauh lebih lambat, dan itu harga yang tidak sepadan untuk konten yang justru
 * ingin dibaca.
 */
export function Panel({
  children,
  clip,
  fill = STAGE.inkSoft,
  shadow,
  offset = 10,
  skew = 0,
  className = '',
  style,
  innerClassName = '',
}: PanelProps) {
  const skewTransform = skew ? `skewX(${skew}deg)` : undefined;

  return (
    <div className={`relative ${className}`} style={{ transform: skewTransform, ...style }}>
      {shadow && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            clipPath: clip,
            backgroundColor: shadow,
            transform: `translate3d(${offset}px, ${offset}px, 0)`,
          }}
        />
      )}

      <div
        className="relative h-full w-full"
        style={{ clipPath: clip, backgroundColor: fill }}
      >
        <div
          className={`h-full w-full ${innerClassName}`}
          style={{ transform: skew ? `skewX(${-skew}deg)` : undefined }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
