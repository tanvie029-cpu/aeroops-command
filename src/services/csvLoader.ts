import Papa from "papaparse";

export interface FlightRecord {
  flightId: string;
  airline: string;
  origin: string;
  destination: string;
  gate: string;
  scheduledTime: string;
  status: string;
}

export interface GateEventRecord {
  eventId: string;
  gate: string;
  flightId: string;
  eventType: string;
  timestamp: string;
}

export interface BaggageRecord {
  baggageId: string;
  flightId: string;
  status: string;
  location: string;
  timestamp: string;
}

export interface MaintenanceLogRecord {
  logId: string;
  assetId: string;
  description: string;
  status: string;
  timestamp: string;
}

function parseCsvFile<T>(file: File): Promise<T[]> {
  return new Promise((resolve, reject) => {
    Papa.parse<T>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => resolve(results.data),
      error: (error: Error) => reject(error),
    });
  });
}

export function parseFlightsCsv(file: File): Promise<FlightRecord[]> {
  return parseCsvFile<FlightRecord>(file);
}

export function parseGateEventsCsv(file: File): Promise<GateEventRecord[]> {
  return parseCsvFile<GateEventRecord>(file);
}

export function parseBaggageCsv(file: File): Promise<BaggageRecord[]> {
  return parseCsvFile<BaggageRecord>(file);
}

export function parseMaintenanceLogsCsv(file: File): Promise<MaintenanceLogRecord[]> {
  return parseCsvFile<MaintenanceLogRecord>(file);
}