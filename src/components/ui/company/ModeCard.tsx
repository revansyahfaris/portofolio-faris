import { memo } from 'react';
import { CLIP, Panel, STAGE, TYPE } from '../shared/stage';
import type { StudioService } from './types';

interface ModeCardProps {
  readonly service: StudioService;
  readonly index: number;
  readonly total: number;
  readonly isActive: boolean;
  readonly onSelect: (index: number) => void;
}

/**
 * Kartu layanan yang berdiri di atas rel diagonal.
 *
 * Tiap kartu diangkat lebih tinggi dari kartu sebelumnya sehingga ketiganya
 * mengikuti kemiringan rel yang digambar di latar. Nilai pengangkatan dihitung dari
 * indeks terhadap jumlah kartu, bukan ditulis satu per satu — menambah atau
 * mengurangi layanan tidak akan membuat susunannya lepas dari rel.
 *
 * Kartunya juga diputar pada sumbu Y dengan arah yang berbeda di kiri dan kanan,
 * sehingga ketiganya seolah menghadap satu titik di tengah. Sudutnya dihitung dari
 * jarak kartu terhadap pusat deret, bukan ditetapkan manual, agar tetap benar
 * berapa pun jumlah kartunya.
 *
 * Daftar keluaran hanya muncul pada kartu terpilih. Klien membaca bagian ini untuk
 * tahu apa yang akan mereka terima, dan menampilkan ketiga daftar sekaligus justru
 * mempersulit perbandingan: yang dibutuhkan adalah membaca satu layanan sampai
 * tuntas, bukan memindai sembilan butir sekaligus.
 */
export const ModeCard = memo(function ModeCard({
  service,
  index,
  total,
  isActive,
  onSelect,
}: ModeCardProps) {
  const lift = (index / Math.max(total - 1, 1)) * 11;
  // Posisi relatif terhadap pusat deret: -1 di ujung kiri, +1 di ujung kanan.
  const fromCenter = total > 1 ? (index / (total - 1)) * 2 - 1 : 0;
  const turn = -fromCenter * 13;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-controls={`comp-panel-${index}`}
      tabIndex={isActive ? 0 : -1}
      onClick={() => onSelect(index)}
      className="h-full min-h-0 flex-1 text-left transition-transform duration-200 ease-out"
      style={{
        transform: `translate3d(0, ${-lift}vh, 0) rotateY(${turn}deg) rotate(-5deg) ${
          isActive ? 'scale(1.06)' : ''
        }`,
      }}
    >
      <Panel
        clip={CLIP.cut}
        fill={isActive ? STAGE.primary : STAGE.inkSoft}
        shadow={isActive ? STAGE.accent : 'rgba(25,227,177,0.25)'}
        offset={isActive ? 12 : 5}
        className="h-full min-h-0"
        innerClassName="flex h-full min-h-0 flex-col overflow-hidden p-4"
      >
        <span
          className="font-mono font-black uppercase tracking-[0.3em]"
          style={{ fontSize: TYPE.micro, color: isActive ? STAGE.ink : STAGE.accent }}
        >
          {service.code}
        </span>

        <span
          className="mt-1 block font-serif font-black uppercase leading-[0.9] tracking-tighter"
          style={{ fontSize: TYPE.h3, color: isActive ? STAGE.ink : STAGE.paper }}
        >
          {service.name}
        </span>

        <span
          className="mt-1.5 block leading-snug"
          style={{
            fontSize: TYPE.small,
            color: isActive ? STAGE.ink : STAGE.paper,
            opacity: isActive ? 0.75 : 0.62,
          }}
        >
          {service.description}
        </span>

        {/* Daftar keluaran memuai lewat grid-template-rows, sehingga tingginya
            mengikuti isi sebenarnya tanpa angka yang ditebak. */}
        <span
          id={`comp-panel-${index}`}
          role="tabpanel"
          className="mt-auto grid transition-[grid-template-rows] duration-300 ease-out"
          style={{ gridTemplateRows: isActive ? '1fr' : '0fr' }}
        >
          <span className="overflow-hidden">
            <span className="mt-3 block pt-2">
              {service.deliverables.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-1.5 font-mono uppercase leading-relaxed tracking-wider"
                  style={{ fontSize: TYPE.micro, color: STAGE.ink }}
                >
                  <span
                    aria-hidden
                    className="h-[6px] w-[6px] shrink-0"
                    style={{ backgroundColor: STAGE.accent, clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}
                  />
                  {item}
                </span>
              ))}
            </span>
          </span>
        </span>
      </Panel>
    </button>
  );
});
