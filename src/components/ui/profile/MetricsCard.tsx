import { memo } from 'react';
import type { CSSProperties } from 'react';
import { GitCommit, FolderCheck } from 'lucide-react';
import { SectionCard } from './SectionCard';
import { MetricCard } from './MetricCard';
import { GpaCard } from './GpaCard';
import { CURRENT_GPA, MAX_GPA, GPA_PERCENTAGE, FALLBACK_COMMIT_COUNT } from './constants';

const METRICS_STYLE: CSSProperties = {
  transform:
    'perspective(400px) rotateY(28deg) rotateX(4deg) rotateZ(-20deg) translateZ(-40px) translateX(400px) translateY(-15px) scale(1)',
};

interface MetricsCardProps {
  commitCount: number | null;
  loadingCommits: boolean;
}

export const MetricsCard = memo(function MetricsCard({ commitCount, loadingCommits }: MetricsCardProps) {
  return (
    <SectionCard className="md:pl-2 w-full sm:max-w-[700px]" style={METRICS_STYLE}>
      <div className="pr-20 sm:pr-32 md:pr-40 lg:pr-16 max-w-[55%]">
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-1 font-mono">
          <MetricCard
            icon={GitCommit}
            iconColorClass="text-cyan-400"
            borderColorClass="border-cyan-400"
            valueColorClass="text-cyan-400"
            label="COMMITS"
          >
            {loadingCommits ? (
              <span className="text-xs text-zinc-500 animate-pulse">FETCHING...</span>
            ) : (
              <>
                {(commitCount ?? FALLBACK_COMMIT_COUNT).toLocaleString()}
                <span className="text-xs text-cyan-300 font-normal">+</span>
              </>
            )}
          </MetricCard>

          <MetricCard
            icon={FolderCheck}
            iconColorClass="text-emerald-400"
            borderColorClass="border-emerald-400"
            valueColorClass="text-emerald-400"
            label="PROJECTS"
          >
            20<span className="text-xs text-emerald-300 font-normal">+ DONE</span>
          </MetricCard>

          <GpaCard currentGpa={CURRENT_GPA} maxGpa={MAX_GPA} gpaPercentage={GPA_PERCENTAGE} />
        </div>
      </div>
    </SectionCard>
  );
});
