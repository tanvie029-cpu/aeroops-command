// src/App.tsx
import { useState } from "react";
import { MainLayout } from "./layouts/MainLayout";
import { Header } from "./components/layout/Header";
import { OperationsStatusBar } from "./components/layout/OperationsStatusBar";
import { OperationalAlerts } from "./components/alerts/OperationalAlerts";
import { AirportSurface } from "./components/surface/AirportSurface";
import { InvestigationPanel } from "./components/investigation/InvestigationPanel";

type IncidentSeverity = "low" | "medium" | "high" | "critical";
type IncidentStatus = "open" | "acknowledged" | "resolved";

interface ActiveIncident {
  id: string;
  flightId: string;
  gate: string;
  type: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
}

function App() {
  const [activeIncident, setActiveIncident] = useState<ActiveIncident | null>(null);

  const handleGateSelect = (gateId: string) => {
    setActiveIncident({
      id: gateId,
      flightId: "",
      gate: gateId,
      type: "",
      severity: "low",
      status: "open",
    });
  };

  return (
    <MainLayout
      header={
        <>
          <Header healthStatus="healthy" currentTimeUtc="--:--" />
          <OperationsStatusBar
            airportHealth="Healthy"
            activeFlights="0"
            criticalAlerts="0"
            securityStatus="Normal"
            weather="--"
            utcTime="--:--"
          />
        </>
      }
      operationalAlerts={<OperationalAlerts alertCount={0} />}
      airportSurface={
        <AirportSurface
          activeGateId={activeIncident?.gate ?? null}
          onGateClick={handleGateSelect}
        />
      }
      investigationPanel={
        <InvestigationPanel hasActiveInvestigation={activeIncident !== null} />
      }
      operationalTimeline={
        <div className="text-xs text-slate-500">Operational Timeline Coming Soon</div>
      }
    />
  );
}

export default App;