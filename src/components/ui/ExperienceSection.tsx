'use client';

import { SectionShell } from './shared';
import {
  CLIP,
  Panel,
  STAGE,
  StageBackdrop,
  StagePager,
  StageTitle,
} from './shared/stage';
import { useStageTabs } from '@/hooks/useStageTabs';
import { EXPERIENCES, ExperienceDetail, RankCard } from './experience';

/**
 * Bentuk khas latar Experience: baji turquoise besar yang menanjak dari kiri bawah
 * ke kanan atas, ditambah sunburst berputar di belakang panel rincian.
 *
 * Baji digambar dengan preserveAspectRatio "none" agar kemiringannya meregang
 * mengikuti rasio layar apa pun. Bidang miring yang terpotong di tempat berbeda
 * pada tiap ukuran layar akan merusak komposisinya.
 */
function ExperienceShapes() {
  return (
    <>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polygon points="0,100 100,34 100,50 0,100" fill={STAGE.primaryDeep} opacity="0.35" />
        <polygon points="0,100 100,30 100,33 0,100" fill={STAGE.primary} opacity="0.55" />
        <polygon points="0,84 100,18 100,21 0,87" fill={STAGE.accent} opacity="0.5" />
      </svg>

      <div className="absolute right-[4vw] top-1/2 h-[125vh] w-[125vh] -translate-y-1/2">
        <svg className="stage-spin h-full w-full" viewBox="-100 -100 200 200">
          <g stroke={STAGE.primary} strokeWidth="1.2" opacity="0.11">
            {Array.from({ length: 21 }, (_, i) => (
              <line key={i} x1="0" y1="0" x2="0" y2="-100" transform={`rotate(${(360 / 21) * i})`} />
            ))}
          </g>
        </svg>
      </div>
    </>
  );
}

/**
 * ExperienceSection — layar "Bond Record".
 *
 * Rel kartu di kiri, panel rincian di kanan. Bentuk pemilihnya berupa tangga
 * diagonal karena entrinya memang berurutan menurut bobot — peran paling relevan
 * lebih dulu, bukan yang paling baru secara kronologis, sebab pembaca hampir selalu
 * berhenti setelah dua entri pertama.
 *
 * Rincian tersembunyi di balik satu klik memang menambah satu langkah, tetapi entri
 * pertama sudah terbuka sejak awal, sehingga pengunjung yang tidak berinteraksi
 * sama sekali tetap melihat satu contoh utuh beserta angkanya.
 */
export default function ExperienceSection() {
  const { activeIndex, railRef, moveTo, goPrev, goNext, handleKeyDown, pageLabel } = useStageTabs(
    EXPERIENCES.length
  );

  const activeEntry = EXPERIENCES[activeIndex];

  return (
    <SectionShell id="experience">
      <StageBackdrop glyph="経歴" glyphCorner="bl" ticker="Bond Record">
        <ExperienceShapes />
      </StageBackdrop>

      {/* Kerangka tiga baris. Baris tengah memakai 1fr dan min-h-0 supaya ia yang
          menyerap sisa ruang dan menyusut lebih dulu ketika jendela pendek —
          tanpa min-h-0, isi grid menolak mengecil dan memaksa munculnya gulir. */}
      <div className="relative z-10 grid h-full grid-rows-[auto_1fr_auto] gap-3 px-5 pb-8 pt-5 sm:px-8 sm:pt-7 lg:px-12">
        <StageTitle
          eyebrow="Bond Record"
          title="Experience"
          hint="Pilih entri untuk melihat rincian peran, angka dampak, dan teknologinya."
        />

        <div className="grid min-h-0 grid-cols-1 gap-4 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:gap-10">
          <div
            ref={railRef}
            role="tablist"
            aria-label="Daftar pengalaman"
            aria-orientation="vertical"
            onKeyDown={handleKeyDown}
            className="flex min-h-0 shrink-0 gap-2 overflow-x-auto pb-1 lg:flex-col lg:justify-center lg:overflow-visible lg:pb-0 lg:pr-7"
          >
            {EXPERIENCES.map((entry, index) => (
              <div key={entry.company} className="w-[210px] shrink-0 lg:w-auto">
                <RankCard
                  entry={entry}
                  index={index}
                  isActive={index === activeIndex}
                  onSelect={moveTo}
                />
              </div>
            ))}
          </div>

          <Panel
            clip={CLIP.cut}
            fill={STAGE.paper}
            shadow={STAGE.accent}
            offset={12}
            skew={-2.5}
            className="min-h-0"
            innerClassName="min-h-0 px-5 py-4 sm:px-7 sm:py-6"
          >
            {/* key memaksa React membuat ulang panelnya saat entri berganti,
                sehingga animasi masuk terpicu setiap kali pilihan berubah. */}
            <div key={activeEntry.company} className="stage-panel-enter h-full min-h-0">
              <ExperienceDetail entry={activeEntry} />
            </div>
          </Panel>
        </div>

        <StagePager
          count={EXPERIENCES.length}
          activeIndex={activeIndex}
          pageLabel={pageLabel}
          onPrev={goPrev}
          onNext={goNext}
          itemNoun="Pengalaman"
        />
      </div>
    </SectionShell>
  );
}
