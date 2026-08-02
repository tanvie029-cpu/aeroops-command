import type { ReactNode } from "react";
import {
  ShieldCheck,
  PlaneTakeoff,
  AlertTriangle,
  Lock,
  CloudSun,
  Clock,
} from "lucide-react";

interface StatusIndicatorProps {
  icon: ReactNode;
  label: string;
  value: string;
}

function StatusIndicator({ icon, label, value }: StatusIndicatorProps) {
  return (
    <div className="flex items-center gap-1.5 whitespace-nowrap">
      <span className="text-slate-500" aria-hidden="true">
        {icon}
      </span>
      <span className="text-[11px] uppercase tracking-wide text-slate-500">{label}</span>
      <span className="text-xs font-medium text-slate-200">{value}</span>
    </div>
  );
}

interface OperationsStatusBarProps {
  airportHealth: string;
  activeFlights: string;
  criticalAlerts: string;
  securityStatus: string;
  weather: string;
  utcTime: string;
}

export function OperationsStatusBar({
  airportHealth,
  activeFlights,
  criticalAlerts,
  securityStatus,
  weather,
  utcTime,
}: OperationsStatusBarProps) {
  return (
    <div
      role="status"
      aria-label="Operations status summary"
      className="flex min-h-[48px] flex-wrap items-center gap-x-6 gap-y-1.5 border-b border-slate-800 bg-slate-900 px-4 py-2"
    >
      <StatusIndicator
        icon={<ShieldCheck className="h-3.5 w-3.5" />}
        label="Airport Health"
        value={airportHealth}
      />
      <StatusIndicator
        icon={<PlaneTakeoff className="h-3.5 w-3.5" />}
        label="Active Flights"
        value={activeFlights}
      />
      <StatusIndicator
        icon={<AlertTriangle className="h-3.5 w-3.5" />}
        label="Critical Alerts"
        value={criticalAlerts}
      />
      <StatusIndicator
        icon={<Lock className="h-3.5 w-3.5" />}
        label="Security"
        value={securityStatus}
      />
      <StatusIndicator
        icon={<CloudSun className="h-3.5 w-3.5" />}
        label="Weather"
        value={weather}
      />
      <StatusIndicator
        icon={<Clock className="h-3.5 w-3.5" />}
        label="UTC"
        value={utcTime}
      />
    </div>
  );
}