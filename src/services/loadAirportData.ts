import Papa from "papaparse";
import type {
  FlightRecord,
  GateEventRecord,
  BaggageRecord,
  MaintenanceLogRecord,
} from "./csvLoader";

export interface AirportData {
  flights: FlightRecord[];
  gateEvents: GateEventRecord[];
  baggage: BaggageRecord[];
  maintenanceLogs: MaintenanceLogRecord[];
}

function parseCsvFromUrl<T>(url: string): Promise<T[]> {
  return new Promise((resolve, reject) => {
    Papa.parse<T>(url, {
      header: true,
      skipEmptyLines: true,
      download: true,
      complete: (results) => resolve(results.data),
      error: (error: Error) => reject(error),
    });
  });
}

export async function loadAirportData(): Promise<AirportData> {
  const [flights, gateEvents, baggage, maintenanceLogs] = await Promise.all([
    parseCsvFromUrl<FlightRecord>("/data/flights.csv"),
    parseCsvFromUrl<GateEventRecord>("/data/gate_events.csv"),
    parseCsvFromUrl<BaggageRecord>("/data/baggage.csv"),
    parseCsvFromUrl<MaintenanceLogRecord>("/data/maintenance_logs.csv"),
  ]);

  return { flights, gateEvents, baggage, maintenanceLogs };
}