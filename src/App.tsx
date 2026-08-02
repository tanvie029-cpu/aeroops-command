import { useEffect, useState } from "react";
import { MainLayout } from "./layouts/MainLayout";
import { Header } from "./components/layout/Header";
import { OperationsStatusBar } from "./components/layout/OperationsStatusBar";
import { OperationalAlerts } from "./components/alerts/OperationalAlerts";
import { AirportSurface } from "./components/surface/AirportSurface";
import { InvestigationPanel } from "./components/investigation/InvestigationPanel";
import { loadAirportData, type AirportData } from "./services/loadAirportData";

type IncidentSeverity = "low" | "medium" | "high" | "critical";
type IncidentStatus = "open" | "acknowledged" | "resolved";

export interface ActiveIncident {
  id: string;
  flightId: string;
  gate: string;
  type: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
}

function App() {
  const [activeIncident, setActiveIncident] = useState<ActiveIncident | null>(null);
  const [airportData, setAirportData] = useState<AirportData | null>(null);
  const [isLoadingAirportData, setIsLoadingAirportData] = useState(true);
  const [airportDataError, setAirportDataError] = useState<string | null>(null);

  const handleGateSelect = (gateId: string) => {
  setActiveIncident({
   id: "INC-001",
   flightId: "AI203",
   gate: gateId,
   type: "Baggage Delay",
   severity: "critical",
   status: "open",
  });
  };
  
  useEffect(() => {
  let isCancelled = false;

  async function fetchData() {
    try {
      const data = await loadAirportData();

      console.table(data.flights.slice(0, 3));
      console.log(data.flights[0]);
      console.log("Gate Events:", data.gateEvents[0]);
      console.log("Baggage:", data.baggage[0]);
      console.log("Maintenance:", data.maintenanceLogs[0]);

      setAirportData(data);

      if (!isCancelled) {
        setAirportData(data);
      }
    } catch (error) {
      if (!isCancelled) {
        setAirportDataError(
          error instanceof Error
            ? error.message
            : "Failed to load airport data"
        );
      }
    } finally {
      if (!isCancelled) {
        setIsLoadingAirportData(false);
      }
    }
  }

  fetchData();

  return () => {
    isCancelled = true;
  };
}, []);

if (isLoadingAirportData) {
  return (
    <div className="flex h-screen items-center justify-center bg-slate-950 text-xs text-slate-500">
      Loading operational data...
    </div>
  );
}

if (airportDataError) {
  return (
    <div className="flex h-screen items-center justify-center bg-slate-950 text-xs text-red-400">
      {airportDataError}
    </div>
  );
}

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
         <InvestigationPanel activeIncident={activeIncident} />
        }
      operationalTimeline={
        <div className="text-xs text-slate-500">Operational Timeline Coming Soon</div>
      }
    />
  );
}

export default App;