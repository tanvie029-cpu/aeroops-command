import Papa from "papaparse";
import type {
  FlightRecord,
  GateEventRecord,
  BaggageRecord,
  MaintenanceLogRecord,
} from "./csvLoader";

type RawRow = string[];

function parseRawCsvFromUrl(url: string): Promise<RawRow[]> {
  return new Promise((resolve, reject) => {
    Papa.parse<RawRow>(url, {
      header: false,
      skipEmptyLines: true,
      download: true,
      complete: (results) => resolve(results.data),
      error: (error: Error) => reject(error),
    });
  });
}

function toNumber(value: string): number {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function toBoolean(value: string): boolean {
  return value.trim().toLowerCase() === "true";
}

function mapRowToFlightRecord(row: RawRow): FlightRecord {
  return {
    flightId: row[0],
    airline: row[1],
    airlineCode: row[2],
    originAirport: row[3],
    destinationAirport: row[4],
    scheduledDeparture: row[5],
    actualDeparture: row[6],
    scheduledArrival: row[7],
    actualArrival: row[8],
    aircraftType: row[9],
    aircraftRegistration: row[10],
    aircraftCapacity: toNumber(row[11]),
    passengerCount: toNumber(row[12]),
    flightStatus: row[13],
    delayMinutes: toNumber(row[14]),
    delayReason: row[15],
    terminal: row[16],
    gate: row[17],
    internationalFlight: toBoolean(row[18]),
    routeDistanceKm: toNumber(row[19]),
    operationalMetric: toNumber(row[20]),
    lastUpdated: row[21],
    boardingCompleted: toBoolean(row[22]),
    weatherCondition: row[23],
    operationalScore: toNumber(row[24]),
    utilizationScore: toNumber(row[25]),
    shift: row[26],
    dayOfWeek: row[27],
    holiday: toBoolean(row[28]),
    season: row[29],
    routeCategory: row[30],
    reservedField: row[31],
  };
}

function mapRowToGateEvent(row: RawRow): GateEventRecord {
  return {
    eventId: row[0],
    flightId: row[1],
    gate: row[2],
    eventType: row[4],
    timestamp: row[5],
  };
}

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
 const [flightRows, gateEvents, baggage, maintenanceLogs] = await Promise.all([
  parseRawCsvFromUrl("/data/flights.csv"),
  parseRawCsvFromUrl("/data/gate_events.csv"),
  parseCsvFromUrl<BaggageRecord>("/data/baggage.csv"),
  parseCsvFromUrl<MaintenanceLogRecord>("/data/maintenance_logs.csv"),
]);

const flights = flightRows
  .slice(1)
  .map(mapRowToFlightRecord);

const gateEventsData = gateEvents
  .slice(1)
  .map(mapRowToGateEvent);  

  return {
  flights,
  gateEvents: gateEventsData,
  baggage,
  maintenanceLogs,
};
}