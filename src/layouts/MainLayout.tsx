import type { ReactNode } from "react";

interface MainLayoutProps {
  header: ReactNode;
  operationalAlerts: ReactNode;
  airportSurface: ReactNode;
  investigationPanel: ReactNode;
  operationalTimeline: ReactNode;
}

export function MainLayout({
  header,
  operationalAlerts,
  airportSurface,
  investigationPanel,
  operationalTimeline,
}: MainLayoutProps) {
  return (
    <div className="flex h-screen flex-col bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900 px-4 py-3">
        {header}
      </header>

      <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
        <aside
          aria-label="Operational Alerts"
          className="order-2 w-full overflow-y-auto border-b border-slate-800 bg-slate-900 lg:order-1 lg:w-72 lg:border-b-0 lg:border-r"
        >
          {operationalAlerts}
        </aside>

        <main
          aria-label="Airport Surface"
          className="order-1 flex-1 overflow-y-auto bg-slate-950 lg:order-2"
        >
          {airportSurface}
        </main>

        <aside
          aria-label="Investigation Panel"
          className="order-3 w-full overflow-y-auto border-t border-slate-800 bg-slate-900 lg:w-80 lg:border-l lg:border-t-0"
        >
          {investigationPanel}
        </aside>
      </div>

      <footer
  aria-label="Operational Timeline"
  className="h-24 shrink-0 overflow-hidden border-t border-slate-800 bg-slate-900 px-4 py-2"
>
  {operationalTimeline}
</footer>
    </div>
  );
}