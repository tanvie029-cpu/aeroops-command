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

function mapRowToBaggage(row: RawRow): BaggageRecord {
  return {
    baggageId: row[0],
    flightId: row[2],
    location: row[7],
    status: row[11],
    lastScan: row[15],
  };
}

function mapRowToMaintenance(row: RawRow): MaintenanceLogRecord {
  return {
    workOrderId: row[0],
    aircraftId: row[1],
    flightId: row[2],
    maintenanceType: row[3],
    issue: row[9],
    completed: toBoolean(row[13]),
  };
}

export interface AirportData {
  flights: FlightRecord[];
  gateEvents: GateEventRecord[];
  baggage: BaggageRecord[];
  maintenanceLogs: MaintenanceLogRecord[];
}

export async function loadAirportData(): Promise<AirportData> {
 const [flightRows, gateEvents, baggage, maintenanceLogs] = await Promise.all([
  parseRawCsvFromUrl("/data/flights.csv"),
  parseRawCsvFromUrl("/data/gate_events.csv"),
  parseRawCsvFromUrl("/data/baggage.csv"),
  parseRawCsvFromUrl("/data/maintenance_logs.csv"),
]);

const flights = flightRows
  .slice(1)
  .map(mapRowToFlightRecord);

const gateEventsData = gateEvents
  .slice(1)
  .map(mapRowToGateEvent);
  
const baggageData = (baggage as RawRow[])
  .slice(1)
  .map(mapRowToBaggage);  

const maintenanceData = maintenanceLogs
  .slice(1)
  .map(mapRowToMaintenance);  

  return {
  flights,
  gateEvents: gateEventsData,
  baggage: baggageData,
  maintenanceLogs: maintenanceData,
};
}