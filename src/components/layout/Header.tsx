import { Bell, Search, Settings, SunMoon, Radio } from "lucide-react";

export type AirportHealthStatus = "healthy" | "warning" | "critical";

interface HeaderProps {
  healthStatus: AirportHealthStatus;
  currentTimeUtc: string;
  onThemeToggle?: () => void;
  onNotificationsClick?: () => void;
  onSettingsClick?: () => void;
}

const HEALTH_STYLES: Record<
  AirportHealthStatus,
  {
    label: string;
    dot: string;
    text: string;
    ring: string;
  }
> = {
  healthy: {
    label: "Healthy",
    dot: "bg-emerald-400",
    text: "text-emerald-300",
    ring: "ring-emerald-400/30",
  },
  warning: {
    label: "Warning",
    dot: "bg-amber-400",
    text: "text-amber-300",
    ring: "ring-amber-400/30",
  },
  critical: {
    label: "Critical",
    dot: "bg-red-400",
    text: "text-red-300",
    ring: "ring-red-400/30",
  },
};

export function Header({
  healthStatus,
  currentTimeUtc,
  onThemeToggle,
  onNotificationsClick,
  onSettingsClick,
}: HeaderProps) {
  const health = HEALTH_STYLES[healthStatus];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-4">
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold tracking-wide text-slate-100">
            AeroOps Command
          </span>
          <span className="text-[11px] uppercase tracking-widest text-slate-500">
            Airport Operations Control Center
          </span>
        </div>

        <div
          role="status"
          aria-label={`Airport health status: ${health.label}`}
          className={`hidden items-center gap-1.5 rounded-full border border-slate-800 bg-slate-950 px-2.5 py-1 ring-1 sm:flex ${health.ring}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${health.dot}`} aria-hidden="true" />
          <span className={`text-[11px] font-medium uppercase tracking-wide ${health.text}`}>
            {health.label}
          </span>
        </div>
      </div>

      <div className="order-3 flex w-full items-center gap-2 sm:order-2 sm:w-auto sm:max-w-xs sm:flex-1">
        <label htmlFor="ops-search" className="sr-only">
          Search operations
        </label>
        <div className="flex w-full items-center gap-2 rounded-md border border-slate-800 bg-slate-950 px-2.5 py-1.5 focus-within:border-slate-600">
          <Search className="h-3.5 w-3.5 shrink-0 text-slate-500" aria-hidden="true" />
          <input
            id="ops-search"
            type="search"
            placeholder="Search flights, gates, incidents..."
            className="w-full bg-transparent text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none"
          />
        </div>
      </div>

      <div className="order-2 flex items-center gap-3 sm:order-3">
        <div
          className="hidden items-center gap-1.5 rounded-md border border-slate-800 bg-slate-950 px-2.5 py-1 font-mono text-xs text-slate-300 md:flex"
          aria-label={`Current UTC time ${currentTimeUtc}`}
        >
          <Radio className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
          <span>{currentTimeUtc}</span>
          <span className="text-slate-600">UTC</span>
        </div>

        <div className="flex items-center gap-1 border-l border-slate-800 pl-3">
          <button
            type="button"
            onClick={onThemeToggle}
            aria-label="Toggle theme"
            className="rounded-md p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-600"
          >
            <SunMoon className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onNotificationsClick}
            aria-label="View notifications"
            className="rounded-md p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-600"
          >
            <Bell className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onSettingsClick}
            aria-label="Open settings"
            className="rounded-md p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-600"
          >
            <Settings className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}