import { queryOptions } from "@tanstack/react-query";
import { Stop, getStops, getVehicles } from "peaktransit";

export const getBusesQuery = queryOptions({
  queryKey: ["buses"],
  queryFn: getVehicles,
});

export const getStopsQuery = queryOptions({
  queryKey: ["stops"],
  queryFn: getStops,
});
