import Papa from "papaparse";

export interface FlightRecord {
  flightId: string;
  airline: string;
  airlineCode: string;
  originAirport: string;
  destinationAirport: string;
  scheduledDeparture: string;
  actualDeparture: string;
  scheduledArrival: string;
  actualArrival: string;
  aircraftType: string;
  aircraftRegistration: string;
  aircraftCapacity: number;
  passengerCount: number;
  flightStatus: string;
  delayMinutes: number;
  delayReason: string;
  terminal: string;
  gate: string;
  internationalFlight: boolean;
  routeDistanceKm: number;
  operationalMetric: number;
  lastUpdated: string;
  boardingCompleted: boolean;
  weatherCondition: string;
  operationalScore: number;
  utilizationScore: number;
  shift: string;
  dayOfWeek: string;
  holiday: boolean;
  season: string;
  routeCategory: string;
  reservedField: string;
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
  lastScan: string;
}

export interface MaintenanceLogRecord {
  workOrderId: string;
  aircraftId: string;
  flightId: string;
  maintenanceType: string;
  issue: string;
  completed: boolean;
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