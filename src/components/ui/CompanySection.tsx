'use client';

import { SectionShell } from './shared';
import {
  PERSPECTIVE_PARENT,
  STAGE,
  StageBackdrop,
  StagePager,
  StageTitle,
  TYPE,
} from './shared/stage';
import { useStageTabs } from '@/hooks/useStageTabs';
import { STUDIO_PROFILE, ModeCard } from './company';

/** Jumlah panah chevron pada rel diagonal. */
const CHEVRONS = 7;

/**
 * Bentuk khas latar Company: rel chevron diagonal yang menanjak dari kiri bawah ke
 * kanan atas, tempat kartu layanan berdiri.
 *
 * Chevron dibangkitkan dari satu <polygon> yang digandakan dan digeser lewat
 * transform per salinan. Menuliskan tujuh koordinat berbeda secara manual akan
 * membuat penyesuaian sudut rel berarti menghitung ulang seluruhnya.
 */
function CompanyShapes() {
  return (
    <>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polygon points="-5,86 108,28 108,46 -5,104" fill={STAGE.primaryDeep} opacity="0.55" />
        <polygon points="-5,82 108,24 108,27 -5,85" fill={STAGE.primary} opacity="0.9" />
        <polygon points="-5,90 108,32 108,34 -5,92" fill={STAGE.accent} opacity="0.6" />

        <g opacity="0.45">
          {Array.from({ length: CHEVRONS }, (_, i) => (
            <polygon
              key={i}
              points="0,0 4,5 0,10 2,10 6,5 2,0"
              fill={STAGE.ink}
              transform={`translate(${4 + i * 15}, ${78 - i * 7.7}) rotate(-27)`}
            />
          ))}
        </g>
      </svg>

      <div className="absolute -right-[18vh] -top-[22vh] h-[80vh] w-[80vh]">
        <svg className="stage-spin h-full w-full" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke={STAGE.primary}
            strokeWidth="2"
            strokeDasharray="26 12"
            opacity="0.22"
          />
        </svg>
      </div>
    </>
  );
}

/**
 * CompanySection — layar "Select Mode".
 *
 * Memperkenalkan studio sebagai entitas profesional yang terpisah dari profil
 * pribadi. Sasaran pembacanya berbeda dari section lain: bukan perekrut yang
 * menilai kandidat, melainkan calon klien yang menimbang risiko sebelum
 * mengeluarkan biaya.
 *
 * Susunannya mengikuti urutan keberatan yang biasa muncul di benak klien: siapa ini
 * dan apa buktinya (blok merek dengan angka) -> apa yang dikerjakan dan saya dapat
 * apa (kartu layanan beserta keluarannya) -> bagaimana prosesnya dan berapa lama
 * (pita alur kerja).
 *
 * Visi dan misi sengaja tidak ditampilkan. Pada tata letak satu layar, ruang
 * terbatas harus diberikan pada informasi yang mengubah keputusan, dan pernyataan
 * nilai baru terasa kredibel setelah kemampuannya terbukti — bukan sebaliknya.
 */
