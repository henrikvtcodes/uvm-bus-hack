export interface StopInfo {
  routes: StopRoute[];
  stops: Stop[];
  success: boolean;
}

export interface StopRoute {
  id: number;
  stops: number[];
}

export interface Stop {
  code: string;
  description: string;
  id: number;
  location_type: string;
  name: string;
  parent_station_id: any;
  position: number[];
  url: string;
}

export function filterStopsByRoute(data: StopInfo, routeId: number) {
  const route = data.routes.find((route) => route.id === routeId);
  if (!route) {
    return null;
  }
  const stops = data.stops.filter((stop) => route.stops.includes(stop.id));
  return stops;
}

export function filterRoutesByStop(data: StopInfo, stopId: number) {
  const routes = data.routes.filter((route) => route.stops.includes(stopId));

  return routes;
}
