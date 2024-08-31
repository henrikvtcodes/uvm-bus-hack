import { queryOptions } from "@tanstack/react-query";
import {
  Stop,
  getETAs,
  getRouteStops,
  getRoutes,
  getStops,
  getVehicles,
} from "peaktransit";

export const getBusesQuery = queryOptions({
  queryKey: ["buses", "realtime"],
  queryFn: getVehicles,
  refetchInterval: 500,
});

export const getStopsQuery = queryOptions({
  queryKey: ["stops"],
  queryFn: getStops,
});

export const getEtasQuery = queryOptions({
  queryKey: ["etas", "realtime"],
  queryFn: getETAs,
  refetchInterval: 500,
});

export const getRoutesQuery = queryOptions({
  queryKey: ["routes"],
  queryFn: getRoutes,
});

export const getRouteStopsQuery = queryOptions({
  queryKey: ["routeStops"],
  queryFn: getRouteStops,
});
