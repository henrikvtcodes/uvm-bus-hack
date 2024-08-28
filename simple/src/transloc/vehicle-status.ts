import { API_URL, AGENCY_ID } from "../constants";

export interface VehicleStatus {
  agency_service_statuses: Status[];
  arrivals: Arrival[];
  success: boolean;
  vehicles: Vehicle[];
}

export interface Status {
  agency_id: number;
  vehicle_arrivals_pct: number;
  scheduled_arrivals_pct: number;
}

export interface Arrival {
  agency_id: number;
  vehicle_id: number;
  call_name: string;
  stop_id: number;
  route_id: number;
  trip_id: any;
  timestamp: number;
  type: string;
  distance: number;
  headsign: any;
}

export interface Vehicle {
  id: number;
  num_cars: unknown;
  service_status: string;
  agency_id: number;
  route_id: number;
  trip_id: any;
  TripStart: string;
  TripEnd: string;
  gtfs_trip_id: string;
  direction: boolean;
  stop_pattern_id: number;
  call_name: string;
  current_stop_id: any;
  next_stop: number;
  arrival_status: string;
  position: number[];
  heading: number;
  speed: number;
  segment_id: number;
  off_route: boolean;
  timestamp: number;
  load: any;
  apc_status: string;
}

export async function getVehicleStatuses() {
  const response = await fetch(
    `${API_URL}/vehicle_statuses?agencies=${AGENCY_ID}&include_arrivals=true`
  );
  const data = await response.json();
  return data;
}
