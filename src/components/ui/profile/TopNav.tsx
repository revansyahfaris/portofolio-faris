import { memo } from 'react';
import { sfx } from '../../../lib/sfx';
import { TABS, TAB_LABELS } from './constants';
import type { TabType } from './types';

interface TopNavProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onPrev: () => void;
  onNext: () => void;
}

export const TopNav = memo(function TopNav({ activeTab, onSelectTab, onPrev, onNext }: TopNavProps) {
  return (
    <header className="relative z-20 flex items-center justify-between w-full shrink-0">
      <div className="flex items-center gap-2 sm:gap-4">
        <button
          onClick={onPrev}
          onMouseEnter={() => sfx.playHover()}
          className="flex items-center gap-1 bg-zinc-900 border border-zinc-700 hover:border-emerald-500 px-2.5 py-1 -skew-x-12 text-xs font-mono font-bold text-zinc-300 transition cursor-pointer"
        >
          <span className="text-emerald-400 font-black">&lt; LB</span>
        </button>

        <div className="flex items-center gap-2 font-mono text-xs tracking-wider">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => onSelectTab(tab)}
              className={`px-3.5 py-1 -skew-x-12 transition-all cursor-pointer font-bold ${
                tab === 'equipment' ? 'hidden sm:block' : ''
              } ${
                activeTab === tab
                  ? 'bg-emerald-500 text-zinc-950 shadow-[0_0_15px_rgba(16,185,129,0.8)]'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white'
              }`}
            >
              {TAB_LABELS[tab]}
            </button>
          ))}
        </div>

        <button
          onClick={onNext}
          onMouseEnter={() => sfx.playHover()}
          className="flex items-center gap-1 bg-zinc-900 border border-zinc-700 hover:border-emerald-500 px-2.5 py-1 -skew-x-12 text-xs font-mono font-bold text-zinc-300 transition cursor-pointer"
        >
          <span className="text-emerald-400 font-black">RB &gt;</span>
        </button>
      </div>
    </header>
  );
});
