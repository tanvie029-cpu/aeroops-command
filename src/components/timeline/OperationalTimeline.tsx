import type { ReactNode } from "react";
import { Circle } from "lucide-react";

export type TimelineEventStatus = "normal" | "warning" | "critical" | "resolved";

const STATUS_DOT_STYLES: Record<TimelineEventStatus, string> = {
  normal: "text-slate-500",
  warning: "text-amber-400",
  critical: "text-red-400",
  resolved: "text-emerald-400",
};

interface TimelineEventProps {
  timestampUtc: string;
  status: TimelineEventStatus;
  title: string;
  description?: string;
  isLast?: boolean;
}

export function TimelineEvent({
  timestampUtc,
  status,
  title,
  description,
  isLast = false,
}: TimelineEventProps) {
  return (
    <li className="relative flex gap-3 pl-1">
      <div className="flex flex-col items-center">
        <Circle
          className={`h-2.5 w-2.5 shrink-0 fill-current ${STATUS_DOT_STYLES[status]}`}
          aria-hidden="true"
        />
        {!isLast && <span className="mt-1 w-px flex-1 bg-slate-800" aria-hidden="true" />}
      </div>
      <div className="flex-1 pb-3">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-[11px] text-slate-500">{timestampUtc}</span>
          <span className="text-xs font-medium text-slate-200">{title}</span>
        </div>
        {description && <p className="mt-0.5 text-[11px] text-slate-500">{description}</p>}
      </div>
    </li>
  );
}

interface OperationalTimelineProps {
  children?: ReactNode;
}

export function OperationalTimeline({ children }: OperationalTimelineProps) {
  const hasEvents = children !== undefined && children !== null;

  return (
    <section aria-labelledby="operational-timeline-heading" className="flex h-full flex-col">
      <div className="border-b border-slate-800 px-3 py-2">
        <h2
          id="operational-timeline-heading"
          className="text-xs font-semibold uppercase tracking-widest text-slate-400"
        >
          Operational Timeline
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-2.5">
        {hasEvents ? (
          <ol className="flex flex-col">{children}</ol>
        ) : (
          <div className="flex h-full items-center justify-center py-4">
            <p className="text-xs text-slate-500">No operational events recorded</p>
          </div>
        )}
      </div>
    </section>
  );
}