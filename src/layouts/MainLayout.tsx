import type { ReactNode } from "react";

interface MainLayoutProps {
  header: ReactNode;
  alertsPanel: ReactNode;
  operationsMap: ReactNode;
  incidentDetails: ReactNode;
  operationsTimeline: ReactNode;
}

export function MainLayout({
  header,
  alertsPanel,
  operationsMap,
  incidentDetails,
  operationsTimeline,
}: MainLayoutProps) {
  return (
    <div className="flex h-screen flex-col bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900 px-4 py-3">
        {header}
      </header>

      <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
        <aside
          aria-label="Alerts"
          className="order-2 w-full overflow-y-auto border-b border-slate-800 bg-slate-900 lg:order-1 lg:w-72 lg:border-b-0 lg:border-r"
        >
          {alertsPanel}
        </aside>

        <main
          aria-label="Airport Operations Map"
          className="order-1 flex-1 overflow-hidden bg-slate-950 lg:order-2"
        >
          {operationsMap}
        </main>

        <aside
          aria-label="Incident Details"
          className="order-3 w-full overflow-y-auto border-t border-slate-800 bg-slate-900 lg:w-80 lg:border-l lg:border-t-0"
        >
          {incidentDetails}
        </aside>
      </div>

      <footer
        aria-label="Operations Timeline"
        className="h-40 shrink-0 overflow-y-auto border-t border-slate-800 bg-slate-900 px-4 py-3"
      >
        {operationsTimeline}
      </footer>
    </div>
  );
}