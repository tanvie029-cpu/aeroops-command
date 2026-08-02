import type { ReactNode } from "react";
import {
  Radar,
  AlertOctagon,
  Gauge,
  Boxes,
  History,
  ClipboardList,
} from "lucide-react";
import type {
  GateEventRecord,
  BaggageRecord,
  MaintenanceLogRecord,
} from "../../services/csvLoader";
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

interface InvestigationData {
  incident: ActiveIncident;
  gateEvents: GateEventRecord[];
  baggage?: BaggageRecord;
  maintenance?: MaintenanceLogRecord;
}
interface InvestigationPanelProps {
  investigationData: InvestigationData | null;
}

export function InvestigationPanel({
  investigationData,
}: InvestigationPanelProps) {
  const hasActiveInvestigation = investigationData !== null;
  const incident = investigationData?.incident;

  let recommendation = "Continue normal operations.";

if (investigationData?.maintenance) {
  recommendation = "Dispatch engineering team immediately.";
} else if (incident?.severity === "critical") {
  recommendation = "Notify passengers and airport operations immediately.";
} else if (
  investigationData?.baggage &&
  investigationData.baggage.status !== "Loaded"
) {
  recommendation = "Hold departure until baggage clearance.";
} else if (investigationData?.gateEvents.length) {
  recommendation = "Continue gate monitoring and boarding operations.";
}

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
        {hasActiveInvestigation && incident ? (
          <div className="flex flex-col">
            <InvestigationSection icon={<AlertOctagon className="h-3.5 w-3.5" />} title="Primary Incident">
              <p>Incident: {incident.id}</p>
              {incident.type && <p>Type: {incident.type}</p>}
              {incident.flightId && <p>Flight: {incident.flightId}</p>}
            </InvestigationSection>

            <InvestigationSection icon={<Gauge className="h-3.5 w-3.5" />} title="Operational Impact">
              <div className="flex flex-wrap gap-2">
  <span
    className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-wider ${
      incident.severity === "critical"
        ? "bg-red-600 text-white"
        : incident.severity === "high"
        ? "bg-orange-500 text-white"
        : incident.severity === "medium"
        ? "bg-yellow-500 text-black"
        : "bg-emerald-600 text-white"
    }`}
  >
    {incident.severity}
  </span>

  <span
    className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-wider ${
      incident.status === "resolved"
        ? "bg-emerald-600 text-white"
        : "bg-blue-600 text-white"
    }`}
  >
    {incident.status}
  </span>
</div>
            </InvestigationSection>

            <InvestigationSection icon={<Boxes className="h-3.5 w-3.5" />} title="Affected Resources">
              <p>Gate: {incident.gate}</p>

            {investigationData?.baggage ? (
                <>
            <div className="mt-2 rounded-md border border-slate-700 bg-slate-900 p-2">
  <p className="text-[10px] uppercase tracking-widest text-slate-500">
    Baggage
  </p>

  <p className="mt-1 font-medium">
    {investigationData.baggage.status}
  </p>

  <p className="text-[11px] text-slate-500">
    Location • {investigationData.baggage.location}
  </p>
</div>
               </> 
            ) : (
            <p className="text-slate-500">No baggage information.</p>
              )}

            {investigationData?.maintenance ? (
             <>
           <div className="mt-2 rounded-md border border-slate-700 bg-slate-900 p-2">
  <p className="text-[10px] uppercase tracking-widest text-slate-500">
    Maintenance
  </p>

  <p className="mt-1 font-medium">
    {investigationData.maintenance.maintenanceType}
  </p>

  <p className="text-[11px] text-red-400">
    {investigationData.maintenance.issue}
  </p>
</div>
              </>
            ) : (
            <p className="text-slate-500">No maintenance records.</p>
            )}
            </InvestigationSection>

            <InvestigationSection
  icon={<History className="h-3.5 w-3.5" />}
  title="Event Timeline"
>
  {investigationData?.gateEvents.length ? (
    investigationData.gateEvents.map((event) => (
      <div
        key={event.eventId}
        className="mb-2 rounded-md border border-slate-800 bg-slate-900 p-2"
      >
        <p className="font-medium text-slate-100">
          {event.eventType}
        </p>

        <p className="mt-1 text-[11px] text-slate-500">
          {event.timestamp}
        </p>
      </div>
    ))
  ) : (
    <p className="text-slate-500">
      No gate events available.
      Monitoring live airport feed...
    </p>
  )}
</InvestigationSection>

            <InvestigationSection icon={<ClipboardList className="h-3.5 w-3.5" />} title="Recommended Action">
              <div className="rounded-md border border-cyan-700 bg-cyan-950/30 p-3">
  <p className="rounded-md border border-cyan-700 bg-cyan-950/30 p-3 font-medium text-cyan-300">{recommendation}</p>
</div>
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