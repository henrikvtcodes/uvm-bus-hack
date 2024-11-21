"use client";

import { type RouteData, StopCard } from "@/app/stops/StopCard";
import {
  getRouteStopsQuery,
  getRoutesQuery,
  getStopsQuery,
} from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { StopList } from "./StopList";

export default function Page() {
  const stopsQuery = useQuery(getStopsQuery);

  const routeStops = useQuery(getRouteStopsQuery);
  const routes = useQuery(getRoutesQuery);

  const stopRouteData = useMemo(() => {
    const data: Record<string, RouteData[]> = {};

    stopsQuery.data?.stop.forEach((stop) => {
      // Filter for all route-stop adjacencies that have the current stop
      // That is, all routes that include this stop
      const stopRoutes = routeStops.data?.routeStops.filter(
        (routeStop) => routeStop.stopID === stop.stopID
      );

      if (!stopRoutes) return;

      // For each route-stop adjacency, get the route data
      // This is the route name and color, purely for display purposes
      data[stop.stopID] = stopRoutes.map((routeStop) => {
        const route = routes.data?.routes.find(
          (route) => route.routeID === routeStop.routeID
        );

        return {
          name: route?.longName ?? "",
          color: route?.color ?? "",
          alternateName: route?.shortName ?? "",
        };
      });
    });
    return data;
  }, [routeStops.data?.routeStops, routes.data?.routes, stopsQuery.data?.stop]);

  const [debouncedSearch, setSearch] = useDebounceValue("", 250);

  if (stopsQuery.isLoading || !stopsQuery.data) return <div>Loading...</div>;
  if (stopsQuery.isError) return <div>Error: {stopsQuery.error.message}</div>;

  return (
    <div className="flex max-h-full flex-wrap space-y-2 overflow-y-auto pr-2">
      <div className="w-full flex flex-col gap-1.5">
        <Input
          placeholder="Search stops"
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
      {/* <StopList
        allStops={stopsQuery.data.stop}
        searchValue={debouncedSearch}
        stopRouteData={stopRouteData}
      /> */}
    </div>
  );
}
