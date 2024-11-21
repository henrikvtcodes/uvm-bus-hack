"use client";

import { RouteData, StopCard } from "@/app/stops/StopCard";
import { Stop, Route } from "peaktransit";
import { useMemo } from "react";
import { RouteCard } from "./RouteCard";

export function RouteList({
  allRoutes,
  searchValue,
  // stopRouteData,
}: {
  allRoutes: Route[];
  searchValue: string;
  // stopRouteData: Record<string, RouteData[]>;
}) {
  const filteredRoutes = useMemo(
    () =>
      allRoutes.filter((route) => {
        const longName = route.longName.toLowerCase();
        const shortName = (route.shortName ?? "").toLowerCase();
        const aliases = (route.shortName ?? "").toLowerCase();
        const searchValLC = searchValue.toLowerCase();

        if (searchValLC === "") return true;

        return (
          longName.includes(searchValLC) ||
          shortName.includes(searchValLC) ||
          aliases.includes(searchValLC)
        );
      }),
    [allRoutes, searchValue]
  );

  return (
    <>
      {filteredRoutes.map((route) => (
        <RouteCard key={route.routeID} routeData={route} />
      ))}
      {filteredRoutes.length === 0 ? (
        <p className="p-6 italic w-full text-center">No stops found</p>
      ) : null}
    </>
  );
}
