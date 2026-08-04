import { memo } from 'react';
import Image from 'next/image';
import { CLIP, Panel, PERSPECTIVE_PARENT, STAGE, TYPE } from '../shared/stage';
import type { Quest } from './types';

/**
 * Panel "potret" proyek yang sedang dipilih.
 *
 * Perannya sama seperti gambar besar pada layar pemilihan karakter: satu bidang
 * yang menyatakan pilihan saat ini dengan ukuran yang tidak mungkin terlewat.
 *
 * Metadata proyek — kode, kategori, status, tahun — seluruhnya dipindahkan ke sini
 * dan dikeluarkan dari panel rincian. Sebelumnya keempatnya muncul di dua tempat
 * sekaligus, dan pengulangan itulah salah satu penyebab utama layar terasa ramai:
 * mata harus menyaring informasi yang sama dua kali sebelum sampai ke isinya.
 *
 * Ruang gambar tetap dipesan meskipun berkas tangkapan layarnya belum ada, dengan
 * rasio yang sama. Tata letak tidak akan bergeser sedikit pun ketika gambarnya
 * nanti ditambahkan.
 */
export const QuestPortrait = memo(function QuestPortrait({ quest }: { readonly quest: Quest }) {
  const { code, title, category, status, year, image, imageAlt } = quest;

  return (
    <div className="h-full min-h-0" style={PERSPECTIVE_PARENT}>
      <Panel
        clip={CLIP.cut}
        fill={STAGE.inkSoft}
        shadow={STAGE.accent}
        offset={14}
        className="h-full min-h-0"
        style={{ transform: 'rotateY(6deg)' }}
        innerClassName="relative flex h-full min-h-0 flex-col overflow-hidden"
      >
        {/* Kode proyek raksasa sebagai bidang, bukan sebagai teks yang dibaca. */}
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-[4vh] -left-[1vw] z-10 font-serif font-black leading-none"
          style={{ fontSize: TYPE.giant, color: STAGE.primary, opacity: 0.1 }}
        >
          {code.replace('QST-', '')}
        </span>

        <div className="relative min-h-0 flex-1">
          {image ? (
            <Image
              src={image}
              alt={imageAlt ?? `Tangkapan layar proyek ${title}`}
              fill
              sizes="(max-width: 1024px) 100vw, 420px"
              className="object-cover"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center"
              style={{ backgroundColor: 'rgba(25,227,177,0.06)' }}
            >
              <span
                className="font-mono uppercase tracking-[0.3em]"
                style={{ fontSize: TYPE.micro, color: STAGE.primary, opacity: 0.3 }}
              >
                Visual menyusul
              </span>
            </div>
          )}
        </div>

        {/* Pita nama di dasar panel, meniru banner nama pada layar pemilihan karakter. */}
        <div className="relative z-20 shrink-0 px-4 py-3" style={{ backgroundColor: STAGE.primary }}>
          <span
            className="block font-mono font-black uppercase tracking-[0.3em]"
            style={{ fontSize: TYPE.micro, color: STAGE.ink, opacity: 0.7 }}
          >
            {code} · {category}
          </span>
          <span
            className="mt-0.5 block font-serif font-black uppercase leading-[0.9] tracking-tighter"
            style={{ fontSize: TYPE.h3, color: STAGE.ink }}
          >
            {title}
          </span>
          <span
            className="mt-1 inline-block px-2 py-[2px] font-mono font-black uppercase tracking-widest"
            style={{
              fontSize: TYPE.micro,
              backgroundColor: STAGE.ink,
              color: STAGE.primary,
              clipPath: 'polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%)',
            }}
          >
            {status} · {year}
          </span>
        </div>
      </Panel>
    </div>
  );
});
