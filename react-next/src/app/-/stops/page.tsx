"use client";

import { type RouteData, StopCard } from "@/components/StopCard";
import {
  getRouteStopsQuery,
  getRoutesQuery,
  getStopsQuery,
} from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export default function Page() {
  const stopsQuery = useQuery(getStopsQuery);

  const routeStops = useQuery(getRouteStopsQuery);
  const routes = useQuery(getRoutesQuery);

  const stopRouteData = useMemo(() => {
    const data: Record<string, RouteData[]> = {};

    stopsQuery.data?.stop.forEach((stop) => {
      const stopRoutes = routeStops.data?.routeStops.filter(
        (routeStop) => routeStop.stopID === stop.stopID,
      );

      if (!stopRoutes) return;

      data[stop.stopID] = stopRoutes.map((routeStop) => {
        const route = routes.data?.routes.find(
          (route) => route.routeID === routeStop.routeID,
        );

        return {
          name: route?.longName ?? "",
          color: route?.color ?? "",
        };
      });
    });
    return data;
  }, [routeStops.data?.routeStops, routes.data?.routes, stopsQuery.data?.stop]);

  if (stopsQuery.isLoading || !stopsQuery.data) return <div>Loading...</div>;
  if (stopsQuery.isError) return <div>Error: {stopsQuery.error.message}</div>;

  return (
    <div className="flex max-h-full flex-wrap space-y-2 overflow-y-scroll">
      {stopsQuery.data.stop.map((stop) => (
        <StopCard
          key={stop.stopID}
          stopData={stop}
          routeData={stopRouteData[stop.stopID] ?? []}
        />
      ))}
    </div>
  );
}