export default function CompanySection() {
  const { brand, tagline, positioning, services, workflow, proofPoints, clientCategories } =
    STUDIO_PROFILE;

  const { activeIndex, railRef, moveTo, goPrev, goNext, handleKeyDown, pageLabel } = useStageTabs(
    services.length
  );

  return (
    <SectionShell id="company">
      <StageBackdrop glyph="工房" glyphCorner="tl" ticker="Select Mode">
        <CompanyShapes />
      </StageBackdrop>

      <div className="relative z-10 grid h-full grid-rows-[auto_1fr_auto] gap-3 px-5 pb-8 pt-5 sm:px-8 sm:pt-7 lg:px-12">
        <StageTitle
          eyebrow="Studio Profile"
          title="Company"
          hint="Unit kerja mandiri untuk pekerjaan desain dan pengembangan antarmuka."
        />

        <div className="grid min-h-0 grid-cols-1 gap-5 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:gap-12">
          {/* Blok merek. Nama, posisi, dan angka bukti berada dalam satu tarikan
              mata agar klaim dan buktinya tidak terpisah. Tidak dibungkus kartu —
              teksnya berdiri langsung di atas latar, dipisahkan hanya oleh satu
              bidang aksen miring di sisi kiri. */}
          <div className="relative flex min-h-0 flex-col justify-center pl-4">
            <span
              aria-hidden
              className="absolute bottom-6 left-0 top-6 w-[6px]"
              style={{ backgroundColor: STAGE.accent, clipPath: 'polygon(0 0, 100% 5%, 100% 95%, 0 100%)' }}
            />

            <h3
              className="font-serif font-black uppercase leading-[0.86] tracking-tighter"
              style={{ fontSize: TYPE.h3, color: STAGE.primary, transform: 'skewX(-6deg)' }}
            >
              {brand}
            </h3>

            <p
              className="mt-2 font-mono uppercase leading-relaxed tracking-wider"
              style={{ fontSize: TYPE.micro, color: STAGE.warm }}
            >
              {tagline}
            </p>

            <p
              className="mt-3 max-w-[42ch] leading-snug"
              style={{ fontSize: TYPE.small, color: STAGE.paper, opacity: 0.68 }}
            >
              {positioning}
            </p>

            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
              {proofPoints.map((point) => (
                <div key={point.label}>
                  <div
                    className="font-serif font-black leading-none"
                    style={{ fontSize: 'clamp(1.2rem, 3.4vh, 2.2rem)', color: STAGE.highlight }}
                  >
                    {point.value}
                  </div>
                  <div
                    className="mt-0.5 font-mono uppercase tracking-wider"
                    style={{ fontSize: TYPE.micro, color: STAGE.paper, opacity: 0.5 }}
                  >
                    {point.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Kategori klien ditulis sebagai kategori, bukan nama perusahaan.
                Menyebut nama klien tanpa izin tertulis berisiko secara hukum dan
                profesional, sementara kategori sudah cukup menunjukkan cakupannya. */}
            <p
              className="mt-4 font-mono uppercase leading-relaxed tracking-wider"
              style={{ fontSize: TYPE.micro, color: STAGE.paper, opacity: 0.4 }}
            >
              Klien: {clientCategories.join(' · ')}
            </p>
          </div>

          {/* Kartu layanan berdiri di atas rel diagonal, masing-masing diputar
              menghadap titik tengah. perspective dipasang pada wadah ini, bukan
              pada kartunya — memasangnya pada elemen yang sama dengan rotate hanya
              menghasilkan bidang terjepit, bukan kedalaman. */}
          <div
            ref={railRef}
            role="tablist"
            aria-label="Layanan studio"
            onKeyDown={handleKeyDown}
            className="flex min-h-0 items-stretch gap-3 pt-[3vh] lg:gap-6 lg:pt-[6vh]"
            style={PERSPECTIVE_PARENT}
          >
            {services.map((service, index) => (
              <ModeCard
                key={service.code}
                service={service}
                index={index}
                total={services.length}
                isActive={index === activeIndex}
                onSelect={moveTo}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {/* Alur kerja sebagai satu pita ringkas, menjawab pertanyaan klien yang
              paling sering tidak diucapkan: saya harus terlibat di titik mana, dan
              berapa lama semuanya berlangsung. */}
          <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
            {workflow.map((stage, index) => (
              <li key={stage.step} className="flex items-center gap-1.5">
                <span
                  className="px-2.5 py-[3px] font-mono font-black uppercase tracking-wider"
                  style={{
                    fontSize: TYPE.micro,
                    backgroundColor: index === 0 ? STAGE.primary : 'rgba(25,227,177,0.16)',
                    color: index === 0 ? STAGE.ink : STAGE.primary,
                    clipPath: 'polygon(0 0, 100% 0, calc(100% - 9px) 100%, 0 100%)',
                  }}
                >
                  {stage.step} {stage.name}
                </span>
                <span
                  className="font-mono uppercase tracking-wider"
                  style={{ fontSize: TYPE.micro, color: STAGE.paper, opacity: 0.45 }}
                >
                  {stage.duration}
                </span>
                {index < workflow.length - 1 && (
                  <span
                    aria-hidden
                    className="h-[7px] w-[7px]"
                    style={{ backgroundColor: STAGE.accent, clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}
                  />
                )}
              </li>
            ))}
          </ol>

          <StagePager
            count={services.length}
            activeIndex={activeIndex}
            pageLabel={pageLabel}
            onPrev={goPrev}
            onNext={goNext}
            itemNoun="Layanan"
          />
        </div>
      </div>
    </SectionShell>
  );
}
