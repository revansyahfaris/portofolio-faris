import { memo } from 'react';
import { STAGE, StageTag, TYPE } from '../shared/stage';
import type { AcademyProfile } from './types';

/** Ketiga jenis catatan akademik yang dapat ditampilkan pada panel kanan. */
export const ACADEMY_VIEWS = [
  { key: 'coursework', label: 'Mata Kuliah' },
  { key: 'roles', label: 'Peran Akademik' },
  { key: 'projects', label: 'Proyek' },
] as const;

export type AcademyViewKey = (typeof ACADEMY_VIEWS)[number]['key'];

/**
 * Panel catatan akademik, digambar seperti lembar buku tulis.
 *
 * Garis rusuk mendatar dan garis margin merah di sisi kiri dibuat dengan
 * repeating-linear-gradient, bukan dengan elemen berulang. Satu properti background
 * menggantikan puluhan node yang masing-masing punya biaya layout sendiri, dan
 * jarak garisnya otomatis menyesuaikan tanpa perlu dihitung ulang.
 *
 * Ketiga jenis catatan ditampilkan bergantian, bukan sekaligus. Alasannya
 * konsekuensi tata letak satu layar: daftar mata kuliah saja sudah belasan baris,
 * dan menumpuknya bersama peran akademik serta proyek akan melampaui tinggi layar
 * pada perangkat mana pun. Pemisahan ini kebetulan juga cocok dengan cara datanya
 * dibaca — ketiganya menjawab pertanyaan berbeda, dan jarang ada yang perlu
 * membaca ketiganya sekaligus.
 */
export const RecordPanel = memo(function RecordPanel({
  profile,
  view,
}: {
  readonly profile: AcademyProfile;
  readonly view: AcademyViewKey;
}) {
  const labelStyle = { fontSize: TYPE.micro, color: STAGE.accent };
  const bodyStyle = { fontSize: TYPE.small, color: STAGE.ink };

  return (
    <div
      id="acad-panel"
      role="tabpanel"
      className="h-full min-h-0 overflow-hidden pl-9 pr-5 py-4 sm:pr-7"
      style={{
        // Lapisan pertama: garis margin merah vertikal.
        // Lapisan kedua: garis rusuk mendatar bergaya kertas bergaris.
        backgroundImage: `
          linear-gradient(to right, transparent 27px, rgba(255,59,45,0.45) 27px, rgba(255,59,45,0.45) 28.5px, transparent 28.5px),
          repeating-linear-gradient(to bottom, transparent, transparent 25px, rgba(6,16,13,0.10) 25px, rgba(6,16,13,0.10) 26px)
        `,
      }}
    >
      <div className="h-full min-h-0 overflow-hidden">
        {view === 'coursework' && (
          <div className="grid h-full grid-cols-2 gap-x-5 gap-y-3 overflow-hidden">
            {profile.coursework.map((group) => (
              <div key={group.area}>
                <h4 className="font-mono font-black uppercase tracking-[0.18em]" style={labelStyle}>
                  {group.area}
                </h4>
                <ul className="mt-1 flex flex-col gap-[2px]">
                  {group.courses.map((course) => (
                    <li key={course} className="leading-[26px]" style={bodyStyle}>
                      {course}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {view === 'roles' && (
          <div className="flex h-full flex-col gap-3 overflow-hidden">
            {profile.roles.map((role) => (
              <div key={`${role.title}-${role.scope}`}>
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <span
                    className="font-serif font-black uppercase tracking-tight"
                    style={{ fontSize: TYPE.lead, color: STAGE.ink }}
                  >
                    {role.title}
                  </span>
                  <span className="font-mono uppercase tracking-wider" style={labelStyle}>
                    {role.scope}
                  </span>
                  <span
                    className="ml-auto font-mono tracking-wider"
                    style={{ fontSize: TYPE.micro, color: STAGE.ink, opacity: 0.5 }}
                  >
                    {role.period}
                  </span>
                </div>
                <p className="leading-[26px]" style={{ ...bodyStyle, opacity: 0.78 }}>
                  {role.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {view === 'projects' && (
          <div className="flex h-full flex-col gap-3 overflow-hidden">
            {profile.projects.map((project) => (
              <div key={project.title}>
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <span
                    className="font-serif font-black uppercase tracking-tight"
                    style={{ fontSize: TYPE.lead, color: STAGE.ink }}
                  >
                    {project.title}
                  </span>
                  <span className="font-mono uppercase tracking-wider" style={labelStyle}>
                    {project.course}
                  </span>
                </div>
                <p className="leading-[26px]" style={{ ...bodyStyle, opacity: 0.78 }}>
                  {project.description}
                </p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <StageTag key={tech} label={tech} on="light" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});
