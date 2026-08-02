import { ListFilter, ShieldCheck } from "lucide-react";

interface AlertsPanelProps {
  alertCount: number;
  children?: React.ReactNode;
  onFilterClick?: () => void;
}

export function AlertsPanel({ alertCount, children, onFilterClick }: AlertsPanelProps) {
  const hasAlerts = alertCount > 0;

  return (
    <section aria-labelledby="alerts-panel-heading" className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-slate-800 px-3 py-2.5">
        <div className="flex items-center gap-2">
          <h2
            id="alerts-panel-heading"
            className="text-xs font-semibold uppercase tracking-widest text-slate-400"
          >
            Alerts
          </h2>
          <span
            aria-label={`${alertCount} active alerts`}
            className="min-w-[1.25rem] rounded-full border border-slate-800 bg-slate-950 px-1.5 py-0.5 text-center text-[11px] font-medium text-slate-300"
          >
            {alertCount}
          </span>
        </div>

        <button
          type="button"
          onClick={onFilterClick}
          aria-label="Filter alerts"
          className="rounded-md p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-600"
        >
          <ListFilter className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-2.5">
        {hasAlerts ? (
          <div className="flex flex-col gap-2">{children}</div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 py-10 text-center">
            <ShieldCheck className="h-6 w-6 text-slate-600" aria-hidden="true" />
            <p className="text-xs text-slate-500">No active alerts</p>
          </div>
        )}
      </div>
    </section>
  );
}