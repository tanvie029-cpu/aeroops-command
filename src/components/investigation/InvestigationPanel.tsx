import type { ReactNode } from "react";
import {
  SearchCode,
  AlertOctagon,
  Gauge,
  Boxes,
  History,
  ClipboardList,
} from "lucide-react";

interface InvestigationSectionProps {
  icon: ReactNode;
  title: string;
  children?: ReactNode;
}

function InvestigationSection({ icon, title, children }: InvestigationSectionProps) {
  return (
    <section aria-labelledby={`investigation-${title}`} className="border-b border-slate-800 px-3 py-3 last:border-b-0">
      <div className="mb-2 flex items-center gap-1.5">
        <span className="text-slate-500" aria-hidden="true">
          {icon}
        </span>
        <h3
          id={`investigation-${title}`}
          className="text-[11px] font-semibold uppercase tracking-widest text-slate-400"
        >
          {title}
        </h3>
      </div>
      <div className="text-xs text-slate-300">{children}</div>
    </section>
  );
}

interface InvestigationPanelProps {
  hasActiveInvestigation: boolean;
  primaryIncident?: ReactNode;
  operationalImpact?: ReactNode;
  affectedResources?: ReactNode;
  eventTimeline?: ReactNode;
  recommendedAction?: ReactNode;
}

export function InvestigationPanel({
  hasActiveInvestigation,
  primaryIncident,
  operationalImpact,
  affectedResources,
  eventTimeline,
  recommendedAction,
}: InvestigationPanelProps) {
  return (
    <section aria-labelledby="investigation-panel-heading" className="flex h-full flex-col">
      <div className="border-b border-slate-800 px-3 py-2.5">
        <h2
          id="investigation-panel-heading"
          className="text-xs font-semibold uppercase tracking-widest text-slate-400"
        >
          Investigation
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {hasActiveInvestigation ? (
          <div className="flex flex-col">
            <InvestigationSection icon={<AlertOctagon className="h-3.5 w-3.5" />} title="Primary Incident">
              {primaryIncident}
            </InvestigationSection>
            <InvestigationSection icon={<Gauge className="h-3.5 w-3.5" />} title="Operational Impact">
              {operationalImpact}
            </InvestigationSection>
            <InvestigationSection icon={<Boxes className="h-3.5 w-3.5" />} title="Affected Resources">
              {affectedResources}
            </InvestigationSection>
            <InvestigationSection icon={<History className="h-3.5 w-3.5" />} title="Event Timeline">
              {eventTimeline}
            </InvestigationSection>
            <InvestigationSection icon={<ClipboardList className="h-3.5 w-3.5" />} title="Recommended Action">
              {recommendedAction}
            </InvestigationSection>
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 px-4 py-10 text-center">
            <SearchCode className="h-6 w-6 text-slate-600" aria-hidden="true" />
            <p className="text-xs font-medium text-slate-400">No active investigation</p>
            <p className="max-w-[15rem] text-[11px] leading-relaxed text-slate-600">
              Select a flight, gate, baggage event or security alert from the workspace to begin
              an investigation.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}