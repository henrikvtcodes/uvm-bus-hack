import { queryOptions } from "@tanstack/react-query";
import {
  Stop,
  getETAs,
  getRouteShapes,
  getRouteStops,
  getRoutes,
  getStops,
  getVehicles,
} from "peaktransit";

export const getBusesQuery = queryOptions({
  queryKey: ["buses"],
  queryFn: getVehicles,
  refetchInterval: 500,
});

export const getStopsQuery = queryOptions({
  queryKey: ["stops"],
  queryFn: getStops,
  refetchInterval: 60 * 1000,
});

export const getEtasQuery = queryOptions({
  queryKey: ["etas"],
  queryFn: getETAs,
  refetchInterval: 1000,
});

export const getRoutesQuery = queryOptions({
  queryKey: ["routes"],
  queryFn: getRoutes,
  refetchInterval: 60 * 1000,
});

export const getRouteStopsQuery = queryOptions({
  queryKey: ["routeStops"],
  queryFn: getRouteStops,
  refetchInterval: 60 * 1000,
});

export const getRouteShapesQuery = queryOptions({
  queryKey: ["routeShapes"],
  queryFn: getRouteShapes,
  refetchInterval: 60 * 1000,
});
