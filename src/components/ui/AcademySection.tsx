'use client';

import { SectionShell } from './shared';
import { CLIP, Panel, STAGE, StageBackdrop, StagePager, StageTitle, TYPE } from './shared/stage';
import { useStageTabs } from '@/hooks/useStageTabs';
import { ACADEMY_PROFILE, ACADEMY_VIEWS, IdentityBlock, RecordPanel } from './academy';

/**
 * Bentuk khas latar Academy.
 *
 * Arahnya bukan lagi antarmuka teknis melainkan suasana ruang kelas menjelang sore:
 * berkas cahaya jendela yang jatuh miring, papan tulis hijau, dan bidang hangat di
 * tepi bawah. Ketiganya menggantikan lingkaran raksasa dan rantai titik yang dulu
 * membuat bagian ini terbaca sebagai dasbor fiksi ilmiah — padahal isinya justru
 * bagian paling manusiawi dari seluruh halaman.
 *
 * Berkas cahaya dibuat dari beberapa jajar genjang dengan opasitas menurun, bukan
 * dari gradasi bertumpuk. Tepi yang tegas justru lebih tepat: yang ditiru adalah
 * cahaya yang dipotong bingkai jendela, bukan kabut.
 */
function AcademyShapes() {
  return (
    <>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="acad-afternoon" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={STAGE.warm} stopOpacity="0.28" />
            <stop offset="70%" stopColor={STAGE.warm} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Papan tulis hijau yang menempati sisi kanan layar. */}
        <polygon points="34,0 100,0 100,100 20,100" fill={STAGE.primaryDeep} opacity="0.4" />
        <polygon points="34,0 35.4,0 21.4,100 20,100" fill={STAGE.primary} opacity="0.45" />

        {/* Berkas cahaya jendela, jatuh miring dari kanan atas. */}
        <polygon points="52,0 66,0 40,100 26,100" fill="url(#acad-afternoon)" />
        <polygon points="72,0 80,0 54,100 46,100" fill="url(#acad-afternoon)" />
        <polygon points="86,0 90,0 64,100 60,100" fill="url(#acad-afternoon)" />

        {/* Bidang hangat rendah di tepi bawah, seperti pantulan lantai kayu. */}
        <polygon points="0,88 100,74 100,100 0,100" fill={STAGE.warm} opacity="0.1" />
      </svg>

      {/* Garis kapur mendatar samar pada area papan tulis. */}
      <div className="absolute right-[4vw] top-[18vh] flex w-[42vw] flex-col gap-[9px] opacity-[0.09]">
        {Array.from({ length: 7 }, (_, i) => (
          <span
            key={i}
            className="block h-px"
            style={{
              backgroundColor: STAGE.paper,
              width: `${100 - i * 7}%`,
              transform: `rotate(-${0.4 + i * 0.05}deg)`,
            }}
          />
        ))}
      </div>
    </>
  );
}

/**
 * AcademySection — layar "Academic Record".
 *
 * Dua kolom: identitas institusi di kiri, catatan akademik yang dapat diganti di
 * kanan. Pembagian ini mengikuti perbedaan cara datanya dibaca. Nama kampus dan IPK
 * adalah data penyaringan yang dicari dalam hitungan detik dan harus selalu
 * terlihat; mata kuliah, peran asisten, dan proyek adalah bahan pendalaman yang
 * baru dibuka setelah penyaringan awal terlewati.
 *
 * Karena itu kolom kiri tidak pernah berganti isi, sementara kolom kanan berganti
 * mengikuti pilihan.
 */
export default function AcademySection() {
  const { activeIndex, railRef, moveTo, goPrev, goNext, handleKeyDown, pageLabel } = useStageTabs(
    ACADEMY_VIEWS.length
  );

  const activeView = ACADEMY_VIEWS[activeIndex];

  return (
    <SectionShell id="academy">
      <StageBackdrop glyph="学籍" glyphCorner="bl" ticker="Academic Record" tickerColor={STAGE.warm}>
        <AcademyShapes />
      </StageBackdrop>

      <div className="relative z-10 grid h-full grid-rows-[auto_1fr_auto] gap-3 px-5 pb-8 pt-5 sm:px-8 sm:pt-7 lg:px-12">
        <StageTitle
          eyebrow="Academic Record"
          title="Academy"
          hint="Pendidikan formal, mata kuliah relevan, dan peran akademik di luar kelas."
          jitter={false}
          titleColor={STAGE.paper}
        />

        <div className="grid min-h-0 grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-12">
          <IdentityBlock profile={ACADEMY_PROFILE} />

          <div className="flex min-h-0 flex-col gap-2.5">
            {/* Pemilih jenis catatan berbentuk tab kertas: sudut kanan atas
                dipangkas seperti pembatas buku, bukan kotak. Berbentuk deretan
                mendatar, bukan rel diagonal seperti section lain, karena
                pilihannya hanya tiga dan setara — tidak ada urutan di antara mereka. */}
            <div
              ref={railRef}
              role="tablist"
              aria-label="Jenis catatan akademik"
              onKeyDown={handleKeyDown}
              className="flex shrink-0 gap-1"
            >
              {ACADEMY_VIEWS.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={item.key}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="acad-panel"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => moveTo(index)}
                    className="px-4 py-1.5 font-mono font-black uppercase tracking-[0.18em] transition-colors duration-150"
                    style={{
                      fontSize: TYPE.micro,
                      clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 100%, 0 100%)',
                      backgroundColor: isActive ? STAGE.paper : 'rgba(242,247,244,0.14)',
                      color: isActive ? STAGE.ink : STAGE.paper,
                    }}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <Panel
              clip={CLIP.cutBL}
              fill={STAGE.paper}
              shadow={STAGE.accent}
              offset={11}
              skew={-1.5}
              className="min-h-0 flex-1"
              innerClassName="min-h-0"
            >
              <div key={activeView.key} className="stage-panel-enter h-full min-h-0">
                <RecordPanel profile={ACADEMY_PROFILE} view={activeView.key} />
              </div>
            </Panel>
          </div>
        </div>

        <StagePager
          count={ACADEMY_VIEWS.length}
          activeIndex={activeIndex}
          pageLabel={pageLabel}
          onPrev={goPrev}
          onNext={goNext}
          itemNoun="Catatan"
        />
      </div>
    </SectionShell>
  );
}
