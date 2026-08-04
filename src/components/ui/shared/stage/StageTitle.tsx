import { memo } from 'react';
import { CLIP, STAGE, TYPE } from './theme';

interface StageTitleProps {
  /** Label kecil di atas judul, memberi konteks jenis layar. */
  readonly eyebrow: string;
  readonly title: string;
  /** Keterangan pendek di sisi kanan, disembunyikan pada layar sempit. */
  readonly hint?: string;
  /** Menyalakan getaran halus pada judul. Dimatikan untuk section bernuansa tenang. */
  readonly jitter?: boolean;
  /** Warna judul. Bawaannya turquoise; sebagian layar memakai putih agar tidak berebut. */
  readonly titleColor?: string;
}

/**
 * Judul besar bergaya cetak untuk section satu layar.
 *
 * Eyebrow-nya bukan lagi kotak persegi melainkan bidang berujung runcing (CLIP.arrow)
 * yang teksnya berdiri langsung di atas bentuk itu. Perbedaannya terlihat kecil,
 * tetapi inilah pola yang diulang di seluruh halaman: teks menempel pada bidang
 * berbentuk, bukan diletakkan di dalam kotak.
 *
 * Bayangan judul dibuat dengan text-shadow berlapis, bukan dengan menumpuk beberapa
 * elemen teks. Meniru cetakan offset yang meleset registrasinya adalah efek yang
 * memang dituju, tetapi menirunya dengan elemen ganda berarti teks yang sama
 * berulang di pohon dokumen dan akan dibacakan berkali-kali oleh pembaca layar.
 */
export const StageTitle = memo(function StageTitle({
  eyebrow,
  title,
  hint,
  jitter = true,
  titleColor = STAGE.primary,
}: StageTitleProps) {
  return (
    <header className="flex items-end justify-between gap-6">
      <div className="min-w-0">
        <span
          className="inline-block py-[3px] pl-2.5 pr-5 font-mono font-black uppercase tracking-[0.3em]"
          style={{
            fontSize: TYPE.micro,
            backgroundColor: STAGE.accent,
            color: STAGE.paper,
            clipPath: CLIP.arrow,
            transform: 'rotate(-1.5deg)',
          }}
        >
          {eyebrow}
        </span>

        <h2
          className={`mt-1 font-serif font-black uppercase leading-[0.78] tracking-tighter ${
            jitter ? 'stage-jitter' : ''
          }`}
          style={{
            fontSize: TYPE.display,
            color: titleColor,
            textShadow: `4px 4px 0 ${STAGE.accent}, 9px 9px 0 rgba(0,0,0,0.55)`,
            transform: jitter ? undefined : 'skewX(-7deg)',
          }}
        >
          {title}
        </h2>
      </div>

      {hint && (
        <p
          className="hidden max-w-[26ch] shrink-0 text-right font-mono uppercase leading-relaxed tracking-wider lg:block"
          style={{ fontSize: TYPE.micro, color: STAGE.paper, opacity: 0.45 }}
        >
          {hint}
        </p>
      )}
    </header>
  );
});
