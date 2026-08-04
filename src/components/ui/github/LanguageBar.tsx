import { memo } from 'react';
import { STAGE, TYPE } from '../shared/stage';
import type { LanguageShare } from '@/lib/github/types';

/**
 * Komposisi bahasa pemrograman sebagai satu batang bersusun miring.
 *
 * Batang tunggal dipilih daripada diagram lingkaran karena perbandingan panjang
 * jauh lebih mudah dinilai mata manusia dibanding perbandingan sudut, terutama pada
 * potongan-potongan kecil. Legendanya tetap mencantumkan persentase dalam angka,
 * sehingga informasinya tidak hanya tersedia secara visual.
 */
export const LanguageBar = memo(function LanguageBar({
  languages,
}: {
  readonly languages: readonly LanguageShare[];
}) {
  if (languages.length === 0) return null;

  return (
    <div>
      <div
        role="img"
        aria-label={`Komposisi bahasa: ${languages
          .map((lang) => `${lang.name} ${lang.percentage} persen`)
          .join(', ')}.`}
        className="flex h-3 w-full overflow-hidden"
        style={{
          backgroundColor: 'rgba(242,247,244,0.08)',
          clipPath: 'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)',
        }}
      >
        {languages.map((lang) => (
          <span
            key={lang.name}
            className="h-full"
            style={{ width: `${lang.percentage}%`, backgroundColor: lang.color ?? STAGE.primary }}
          />
        ))}
      </div>

      <ul className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1">
        {languages.map((lang) => (
          <li
            key={lang.name}
            className="flex items-center gap-1 font-mono"
            style={{ fontSize: TYPE.micro }}
          >
            <span
              aria-hidden
              className="inline-block h-[7px] w-[7px]"
              style={{
                backgroundColor: lang.color ?? STAGE.primary,
                clipPath: 'polygon(50% 0, 100% 50%, 50% 100%, 0 50%)',
              }}
            />
            <span style={{ color: STAGE.paper }}>{lang.name}</span>
            <span style={{ color: STAGE.paper, opacity: 0.45 }}>{lang.percentage}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
});
