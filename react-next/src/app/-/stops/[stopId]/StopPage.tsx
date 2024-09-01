"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, RouteIcon } from "lucide-react";
import { Route, Stop } from "peaktransit";
import NextLink from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  getEtasQuery,
  getRouteStopsQuery,
  getRoutesQuery,
} from "@/lib/queries";
import { useMemo } from "react";
import { ETADisplay } from "./ETADisplay";

export function StopPage({ stopData }: { stopData: Stop }) {
  const routesQuery = useQuery(getRoutesQuery);
  const routeStopsQuery = useQuery(getRouteStopsQuery);

  const routes = useMemo(() => {
    const routes: Route[] = [];

    routeStopsQuery.data?.routeStops.forEach((routeStop) => {
      if (routeStop.stopID !== stopData.stopID) return;

      const route = routesQuery.data?.routes.find(
        (route) => route.routeID === routeStop.routeID
      );

      if (!route) return;

      routes.push(route);
    });

    return routes;
  }, [
    routeStopsQuery.data?.routeStops,
    routesQuery.data?.routes,
    stopData.stopID,
  ]);

  return (
    <Card className="w-full min-h-full overflow-y-auto">
      <CardHeader>
        <NextLink
          href={`/-/stops`}
          className="mb-2 inline-flex items-center font-semibold font-xs"
        >
          <ArrowLeft className="cursor-pointer w-auto h-6" /> Back
        </NextLink>
        <CardTitle className="text-xl">{stopData.longName}</CardTitle>
      </CardHeader>
      <CardContent className="">
        <CardTitle className="text-lg">Routes</CardTitle>

        {routes.map((route) => (
          <div key={route.routeID} className="flex flex-col gap-y-1 py-2">
            <span className="inline-flex justify-start items-center gap-x-2">
              <RouteIcon
                className="w-auto h-6 text-white p-1 rounded"
                style={{ backgroundColor: `#${route.color}` }}
              />
              <h2 className="font-semibold">{route.longName}</h2>
            </span>
            <div className="pl-8">
              <ETADisplay stopId={stopData.stopID} routeId={route.routeID} />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
