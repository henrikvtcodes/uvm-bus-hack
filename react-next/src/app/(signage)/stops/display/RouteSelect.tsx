"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getRouteStopsQuery,
  getRoutesQuery,
  getStopsQuery,
} from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";
import { Route } from "next";
import { useMemo } from "react";

type RouteSelectorProps = {
  onChange: (routeID: string) => void;
};

export function RouteSelector({ onChange }: RouteSelectorProps) {
  const stopsQuery = useQuery(getStopsQuery);
  const routesQuery = useQuery(getRoutesQuery);
  const routeStopsQuery = useQuery(getRouteStopsQuery);

  const stopRouteData = useMemo(() => {
    const data: Route[] = [];

    stopsQuery.data?.stop.forEach((stop) => {
      // Filter for all route-stop adjacencies that have the current stop
      // That is, all routes that include this stop (IDs only)
      const stopRoutes = routeStopsQuery.data?.routeStops.filter(
        (routeStop) => routeStop.stopID === stop.stopID
      );

      if (!stopRoutes) return;

      // For each route-stop adjacency, get the route data
      // This is the route name and color, purely for display purposes
      data;
    });
    return data;
  }, [
    routeStopsQuery.data?.routeStops,
    routesQuery.data?.routes,
    stopsQuery.data?.stop,
  ]);

  return (
    <>
      <Select>
        <SelectTrigger className="">
          <SelectValue placeholder="Route" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}
