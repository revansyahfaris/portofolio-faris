import { memo } from 'react';
import { Trophy } from 'lucide-react';
import { STAGE, StageTag, TYPE } from '../shared/stage';
import type { Achievement } from './types';

/**
 * Warna pita tingkat kompetisi.
 *
 * Tingkat penyelenggaraan menentukan bobot sebuah penghargaan, dan pembaca harus
 * bisa membedakannya sebelum membaca teksnya. Meski begitu teksnya tetap ditulis:
 * warna tidak boleh menjadi satu-satunya pembawa makna, karena pembaca layar tidak
 * menangkapnya sama sekali.
 *
 * Dengan palet yang kini dikunci, perbedaannya dibuat lewat tiga tingkat penekanan
 * warna aksen, bukan lewat tiga warna berbeda — sesuatu yang justru lebih tepat,
 * sebab tingkatannya memang berjenjang, bukan berkategori.
 */
const LEVEL_STYLE: Record<Achievement['level'], { bg: string; fg: string }> = {
  Internasional: { bg: STAGE.accent, fg: STAGE.paper },
  Nasional: { bg: STAGE.warm, fg: STAGE.ink },
  Regional: { bg: STAGE.highlight, fg: STAGE.ink },
  Universitas: { bg: 'rgba(6,16,13,0.12)', fg: STAGE.ink },
};

/**
 * Panel besar berisi satu penghargaan.
 *
 * Susunannya meniru layar hasil: satu sebutan besar sebagai pernyataan, lalu
 * keterangan pendukung di bawahnya. Nama penghargaan dibuat paling besar karena
 * itulah kesimpulannya; nama lomba, penyelenggara, dan tahun adalah bukti yang baru
 * dibaca setelah kesimpulannya menarik perhatian.
 *
 * Jumlah peserta ditampilkan bila tersedia — "Juara 2 dari 120 tim" memberi konteks
 * tingkat kesulitan yang tidak bisa disampaikan oleh kata "Juara 2" sendirian.
 */
export const AwardSlab = memo(function AwardSlab({
  achievement,
}: {
  readonly achievement: Achievement;
}) {
  const { award, competition, organizer, year, level, description, participants, tags } =
    achievement;
  const levelStyle = LEVEL_STYLE[level];

  return (
    <div
      id="ach-panel"
      role="tabpanel"
      aria-labelledby="ach-panel-label"
      className="flex h-full min-h-0 flex-col"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className="px-2.5 py-[3px] font-mono font-black uppercase tracking-[0.22em]"
          style={{
            fontSize: TYPE.micro,
            backgroundColor: levelStyle.bg,
            color: levelStyle.fg,
            clipPath: 'polygon(0 0, 100% 0, calc(100% - 9px) 100%, 0 100%)',
          }}
        >
          Tingkat {level}
        </span>

        <span
          className="font-mono uppercase tracking-widest"
          style={{ fontSize: TYPE.micro, color: STAGE.ink, opacity: 0.58 }}
        >
          <time dateTime={year}>{year}</time>
          {participants && ` · ${participants}`}
        </span>
      </div>

      {/* Ikon piala berukuran besar menjadikan blok ini tetap dikenali sebagai
          "penghargaan" bahkan saat dilihat sekilas dari kejauhan. */}
      <div className="mt-2 flex items-center gap-3">
        <Trophy
          aria-hidden
          className="shrink-0"
          style={{ color: STAGE.accent, width: 'clamp(20px, 4.2vh, 40px)', height: 'auto' }}
        />
        <h3
          id="ach-panel-label"
          className="font-serif font-black uppercase leading-[0.84] tracking-tighter"
          style={{ fontSize: TYPE.h2, color: STAGE.ink, transform: 'skewX(-5deg)' }}
        >
          {award}
        </h3>
      </div>

      <p
        className="mt-2 font-serif font-black uppercase leading-tight tracking-tight"
        style={{ fontSize: TYPE.lead, color: STAGE.accent }}
      >
        {competition}
      </p>

      <p
        className="mt-1 font-mono uppercase tracking-wider"
        style={{ fontSize: TYPE.micro, color: STAGE.ink, opacity: 0.55 }}
      >
        {organizer}
      </p>

      <p
        className="mt-3 max-w-[54ch] leading-snug"
        style={{ fontSize: TYPE.body, color: STAGE.ink, opacity: 0.8 }}
      >
        {description}
      </p>

      {tags && tags.length > 0 && (
        <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
          {tags.map((tag) => (
            <StageTag key={tag} label={tag} on="light" />
          ))}
        </div>
      )}
    </div>
  );
});
