import { Plane } from "lucide-react";

type GateStatus = "normal" | "boarding" | "delayed" | "inactive";

interface GateGroupProps {
  terminalLabel: string;
  gateIds: readonly string[];
  activeGateId?: string | null;
  onGateClick?: (gateId: string) => void;
  gateStatusMap?: Record<string, GateStatus>;
}

function GateGroup({
  terminalLabel,
  gateIds,
  activeGateId,
  onGateClick,
  gateStatusMap,
}: GateGroupProps) {
  return (
    <div className="rounded-xl border border-slate-700 overflow-hidden">
      <div className="border-b border-slate-800 bg-slate-900 px-3 py-2">
        <h3 className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
          {terminalLabel}
        </h3>
      </div>

      <div className="grid grid-cols-6 gap-px bg-slate-800">
        {gateIds.map((gateId) => {
          const isSelected = activeGateId === gateId;
          const status = gateStatusMap?.[gateId];

          const statusClass =
            status === "normal"
              ? "bg-emerald-500/10 text-emerald-300"
              : status === "boarding"
              ? "bg-amber-500/10 text-amber-300"
              : status === "delayed"
              ? "bg-red-500/10 text-red-300"
              : "bg-slate-900 text-slate-500";
              
         if (gateId.startsWith("EMPTY-")) {
  return (
    <div
      key={gateId}
      className="h-12 bg-slate-900"
    />
  );
}
          return (
            <button
              key={gateId}
              type="button"
              onClick={() => onGateClick?.(gateId)}
              aria-pressed={isSelected}
              className={`
                relative
                flex
                h-12
                flex-col
                items-center
                justify-center
                bg-slate-950
                transition-all
                duration-150
                hover:brightness-110
                hover:border-cyan-400
                active:scale-[0.98]
                ${statusClass}
                ${isSelected ? "ring-2 ring-cyan-400 ring-inset z-10" : ""}
              `}
            >
              <span
                className={`mb-1 h-2 w-2 rounded-full ${
                  status === "delayed"
                    ? "bg-red-500 animate-pulse"
                    : status === "boarding"
                    ? "bg-amber-400 animate-pulse"
                    : status === "normal"
                    ? "bg-emerald-400"
                    : "bg-slate-600"
                }`}
              />

              <span className="font-semibold">
                {gateId}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TaxiwayStrip({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 border-y border-dashed border-slate-800 py-0.5">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
        {label}
      </span>

      <span className="h-px flex-1 bg-slate-800" />
    </div>
  );
}

function RunwayStrip({ label }: { label: string }) {
  return (
    <div className="relative flex items-center justify-center overflow-hidden border-y border-slate-700 bg-slate-900 py-2">
      <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center gap-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <span key={i} className="h-px w-6 bg-slate-600" />
        ))}
      </div>

      <Plane
        className="absolute left-6 h-4 w-4 rotate-90 text-slate-400"
      />

      <span className="relative bg-slate-900 px-4 font-mono text-sm font-bold tracking-[0.25em] text-white">
        {label}
      </span>

      <span className="absolute bottom-1 text-[10px] uppercase tracking-widest text-emerald-400">
        Active
      </span>
    </div>
  );
}

function fillTerminal(gates: string[], size: number) {
  return [
    ...gates,
    ...Array.from({ length: Math.max(0, size - gates.length) }, (_, i) => `EMPTY-${i}`),
  ];
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

const sortedGates = [...gates].sort((a, b) => {
  const numA = parseInt(a.replace(/\D/g, ""));
  const numB = parseInt(b.replace(/\D/g, ""));
  return numA - numB;   
});

const terminalA = fillTerminal(sortedGates.slice(0,12),12);
const terminalB = fillTerminal(sortedGates.slice(12,24),12);
const terminalC = fillTerminal(sortedGates.slice(24,36),12);
const terminalD = fillTerminal(sortedGates.slice(36),14);

  return (
    <section
      className="
      flex
      h-full
      flex-col
      overflow-hidden
      bg-slate-950
      bg-[linear-gradient(to_right,rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.06)_1px,transparent_1px)]
      bg-[size:24px_24px]
      px-4
      py-3
      "
    >
      <header className="mb-2">
        <h2 className="text-sm font-semibold text-white">
          Airport Surface Overview
        </h2>

        <p className="text-[11px] uppercase tracking-widest text-slate-500">
          Live Operational Workspace
        </p>
      </header>

      <div className="grid gap-2 lg:grid-cols-2">

        <GateGroup
          terminalLabel="Terminal A"
          gateIds={terminalA}
          activeGateId={activeGateId}
          onGateClick={onGateClick}
          gateStatusMap={gateStatusMap}
        />

        <GateGroup
          terminalLabel="Terminal B"
          gateIds={terminalB}
          activeGateId={activeGateId}
          onGateClick={onGateClick}
          gateStatusMap={gateStatusMap}
        />

        <GateGroup
          terminalLabel="Terminal C"
          gateIds={terminalC}
          activeGateId={activeGateId}
          onGateClick={onGateClick}
          gateStatusMap={gateStatusMap}
        />

        <GateGroup
          terminalLabel="Terminal D"
          gateIds={terminalD}
          activeGateId={activeGateId}
          onGateClick={onGateClick}
          gateStatusMap={gateStatusMap}
        />

      </div>

      <div className="mt-2 space-y-2">

        <TaxiwayStrip label="Taxiway Alpha" />

        <RunwayStrip label="Runway 09/27" />

        <TaxiwayStrip label="Taxiway Bravo" />

      </div>
    </section>
  );
}