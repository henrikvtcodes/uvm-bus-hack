import { API_URL, AGENCY_ID } from "../constants";

export interface Agencies {
  agencies: Agency[];
  success: boolean;
}

export interface Agency {
  affiliated_agencies: any[];
  arrival_predictions: boolean;
  bounds: number[];
  color: string;
  has_notifications: boolean;
  has_schedules: boolean;
  has_trip_planning: boolean;
  id: number;
  location: string;
  long_name: string;
  name: string;
  position: number[];
  short_name: string;
  text_color: string;
  timezone: string;
  timezone_offset: number;
  url: string;
}

export async function getAgencies() {
  const response = await fetch(`${API_URL}/agencies?agencies=${AGENCY_ID}`);
  const data = await response.json<Agencies>();
  return data;
}
