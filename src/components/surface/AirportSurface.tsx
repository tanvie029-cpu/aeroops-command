import { Plane } from "lucide-react";
type GateStatus = "normal" | "boarding" | "delayed" | "inactive";

interface GateGroupProps {
  terminalLabel: string;
  gateIds: readonly string[];
  activeGateId?: string | null;
  onGateClick?: (gateId: string) => void;
  gateStatusMap?: Record<string, GateStatus>;
}
function GateGroup({ terminalLabel, gateIds, activeGateId, onGateClick, gateStatusMap }: GateGroupProps) {
  return (
    <div className="border border-slate-800">
      <div className="border-b border-slate-800 bg-slate-900 px-2.5 py-1.5">
        <h3 className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
          {terminalLabel}
        </h3>
      </div>
      <div className="grid grid-cols-4 gap-px bg-slate-800">
        {gateIds.map((gateId) => {
          const isSelected = activeGateId === gateId;
          const status = gateStatusMap?.[gateId];
          const statusClassName =
            status === "normal"
              ? "bg-emerald-500/10 text-emerald-300"
              : status === "boarding"
                ? "bg-amber-500/10 text-amber-300"
                : status === "delayed"
                  ? "bg-red-500/10 text-red-300"
                  : status === "inactive"
                    ? "bg-slate-800 text-slate-500"
                    : "text-slate-300";
          const commonClassName = `relative flex h-32 flex-col items-center justify-center border-t border-slate-900 font-mono text-xs ${statusClassName} ${
               isSelected? "relative z-10 ring-2 ring-cyan-400 ring-inset scale-[1.01]": ""}`;

          if (!onGateClick) {
            return (
              <div key={gateId} className={commonClassName}>
                <span aria-hidden="true" className="absolute top-0 h-1 w-3 -translate-y-1/2 bg-slate-700" />
                {gateId}
              </div>
            );
          }

          return (
            <button
              key={gateId}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onGateClick(gateId)}
              className={`${commonClassName} transition-all duration-200 hover:scale-[1.01] hover:brightness-110 hover:z-10 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400`} >
              <span aria-hidden="true" className="absolute top-0 h-1 w-3 -translate-y-1/2 bg-slate-700" />
<>
  <span
    className={`mb-2 h-3 w-3 rounded-full ${
      status === "delayed"
        ? "bg-red-500 animate-pulse"
        : status === "boarding"
        ? "bg-amber-400 animate-pulse"
        : status === "normal"
        ? "bg-emerald-400"
        : "bg-slate-600"
    }`}
  />

  <span className="font-semibold tracking-wide">
    {gateId}
  </span>

  <span className="mt-1 text-[9px] uppercase tracking-widest opacity-70">
    {status ?? "normal"}
  </span>
</>
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface TaxiwayStripProps {
  label: string;
}

function TaxiwayStrip({ label }: TaxiwayStripProps) {
  return (
    <div className="flex items-center gap-2 border-y border-dashed border-slate-800 py-1.5">
      <span className="font-mono text-[11px] uppercase tracking-widest text-slate-400">
        {label}
      </span>
      <span className="h-px flex-1 bg-slate-800" aria-hidden="true" />
    </div>
  );
}

interface RunwayStripProps {
  label: string;
}

function RunwayStrip({ label }: RunwayStripProps) {
  return (
    <div className="relative flex items-center justify-center overflow-hidden border-y-2 border-slate-700 bg-slate-900 py-4">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-center gap-3 px-4"
      >
        {Array.from({ length: 9 }).map((_, index) => (
          <span key={index} className="h-px w-6 bg-slate-600" />
        ))}
      </div>
      <Plane
        aria-hidden="true"
        className="absolute left-8 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-slate-400"
      />
      <span className="relative bg-slate-900 px-4 font-mono text-base font-bold tracking-[0.25em] text-slate-100">
        {label}
      </span>
      <p className="absolute bottom-1 text-[10px] uppercase tracking-widest text-emerald-400">
       Active
      </p>
    </div>
  );
}


interface AirportSurfaceProps {
  gates: readonly string[];
  activeGateId?: string | null;
  onGateClick?: (gateId: string) => void;
  gateStatusMap?: Record<string, GateStatus>;
}

export function AirportSurface({
  gates,
  activeGateId,
  onGateClick,
  gateStatusMap,
}: AirportSurfaceProps) {
  return (
    <section aria-labelledby="airport-surface-heading" className="flex h-full flex-col overflow-y-auto bg-slate-950 bg-[linear-gradient(to_right,rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:24px_24px] px-4 py-3">
      <header className="mb-3">
        <h2 id="airport-surface-heading" className="text-sm font-semibold text-slate-100">
          Airport Operations Surface
        </h2>
        <p className="text-[11px] uppercase tracking-widest text-slate-500">
          Live Operational Workspace
        </p>
      </header>

      <div className="flex flex-1 flex-col gap-3">
        <div>
   <GateGroup
  terminalLabel="Airport Gates"
  gateIds={gates}
  activeGateId={activeGateId}
  onGateClick={onGateClick}
  gateStatusMap={gateStatusMap}
/>
</div>

        <div className="flex flex-col gap-2">
          <TaxiwayStrip label="Taxiway Alpha" />
          <RunwayStrip label="Runway 09/27" />
          <TaxiwayStrip label="Taxiway Bravo" />
        </div>
      </div>
    </section>
  );
}