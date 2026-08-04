'use client';

import { useMemo } from 'react';
import { SectionShell } from './shared';
import { CLIP, Panel, STAGE, StageBackdrop, StagePager, StageTitle, TYPE } from './shared/stage';
import { useStageTabs } from '@/hooks/useStageTabs';
import { ACHIEVEMENTS, AwardSlab, LEVEL_WEIGHT, MedalTab } from './achievement';

/**
 * Bentuk khas latar Achievement: dua cipratan tinta besar dan lingkaran laurel.
 *
 * Cipratan digambar sebagai <path> tunggal dengan kurva Bezier, bukan sebagai
 * gambar raster. Bentuknya tetap tajam pada kepadatan piksel berapa pun, ukurannya
 * hanya beberapa ratus byte, dan warnanya mengikuti palet tanpa perlu berkas
 * terpisah untuk tiap varian.
 */
function AchievementShapes() {
  return (
    <>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polygon points="0,20 100,4 100,24 0,40" fill={STAGE.primaryDeep} opacity="0.3" />
        <polygon points="0,18 100,2 100,4 0,20" fill={STAGE.warm} opacity="0.6" />
        <polygon points="0,76 100,60 100,63 0,79" fill={STAGE.accent} opacity="0.45" />
      </svg>

      <svg
        className="absolute -right-[8vw] -top-[12vh] h-[72vh] w-[72vh] opacity-[0.12]"
        viewBox="0 0 200 200"
      >
        <path
          fill={STAGE.primary}
          d="M104 8c14 6 12 26 26 33s34-2 41 12c7 14-11 25-9 40s21 25 15 39c-6 14-28 8-40 17s-14 30-29 32c-15 2-20-17-34-23s-32 4-41-9c-9-13 6-27 3-42S13 84 20 71s28-5 38-16S90 2 104 8Z"
        />
      </svg>

      <svg
        className="absolute -bottom-[16vh] -left-[7vw] h-[54vh] w-[54vh] opacity-[0.14]"
        viewBox="0 0 200 200"
      >
        <path
          fill={STAGE.warm}
          d="M96 14c18 2 22 24 37 32s36 2 42 18c6 16-16 26-18 42s16 32 6 44c-10 12-30 1-44 8s-19 26-35 24c-16-2-17-22-30-31s-33-2-39-17c-6-15 12-25 12-41S13 62 24 51s29 1 41-10S78 12 96 14Z"
        />
      </svg>

      <div className="absolute left-1/2 top-1/2 h-[95vh] w-[95vh] -translate-x-1/2 -translate-y-1/2">
        <svg className="stage-spin-rev h-full w-full" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r="94"
            fill="none"
            stroke={STAGE.primary}
            strokeWidth="0.7"
            strokeDasharray="2 10"
            opacity="0.35"
          />
        </svg>
      </div>
    </>
  );
}

/**
 * AchievementSection — layar "Result".
 *
 * Menampilkan validasi eksternal. Bagian ini penting karena seluruh isi portofolio
 * lainnya adalah klaim pribadi, sedangkan penghargaan adalah penilaian pihak ketiga.
 *
 * Urutan tampil ditentukan tingkat penyelenggaraan lalu tahun, bukan urutan
 * penulisan di berkas data. Capaian terkuat selalu berada di posisi pertama — yang
 * pada tata letak satu layar berarti satu-satunya yang pasti terlihat tanpa
 * interaksi apa pun.
 */
export default function AchievementSection() {
  const sorted = useMemo(
    () =>
      [...ACHIEVEMENTS].sort(
        (a, b) => LEVEL_WEIGHT[b.level] - LEVEL_WEIGHT[a.level] || Number(b.year) - Number(a.year)
      ),
    []
  );

  const { activeIndex, railRef, moveTo, goPrev, goNext, handleKeyDown, pageLabel } = useStageTabs(
    Math.max(sorted.length, 1)
  );

  return (
    <SectionShell id="achievement">
      <StageBackdrop glyph="栄誉" glyphCorner="br" ticker="Result" tickerColor={STAGE.warm}>
        <AchievementShapes />
      </StageBackdrop>

      <div className="relative z-10 grid h-full grid-rows-[auto_1fr_auto] gap-3 px-5 pb-8 pt-5 sm:px-8 sm:pt-7 lg:px-12">
        <StageTitle
          eyebrow="Result"
          title="Achievement"
          hint="Diurutkan otomatis dari tingkat penyelenggaraan tertinggi."
        />

        {sorted.length > 0 ? (
          <div className="grid min-h-0 grid-cols-1 gap-4 lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)] lg:gap-10">
            <div
              ref={railRef}
              role="tablist"
              aria-label="Daftar penghargaan"
              aria-orientation="vertical"
              onKeyDown={handleKeyDown}
              className="flex min-h-0 shrink-0 gap-2 overflow-x-auto pb-1 lg:flex-col lg:justify-center lg:overflow-visible lg:pb-0 lg:pr-7"
            >
              {sorted.map((achievement, index) => (
                <div
                  key={`${achievement.competition}-${achievement.year}`}
                  className="w-[200px] shrink-0 lg:w-auto"
                >
                  <MedalTab
                    achievement={achievement}
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
              innerClassName="min-h-0 px-5 py-4 sm:px-8 sm:py-6"
            >
              <div key={sorted[activeIndex].competition} className="stage-panel-enter h-full min-h-0">
                <AwardSlab achievement={sorted[activeIndex]} />
              </div>
            </Panel>
          </div>
        ) : (
          /* Keadaan kosong yang jujur. Lebih baik mengakui belum ada data daripada
             menampilkan kartu contoh yang bisa disalahpahami sebagai capaian nyata. */
          <div className="flex min-h-0 items-center justify-center">
            <Panel
              clip={CLIP.cut}
              fill="rgba(25,227,177,0.08)"
              innerClassName="px-8 py-6 text-center"
            >
              <p
                className="font-mono uppercase tracking-widest"
                style={{ fontSize: TYPE.small, color: STAGE.paper, opacity: 0.6 }}
              >
                Belum ada capaian yang tercatat.
              </p>
            </Panel>
          </div>
        )}

        {sorted.length > 0 && (
          <StagePager
            count={sorted.length}
            activeIndex={activeIndex}
            pageLabel={pageLabel}
            onPrev={goPrev}
            onNext={goNext}
            itemNoun="Penghargaan"
          />
        )}
      </div>
    </SectionShell>
  );
}
