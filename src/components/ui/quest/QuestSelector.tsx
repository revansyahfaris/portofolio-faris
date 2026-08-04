import { memo } from 'react';
import type { KeyboardEvent } from 'react';
import { CLIP, Panel, STAGE, TYPE } from '../shared/stage';
import type { Quest } from './types';

interface QuestSelectorProps {
  readonly quests: readonly Quest[];
  readonly activeIndex: number;
  readonly onSelect: (index: number) => void;
  readonly onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
}

/**
 * Kisi pemilih proyek, meniru deretan potret pada layar pemilihan karakter.
 *
 * Berbentuk mendatar dan diletakkan di dasar layar — berbeda dari rel vertikal pada
 * section lain — karena di sini pilihan berperan sebagai deret sejajar tanpa
 * peringkat, bukan daftar berurutan. Bentuk yang berbeda untuk hubungan yang
 * berbeda membantu pembaca menyimpulkan strukturnya tanpa dijelaskan.
 *
 * Tiap sel kini hanya memuat kode dan judul. Kategori dihapus dari sini karena
 * sudah tampil pada pita nama di panel potret — menampilkannya di dua tempat
 * membuat deret pemilih terlihat penuh padahal isinya sedikit.
 */
export const QuestSelector = memo(function QuestSelector({
  quests,
  activeIndex,
  onSelect,
  onKeyDown,
}: QuestSelectorProps) {
  return (
    <div
      role="tablist"
      aria-label="Daftar proyek"
      onKeyDown={onKeyDown}
      className="flex gap-2 overflow-x-auto"
    >
      {quests.map((quest, index) => {
        const isActive = index === activeIndex;

        return (
          <button
            key={quest.code}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`quest-panel-${quest.code}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelect(index)}
            className="min-w-[132px] flex-1 text-left transition-transform duration-200 ease-out"
            style={{ transform: isActive ? 'translate3d(0,-8px,0)' : undefined }}
          >
            <Panel
              clip={CLIP.blade}
              fill={isActive ? STAGE.primary : 'rgba(25,227,177,0.09)'}
              shadow={isActive ? STAGE.accent : undefined}
              offset={7}
              innerClassName="px-3.5 py-2"
            >
              <span
                className="block font-mono font-black uppercase tracking-[0.24em]"
                style={{ fontSize: TYPE.micro, color: isActive ? STAGE.accent : STAGE.primary }}
              >
                {quest.code}
              </span>
              <span
                className="mt-0.5 block truncate font-serif font-black uppercase leading-tight tracking-tight"
                style={{ fontSize: TYPE.small, color: isActive ? STAGE.ink : STAGE.paper }}
              >
                {quest.title}
              </span>
            </Panel>
          </button>
        );
      })}
    </div>
  );
});
