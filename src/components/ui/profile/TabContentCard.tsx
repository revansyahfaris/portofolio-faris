import { memo } from 'react';
import type { CSSProperties } from 'react';
import { Terminal, Layers, Cpu } from 'lucide-react';
import { SectionCard } from './SectionCard';
import { CapabilityBadge } from './CapabilityBadge';
import { TechItem } from './TechItem';
import { EquipmentCard } from './EquipmentCard';
import { CAPABILITIES, TECH_STACK, EQUIPMENT } from './constants';
import type { TabType } from './types';

const TAB_CONTENT_STYLE: CSSProperties = {
  transform:
    'perspective(400px) rotateY(28deg) rotateX(0deg) rotateZ(8deg) translateZ(-40px) translateX(250px) translateY(80px) scale(0.9)',
};

const StatusTabContent = memo(function StatusTabContent() {
  return (
    <>
      <h4 className="font-serif font-black text-xs text-emerald-400 tracking-[0.2em] uppercase flex items-center gap-2 border-b border-zinc-700 pb-1.5 max-w-md">
        <Terminal size={14} /> CORE CAPABILITIES
      </h4>
      <div className="flex flex-wrap gap-2 sm:gap-2.5 font-mono text-xs max-w-xl py-1">
        {CAPABILITIES.map((capability) => (
          <CapabilityBadge key={capability.name} capability={capability} />
        ))}
      </div>
    </>
  );
});

const ParamsTabContent = memo(function ParamsTabContent() {
  return (
    <>
      <h4 className="font-serif font-black text-xs text-emerald-400 tracking-[0.2em] uppercase flex items-center gap-2 border-b border-zinc-700 pb-1.5 max-w-md">
        <Layers size={14} /> PRIMARY TECH STACK
      </h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-xs max-w-lg py-1">
        {TECH_STACK.map((tech) => (
          <TechItem key={tech} tech={tech} />
        ))}
      </div>
    </>
  );
});

const EquipmentTabContent = memo(function EquipmentTabContent() {
  return (
    <>
      <h4 className="font-serif font-black text-xs text-emerald-400 tracking-[0.2em] uppercase flex items-center gap-2 border-b border-zinc-700 pb-1.5 max-w-md">
        <Cpu size={14} /> ENGINEERING TOOLS
      </h4>
      <div className="grid grid-cols-2 gap-2 font-mono text-xs max-w-lg py-1">
        {EQUIPMENT.map((item) => (
          <EquipmentCard key={item.label} item={item} />
        ))}
      </div>
    </>
  );
});

export const TabContentCard = memo(function TabContentCard({ activeTab }: { activeTab: TabType }) {
  return (
    <SectionCard className="md:pl-4 w-full sm:max-w-[750px]" style={TAB_CONTENT_STYLE}>
      <div className="pr-20 sm:pr-32 md:pr-40 lg:pr-12 max-w-[100%] flex flex-col gap-3">
        {activeTab === 'status' && <StatusTabContent />}
        {activeTab === 'params' && <ParamsTabContent />}
        {activeTab === 'equipment' && <EquipmentTabContent />}
      </div>
    </SectionCard>
  );
});
