import type { Agencies } from "./agencies";
import type { Routes } from "./routes";
import type { StopInfo } from "./stops";

export const AGENCY_ID = 603;
export const API_URL = "https://feeds.transloc.com/3";

export class Transloc {
  private apiURL: URL;
  private agencyId: number;

  constructor(api_url: string = API_URL, agency_id: number) {
    this.apiURL = new URL(api_url);
    this.apiURL.searchParams.set("agencies", agency_id.toString());
    this.agencyId = agency_id;
  }

  async getRoutes() {
    const url = new URL("/routes", this.apiURL);
    const response = await fetch(url);
    const data = (await response.json()) as Routes;
    return data;
  }

  async getAgencies() {
    const url = new URL("/agencies", this.apiURL);
    const response = await fetch(url);
    const data = (await response.json()) as Agencies;
    return data;
  }

  async getStopInfo() {
    const url = new URL("/stops", this.apiURL);
    url.searchParams.set("include_routes", "true");
    const response = await fetch(url);
    const data = (await response.json()) as StopInfo;
    return data;
  }

  async getVehicleStatus() {
    const url = new URL("/vehicles", this.apiURL);
    url.searchParams.set("include_status", "true");
    const response = await fetch(url);
    const data = (await response.json()) as StopInfo;
    return data;
  }

  static filterStopsByRoute(data: StopInfo, routeId: number) {
    const route = data.routes.find((route) => route.id === routeId);
    if (!route) {
      return null;
    }
    const stops = data.stops.filter((stop) => route.stops.includes(stop.id));
    return stops;
  }

  static filterRoutesByStop(data: StopInfo, stopId: number) {
    const routes = data.routes.filter((route) => route.stops.includes(stopId));

    return routes;
  }
}

export * from "./agencies";
export * from "./routes";
export * from "./stops";
export * from "./vehicle-status";
