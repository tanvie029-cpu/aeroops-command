import type { ReactNode } from "react";
import {
  Radar,
  AlertOctagon,
  Gauge,
  Boxes,
  History,
  ClipboardList,
} from "lucide-react";
import type { ActiveIncident } from "../../App";

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
  activeIncident: ActiveIncident | null;
}

export function InvestigationPanel({ activeIncident }: InvestigationPanelProps) {
  const hasActiveInvestigation = activeIncident !== null;

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
        {hasActiveInvestigation && activeIncident ? (
          <div className="flex flex-col">
            <InvestigationSection icon={<AlertOctagon className="h-3.5 w-3.5" />} title="Primary Incident">
              <p>Incident: {activeIncident.id}</p>
              {activeIncident.type && <p>Type: {activeIncident.type}</p>}
              {activeIncident.flightId && <p>Flight: {activeIncident.flightId}</p>}
            </InvestigationSection>
            <InvestigationSection icon={<Gauge className="h-3.5 w-3.5" />} title="Operational Impact">
              <p className="capitalize">Severity: {activeIncident.severity}</p>
              <p className="capitalize">Status: {activeIncident.status}</p>
            </InvestigationSection>
            <InvestigationSection icon={<Boxes className="h-3.5 w-3.5" />} title="Affected Resources">
              <p>Gate: {activeIncident.gate}</p>
            </InvestigationSection>
            <InvestigationSection icon={<History className="h-3.5 w-3.5" />} title="Event Timeline">
              <p>Awaiting operational event updates.</p>
            </InvestigationSection>
            <InvestigationSection icon={<ClipboardList className="h-3.5 w-3.5" />} title="Recommended Action">
              <p>Dispatch ground crew and notify gate operations.</p>
            </InvestigationSection>
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 px-4 py-10 text-center">
            <Radar className="h-6 w-6 text-slate-600" aria-hidden="true" />
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