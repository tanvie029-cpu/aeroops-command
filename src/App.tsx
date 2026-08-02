import { useEffect, useMemo, useState } from "react";
import { MainLayout } from "./layouts/MainLayout";
import { Header } from "./components/layout/Header";
import { OperationsStatusBar } from "./components/layout/OperationsStatusBar";
import { OperationalAlerts } from "./components/alerts/OperationalAlerts";
import { AirportSurface } from "./components/surface/AirportSurface";
import { InvestigationPanel } from "./components/investigation/InvestigationPanel";
import { loadAirportData, type AirportData } from "./services/loadAirportData";
import {OperationalTimeline,TimelineEvent,} from "./components/timeline/OperationalTimeline";
import type {GateEventRecord,BaggageRecord,MaintenanceLogRecord,} from "./services/csvLoader";

type IncidentSeverity = "low" | "medium" | "high" | "critical";
type IncidentStatus = "open" | "acknowledged" | "resolved";
type GateStatus = "normal" | "boarding" | "delayed" | "inactive";

export interface ActiveIncident {
  id: string;
  flightId: string;
  gate: string;
  type: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
}

interface InvestigationData {
  incident: ActiveIncident;
  gateEvents: GateEventRecord[];
  baggage?: BaggageRecord;
  maintenance?: MaintenanceLogRecord;
}

function App() {
  const [investigationData, setInvestigationData] =useState<InvestigationData | null>(null);
  const [airportData, setAirportData] = useState<AirportData | null>(null);
  const [isLoadingAirportData, setIsLoadingAirportData] = useState(true);
  const [airportDataError, setAirportDataError] = useState<string | null>(null);
  const [selectedGateId, setSelectedGateId] = useState<string | null>(null);
  const uniqueGates = useMemo(
  () => [...new Set(airportData?.flights.map((f) => f.gate) ?? [])].sort(),
  [airportData?.flights]
);

const gateStatusMap = useMemo(() => {
  const map: Record<string, GateStatus> = {};

  airportData?.flights.forEach((flight) => {
    let status: GateStatus = "normal";

    if (flight.delayMinutes >= 30) {
      status = "delayed";
    } else if (flight.flightStatus === "Boarding") {
      status = "boarding";
    } else if (
      flight.flightStatus === "Departed" ||
      flight.flightStatus === "Arrived"
    ) {
      status = "inactive";
    }

    map[flight.gate] = status;
  });

  return map;
}, [airportData?.flights]);

const activeFlights = airportData?.flights.length ?? 0;

const criticalAlerts =
  airportData?.flights.filter(
    (flight) => flight.delayMinutes >= 60
  ).length ?? 0;

const weather =
  airportData?.flights[0]?.weatherCondition ?? "--";

  function deriveSeverity(delayMinutes: number): IncidentSeverity {
  if (delayMinutes >= 60) return "critical";
  if (delayMinutes >= 30) return "high";
  if (delayMinutes >= 10) return "medium";
  return "low";
}

const handleGateSelect = (gateId: string) => {
  setSelectedGateId(gateId);

  const matchingFlight = airportData?.flights.find(
    (flight) => flight.gate === gateId
  );

  if (!matchingFlight) {
  setInvestigationData(null);
  return;
}

  const incident: ActiveIncident = {
  id: matchingFlight.flightId,
  flightId: matchingFlight.flightId,
  gate: matchingFlight.gate,
  type: matchingFlight.delayReason,
  severity: deriveSeverity(matchingFlight.delayMinutes),
  status:
    matchingFlight.flightStatus === "Departed" ||
    matchingFlight.flightStatus === "Arrived"
      ? "resolved"
      : "open",
};

const gateEvents = airportData?.gateEvents.filter(
  (event) => event.flightId === incident.flightId
) ?? [];

const baggage = airportData?.baggage.find(
  (bag) => bag.flightId === incident.flightId
);

const maintenance = airportData?.maintenanceLogs.find(
  (log) => log.flightId === incident.flightId
);

setInvestigationData({
  incident,
  gateEvents,
  baggage,
  maintenance,
});
};


  
  useEffect(() => {
  let isCancelled = false;

  async function fetchData() {
    try {
      const data = await loadAirportData();
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

function formatDelay(minutes: number) {
  if (minutes < 60) return `${minutes} min`;

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return mins === 0
    ? `${hours}h`
    : `${hours}h ${mins}m`;
}

  return (
    <MainLayout
      header={
  <>
    <Header healthStatus="healthy" currentTimeUtc="--:--" />

    <OperationsStatusBar
      airportHealth="Healthy"
      activeFlights={activeFlights.toString()}
      criticalAlerts={criticalAlerts.toString()}
      securityStatus="Normal"
      weather={weather}
      utcTime={new Date().toUTCString().slice(17, 22)}
    />
  </>
}


      operationalAlerts={
  <OperationalAlerts alertCount={criticalAlerts}>
    {airportData?.flights
      .filter((flight) => flight.delayMinutes >= 60)
      .slice(0, 8)
      .map((flight) => (
        <button
          key={flight.flightId}
          type="button"
          onClick={() => handleGateSelect(flight.gate)}
            className="w-full rounded-md border border-red-900 bg-red-950/20 p-2 text-left transition-all duration-200 hover:border-red-500 hover:bg-red-900/30 hover:shadow-lg hover:shadow-red-900/20">

          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-red-300">
              {flight.flightId}
            </span>

            <span className="text-[11px] text-red-400">
              {formatDelay(flight.delayMinutes)}
            </span>
          </div>

          <div className="mt-2 space-y-1">
  <p className="text-[11px] font-medium uppercase tracking-wide text-red-300">
    {flight.delayReason}
  </p>

  <p className="text-[11px] text-slate-400">
    Gate {flight.gate}
  </p>

  <p className="pt-1 text-[10px] uppercase tracking-wider text-red-500">
    → Open Investigation
  </p>
</div>
        </button>
      ))}
  </OperationalAlerts>
}

      airportSurface={
    <AirportSurface
    gates={uniqueGates}
    activeGateId={selectedGateId}
    onGateClick={handleGateSelect}
    gateStatusMap={gateStatusMap}
  />
}
      investigationPanel={
         <InvestigationPanel investigationData={investigationData} />
        }
        operationalTimeline={
  <OperationalTimeline>
    {airportData?.gateEvents
      .slice(0, 8)
      .map((event, index) => (
        <TimelineEvent
          key={event.eventId}
          timestampUtc={event.timestamp}
          status="normal"
          title={event.eventType}
          description={`${event.flightId} • Gate ${event.gate}`}
          isLast={index === Math.min(airportData.gateEvents.length, 8) - 1}
        />
      ))}
  </OperationalTimeline>
}
    />
  );
}

export default App;