'use client';

import { SectionShell } from './shared';
import { STAGE, StageBackdrop, StagePager, StageTitle } from './shared/stage';
import { useStageTabs } from '@/hooks/useStageTabs';
import { QUESTS, QuestDetail, QuestPortrait, QuestSelector } from './quest';

/** Jumlah garis kecepatan diagonal di latar. */
const SPEED_LINES = 16;

/**
 * Bentuk khas latar Quest: bidang miring besar, garis kecepatan, dan sunburst.
 *
 * Garis kecepatan dibangkitkan dari indeks dengan lebar berselang-seling, meniru
 * garis gerak pada panel komik. Membangkitkannya lewat perhitungan, bukan
 * menuliskan koordinatnya satu per satu, membuat kerapatan dan sudutnya dapat
 * diatur dengan mengubah satu angka.
 */
function QuestShapes() {
  return (
    <>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polygon points="0,0 46,0 28,100 0,100" fill={STAGE.primaryDeep} opacity="0.5" />
        <polygon points="44,0 46,0 28,100 26,100" fill={STAGE.accent} opacity="0.85" />
        <polygon points="49,0 49.8,0 31.8,100 31,100" fill={STAGE.primary} opacity="0.6" />

        <g>
          {Array.from({ length: SPEED_LINES }, (_, i) => {
            const x = 56 + i * 3;
            const width = i % 3 === 0 ? 0.9 : 0.3;
            return (
              <polygon
                key={i}
                points={`${x},0 ${x + width},0 ${x - 18 + width},100 ${x - 18},100`}
                fill={STAGE.primary}
                opacity={i % 3 === 0 ? 0.08 : 0.04}
              />
            );
          })}
        </g>
      </svg>

      <div className="absolute -left-[28vh] top-1/2 h-[130vh] w-[130vh] -translate-y-1/2">
        <svg className="stage-spin h-full w-full" viewBox="-100 -100 200 200">
          <g stroke={STAGE.paper} strokeWidth="1.6" opacity="0.06">
            {Array.from({ length: 19 }, (_, i) => (
              <line key={i} x1="0" y1="0" x2="0" y2="-100" transform={`rotate(${(360 / 19) * i})`} />
            ))}
          </g>
        </svg>
      </div>
    </>
  );
}

/**
 * QuestSection — layar "Mission Archive".
 *
 * Puncak isi portofolio: bagian yang memuat karya, dan karena itu bagian yang
 * paling menentukan penilaian pembaca teknis. Potret besar di kiri, rincian di
 * kanan, deret pilihan di dasar layar.
 *
 * Susunan ini adalah hasil perbaikan atas versi sebelumnya yang terlalu padat.
 * Yang diubah dan alasannya:
 *
 * - Metadata (kode, kategori, status, tahun) sebelumnya muncul di potret DAN di
 *   panel rincian. Kini hanya di potret. Pengulangan itu memaksa mata menyaring
 *   informasi yang sama dua kali sebelum sampai ke isi sebenarnya.
 * - Tagline dinaikkan menjadi pernyataan utama panel dengan ukuran judul, bukan
 *   lagi satu baris kecil di antara blok lain. Satu kalimat inilah yang menentukan
 *   apakah pembaca melanjutkan.
 * - Daftar fitur dipangkas dari tiga menjadi dua, dan jarak antar blok diperbesar.
 *   Masalah dan solusi sudah menjelaskan proyeknya; fitur hanya memperinci.
 *
 * Proyek pertama sudah terbuka sejak awal, sehingga pengunjung yang tidak
 * berinteraksi sama sekali tetap melihat satu contoh utuh.
 */
export default function QuestSection() {
  const { activeIndex, railRef, moveTo, goPrev, goNext, handleKeyDown, pageLabel } = useStageTabs(
    QUESTS.length
  );

  const activeQuest = QUESTS[activeIndex];

  return (
    <SectionShell id="projects">
      <StageBackdrop glyph="任務" glyphCorner="br" ticker="Mission Archive" tickerColor={STAGE.accent}>
        <QuestShapes />
      </StageBackdrop>

      <div className="relative z-10 grid h-full grid-rows-[auto_1fr_auto] gap-3 px-5 pb-8 pt-5 sm:px-8 sm:pt-7 lg:px-12">
        <StageTitle
          eyebrow="Mission Archive"
          title="Quest"
          hint="Diuraikan dari masalah yang dipecahkan sampai keputusan teknis yang diambil."
        />

        <div className="grid min-h-0 grid-cols-1 gap-6 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:gap-14">
          {/* Potret disembunyikan pada layar sempit: informasinya sudah ada di sel
              pemilih, dan di layar kecil ruangnya lebih berguna untuk teks. */}
          <div className="hidden min-h-0 lg:block">
            <div key={`portrait-${activeQuest.code}`} className="stage-panel-enter h-full min-h-0">
              <QuestPortrait quest={activeQuest} />
            </div>
          </div>

          <div className="min-h-0">
            <div key={activeQuest.code} className="stage-panel-enter h-full min-h-0">
              <QuestDetail quest={activeQuest} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <div ref={railRef}>
            <QuestSelector
              quests={QUESTS}
              activeIndex={activeIndex}
              onSelect={moveTo}
              onKeyDown={handleKeyDown}
            />
          </div>

          <StagePager
            count={QUESTS.length}
            activeIndex={activeIndex}
            pageLabel={pageLabel}
            onPrev={goPrev}
            onNext={goNext}
            itemNoun="Proyek"
          />
        </div>
      </div>
    </SectionShell>
  );
}
