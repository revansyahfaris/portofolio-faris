'use client';

import type { TabType } from './types';
import { TAB_LABELS, TABS } from './constants';

interface TopNavProps {
  readonly activeTab: TabType;
  readonly onSelectTab: (tab: TabType) => void;
  readonly onPrev: () => void;
  readonly onNext: () => void;
}

/** Navigasi tab di ProfileSection (bergaya kontrol gamepad: tombol LB/RB dan daftar tab). */
export const TopNav = ({ activeTab, onSelectTab, onPrev, onNext }: TopNavProps) => {
  return (
    <nav className="relative z-30 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-2 text-xs font-mono">
        <button
          onClick={onPrev}
          className="flex items-center gap-1 bg-zinc-900 border border-zinc-700 hover:border-red-500 text-zinc-300 px-3 py-1.5 -skew-x-12 transition cursor-pointer"
        >
          <span className="text-emerald-400 font-black">&lt; LB</span>
        </button>

        <div className="flex items-center gap-1 bg-zinc-950/80 border border-zinc-800 p-1 -skew-x-12">
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => onSelectTab(tab)}
                className={`px-3 py-1 text-[11px] font-bold uppercase transition cursor-pointer ${
                  isActive
                    ? 'bg-red-600 text-zinc-950 shadow-[0_0_15px_rgba(220,38,38,0.8)]'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                {TAB_LABELS[tab]}
              </button>
            );
          })}
        </div>

        <button
          onClick={onNext}
          className="flex items-center gap-1 bg-zinc-900 border border-zinc-700 hover:border-red-500 text-zinc-300 px-3 py-1.5 -skew-x-12 transition cursor-pointer"
        >
          <span className="text-emerald-400 font-black">RB &gt;</span>
        </button>
      </div>
    </nav>
  );
};

export default TopNav;