import { memo } from 'react';
import { STAGE, TYPE } from '../shared/stage';
import type { AcademyProfile } from './types';

/**
 * Blok identitas institusi.
 *
 * Sengaja tidak dibungkus kartu apa pun — teksnya berdiri langsung di atas latar,
 * hanya dipisahkan oleh satu bidang aksen miring di sisi kiri seperti garis tepi
 * buku tulis. Membungkusnya dalam kotak akan mengembalikan kesan dasbor yang justru
 * ingin dihindari di bagian ini.
 *
 * IPK ditulis sebagai angka raksasa dengan penyebut skalanya. Penyebut itu bukan
 * hiasan: "3.61" tanpa "/ 4.00" bisa salah dibaca oleh siapa pun yang terbiasa
 * dengan sistem penilaian berbeda. Seluruh blok IPK hanya dirender bila datanya
 * diisi, sehingga menyembunyikannya suatu saat cukup dengan mengosongkan satu
 * bidang data.
 */
export const IdentityBlock = memo(function IdentityBlock({
  profile,
}: {
  readonly profile: AcademyProfile;
}) {
  const { university, faculty, major, degree, period, startISO, endISO, location, gpa, gpaScale, focus } =
    profile;

  return (
    <div className="relative flex h-full min-h-0 flex-col justify-center pl-5">
      {/* Garis tepi merah seperti margin buku tulis. */}
      <span
        aria-hidden
        className="absolute bottom-4 left-0 top-4 w-[3px]"
        style={{ backgroundColor: STAGE.accent, opacity: 0.7 }}
      />

      <span
        className="w-fit px-2.5 py-[3px] font-mono font-black uppercase tracking-[0.28em]"
        style={{
          fontSize: TYPE.micro,
          backgroundColor: STAGE.warm,
          color: STAGE.ink,
          clipPath: 'polygon(0 0, 100% 0, calc(100% - 9px) 100%, 0 100%)',
        }}
      >
        {degree}
      </span>

      <h3
        className="mt-2 font-serif font-black uppercase leading-[0.86] tracking-tighter"
        style={{ fontSize: TYPE.h3, color: STAGE.paper, transform: 'skewX(-5deg)' }}
      >
        {university}
      </h3>

      <p
        className="mt-1.5 font-mono uppercase tracking-wider"
        style={{ fontSize: TYPE.tiny, color: STAGE.primary }}
      >
        {faculty} · {major}
      </p>

      {gpa && (
        <div className="mt-4 flex items-end gap-2">
          <span
            className="font-serif font-black leading-[0.78]"
            style={{
              fontSize: 'clamp(2.6rem, 9.5vh, 5.8rem)',
              color: STAGE.highlight,
              textShadow: `4px 4px 0 ${STAGE.accent}`,
            }}
          >
            {gpa}
          </span>
          <div className="pb-2">
            {gpaScale && (
              <span
                className="block font-mono leading-none"
                style={{ fontSize: TYPE.small, color: STAGE.paper, opacity: 0.5 }}
              >
                / {gpaScale}
              </span>
            )}
            <span
              className="mt-1 block font-mono uppercase leading-none tracking-widest"
              style={{ fontSize: TYPE.micro, color: STAGE.paper, opacity: 0.45 }}
            >
              IPK
            </span>
          </div>
        </div>
      )}

      <p
        className="mt-4 max-w-[38ch] leading-snug"
        style={{ fontSize: TYPE.small, color: STAGE.paper, opacity: 0.68 }}
      >
        {focus}
      </p>

      <p
        className="mt-4 font-mono uppercase tracking-widest"
        style={{ fontSize: TYPE.micro, color: STAGE.paper, opacity: 0.4 }}
      >
        <time dateTime={endISO ? `${startISO}/${endISO}` : startISO}>{period}</time>
        {' · '}
        {location}
      </p>
    </div>
  );
});
