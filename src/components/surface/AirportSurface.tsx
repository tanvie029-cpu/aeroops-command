import { Plane } from "lucide-react";
interface GateGroupProps {
  terminalLabel: string;
  gateIds: readonly string[];
  activeGateId?: string | null;
  onGateClick?: (gateId: string) => void;
}
function GateGroup({ terminalLabel, gateIds, activeGateId, onGateClick }: GateGroupProps) {
  return (
    <div className="border border-slate-800">
      <div className="border-b border-slate-800 bg-slate-900 px-2.5 py-1.5">
        <h3 className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
          {terminalLabel}
        </h3>
      </div>
      <div className="grid grid-cols-4 divide-x divide-slate-800">
        {gateIds.map((gateId) => {
          const isSelected = activeGateId === gateId;
          const commonClassName = `relative flex aspect-square flex-col items-center justify-center border-t border-slate-900 font-mono text-xs ${
            isSelected ? "bg-slate-800 text-slate-100" : "text-slate-300"
          }`;

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
              className={`${commonClassName} focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-600`}
            >
              <span aria-hidden="true" className="absolute top-0 h-1 w-3 -translate-y-1/2 bg-slate-700" />
              {gateId}
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
      <span className="font-mono text-[11px] uppercase tracking-widest text-slate-500">
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
        className="absolute left-6 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-slate-500"
      />
      <span className="relative bg-slate-900 px-3 font-mono text-sm font-semibold tracking-[0.2em] text-slate-200">
        {label}
      </span>
    </div>
  );
}
interface LegendItemProps {
  swatchClassName: string;
  label: string;
}

function LegendItem({ swatchClassName, label }: LegendItemProps) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={`h-2.5 w-2.5 border border-slate-700 ${swatchClassName}`} aria-hidden="true" />
      <span className="text-[11px] text-slate-400">{label}</span>
    </div>
  );
}

const TERMINAL_A_GATES = ["A1", "A2", "A3", "A4"] as const;
const TERMINAL_B_GATES = ["B1", "B2", "B3", "B4"] as const;


interface AirportSurfaceProps {
  activeGateId?: string | null;
  onGateClick?: (gateId: string) => void;
}

export function AirportSurface({
  activeGateId,
  onGateClick,
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
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <GateGroup terminalLabel="Terminal A" gateIds={TERMINAL_A_GATES} activeGateId={activeGateId} onGateClick={onGateClick}/>
          <GateGroup terminalLabel="Terminal B" gateIds={TERMINAL_B_GATES} activeGateId={activeGateId} onGateClick={onGateClick}/>
        </div>

        <div className="flex flex-col gap-2">
          <TaxiwayStrip label="Taxiway Alpha" />
          <RunwayStrip label="Runway 09/27" />
          <TaxiwayStrip label="Taxiway Bravo" />
        </div>
      </div>

      <footer aria-label="Surface legend" className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-slate-800 pt-2.5">
        <LegendItem swatchClassName="bg-emerald-500" label="Normal" />
        <LegendItem swatchClassName="bg-amber-500" label="Boarding" />
        <LegendItem swatchClassName="bg-red-500" label="Delayed" />
        <LegendItem swatchClassName="bg-blue-500" label="Taxiing" />
      </footer>
    </section>
  );
}