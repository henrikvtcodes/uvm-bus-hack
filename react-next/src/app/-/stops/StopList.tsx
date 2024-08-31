"use client";

import { RouteData, StopCard } from "@/components/StopCard";
import { Stop } from "peaktransit";
import { useMemo } from "react";

export function StopList({
  allStops,
  searchValue,
  stopRouteData,
}: {
  allStops: Stop[];
  searchValue: string;
  stopRouteData: Record<string, RouteData[]>;
}) {
  const filteredStops = useMemo(
    () =>
      allStops.filter((stop) => {
        const longName = stop.longName.toLowerCase();
        const shortName = (stop.shortName ?? "").toLowerCase();
        const aliases = (stop.shortName ?? "").toLowerCase();
        const searchValLC = searchValue.toLowerCase();

        if (searchValLC === "") return true;

        return (
          longName.includes(searchValLC) ||
          shortName.includes(searchValLC) ||
          aliases.includes(searchValLC)
        );
      }),
    [allStops, searchValue],
  );

  return (
    <>
      {filteredStops.map((stop) => (
        <StopCard
          key={stop.stopID}
          stopData={stop}
          routeData={stopRouteData[stop.stopID] ?? []}
        />
      ))}
      {filteredStops.length === 0 ? (
        <p className="p-6 italic w-full text-center">No stops found</p>
      ) : null}
    </>
  );
}
