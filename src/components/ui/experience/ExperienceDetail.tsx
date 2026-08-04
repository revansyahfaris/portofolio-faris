import { memo } from 'react';
import { STAGE, StageTag, TYPE } from '../shared/stage';
import type { ExperienceEntry } from './types';

/**
 * Panel rincian satu pengalaman.
 *
 * Panel ini harus muat dalam satu layar bersama seluruh elemen lain, sehingga
 * seluruh ukuran teksnya memakai clamp() berbasis satuan vh, bukan breakpoint.
 * Isinya menyusut mengikuti tinggi jendela dan tidak pernah memunculkan gulir.
 *
 * Jumlah butir tanggung jawab dan metrik dibatasi di sini, bukan di berkas data.
 * Batas ini konsekuensi tata letak satu layar, bukan aturan tentang isi — berkas
 * data tetap boleh menyimpan uraian selengkapnya untuk dipakai di tempat lain.
 */

const MAX_RESPONSIBILITIES = 3;
const MAX_METRICS = 3;

/** Siluet kotak angka dampak: sudut kanan bawah dipangkas miring. */
const METRIC_CLIP = 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)';

export const ExperienceDetail = memo(function ExperienceDetail({
  entry,
}: {
  readonly entry: ExperienceEntry;
}) {
  const {
    role,
    company,
    employmentType,
    period,
    startISO,
    endISO,
    location,
    summary,
    responsibilities,
    metrics,
    stack,
  } = entry;

  const isOngoing = !endISO;

  return (
    <div
      id="exp-panel"
      role="tabpanel"
      aria-labelledby="exp-panel-label"
      className="relative flex h-full min-h-0 flex-col"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className="px-2 py-[3px] font-mono font-black uppercase tracking-[0.2em]"
          style={{
            fontSize: TYPE.micro,
            backgroundColor: STAGE.ink,
            color: STAGE.primary,
            clipPath: 'polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%)',
          }}
        >
          {employmentType}
        </span>

        {isOngoing && (
          <span
            className="flex items-center gap-1.5 px-2 py-[3px] font-mono font-black uppercase tracking-[0.2em]"
            style={{
              fontSize: TYPE.micro,
              backgroundColor: STAGE.accent,
              color: STAGE.paper,
              clipPath: 'polygon(8px 0, 100% 0, 100% 100%, 0 100%)',
            }}
          >
            <span
              aria-hidden
              className="stage-blink inline-block h-[6px] w-[6px]"
              style={{ backgroundColor: STAGE.paper }}
            />
            Aktif
          </span>
        )}

        <span
          className="font-mono uppercase tracking-widest"
          style={{ fontSize: TYPE.micro, color: STAGE.ink, opacity: 0.6 }}
        >
          <time dateTime={endISO ? `${startISO}/${endISO}` : startISO}>{period}</time>
          {' · '}
          {location}
        </span>
      </div>

      {/* Judul jabatan dibuat sebesar mungkin: inilah satu-satunya informasi yang
          pasti terbaca meski pengunjung hanya melirik sekilas. */}
      <h3
        id="exp-panel-label"
        className="mt-2 font-serif font-black uppercase leading-[0.84] tracking-tighter"
        style={{ fontSize: TYPE.h2, color: STAGE.ink, transform: 'skewX(-5deg)' }}
      >
        {role}
      </h3>

      <div className="mt-1.5 flex items-center gap-2">
        <span
          aria-hidden
          className="block h-[10px] w-7 shrink-0"
          style={{ backgroundColor: STAGE.accent, clipPath: 'polygon(0 0, 100% 0, 78% 100%, 0 100%)' }}
        />
        <span
          className="font-serif font-black uppercase tracking-tight"
          style={{ fontSize: TYPE.lead, color: STAGE.accent }}
        >
          {company}
        </span>
      </div>

      <p
        className="mt-2 max-w-[52ch] leading-snug"
        style={{ fontSize: TYPE.body, color: STAGE.ink, opacity: 0.8 }}
      >
        {summary}
      </p>

      {/* Angka dampak dalam bidang gelap berpangkas. Kontras terbalik terhadap
          bidang terang di sekitarnya menjadikan angkanya titik berhenti mata
          pertama setelah judul. */}
      {metrics.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {metrics.slice(0, MAX_METRICS).map((metric) => (
            <div
              key={metric.label}
              className="px-3 py-1.5"
              style={{ backgroundColor: STAGE.ink, clipPath: METRIC_CLIP }}
            >
              <div
                className="font-serif font-black leading-none"
                style={{ fontSize: TYPE.h3, color: STAGE.highlight }}
              >
                {metric.value}
              </div>
              <div
                className="mt-0.5 pr-3 font-mono uppercase tracking-wider"
                style={{ fontSize: TYPE.micro, color: STAGE.paper, opacity: 0.7 }}
              >
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      )}

      <ul className="mt-3 flex min-h-0 flex-col gap-1 overflow-hidden">
        {responsibilities.slice(0, MAX_RESPONSIBILITIES).map((item) => (
          <li
            key={item}
            className="flex gap-2 leading-snug"
            style={{ fontSize: TYPE.small, color: STAGE.ink }}
          >
            <span
              aria-hidden
              className="mt-[5px] h-[7px] w-[7px] shrink-0"
              style={{ backgroundColor: STAGE.accent, clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}
            />
            <span style={{ opacity: 0.85 }}>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
        {stack.map((tech) => (
          <StageTag key={tech} label={tech} on="light" />
        ))}
      </div>
    </div>
  );
});
