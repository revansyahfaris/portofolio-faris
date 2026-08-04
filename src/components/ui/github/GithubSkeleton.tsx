import { memo } from 'react';
import { STAGE, TYPE } from '../shared/stage';

/**
 * Keadaan sedang memuat untuk section GitHub.
 *
 * Bentuknya meniru tata letak akhir — plat identitas di kiri, deret batang
 * statistik di kanan, pita kontribusi di bawah — supaya tinggi elemen tidak berubah
 * begitu data tiba. Placeholder generik seperti "Loading..." akan membuat isi di
 * sekitarnya melompat saat data masuk, yang terhitung sebagai pergeseran tata letak.
 *
 * Kedipan memakai animasi opacity bawaan Tailwind, bukan gradien bergerak: hanya
 * menganimasikan opacity dan tidak memaksa browser menghitung ulang layout.
 */
export const GithubSkeleton = memo(function GithubSkeleton() {
  const block = { backgroundColor: 'rgba(25,227,177,0.09)' };

  return (
    <div aria-hidden className="flex h-full min-h-0 animate-pulse flex-col gap-3">
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-6 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)]">
        <div style={{ ...block, clipPath: 'polygon(0 0, calc(100% - 26px) 0, 100% 26px, 100% 100%, 0 100%)' }} />
        <div className="flex flex-col justify-center gap-3">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="h-[10px] w-full" style={block} />
          ))}
        </div>
      </div>
      <div className="h-[22vh] shrink-0" style={block} />
      <span
        className="shrink-0 font-mono uppercase tracking-[0.3em]"
        style={{ fontSize: TYPE.micro, color: STAGE.primary, opacity: 0.6 }}
      >
        Membaca berkas identitas...
      </span>
    </div>
  );
});
