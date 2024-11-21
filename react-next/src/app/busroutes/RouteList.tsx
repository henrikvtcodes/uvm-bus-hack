"use client";

import { RouteData, StopCard } from "@/app/stops/StopCard";
import { Stop, Route, STANDARD_ROUTE_IDS } from "peaktransit";
import { useMemo } from "react";
import { RouteCard } from "./RouteCard";
import { Button } from "@/components/ui/button";
import { useRoutesStore } from "@/lib/state/routelist";

export function RouteList({
  allRoutes,
  searchValue,
}: {
  allRoutes: Route[];
  searchValue: string;
}) {
  const setDrawDefaultState = useRoutesStore(
    (state) => state.setDrawDefaultState
  );
  const listSpecialEventRoutes = useRoutesStore(
    (state) => state.listSpecialEventRoutes
  );
  const toggleSpecialEventRoutes = useRoutesStore(
    (state) => state.toggleSpecialEventRoutes
  );

  const filteredRoutes = useMemo(
    () =>
      allRoutes.filter((route) => {
        setDrawDefaultState(route.routeID);

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
    [allRoutes, searchValue, setDrawDefaultState]
  );

  if (searchValue.length < 2) {
    return (
      <>
        {filteredRoutes
          .filter((route) =>
            Boolean(STANDARD_ROUTE_IDS.find((id) => id === route.routeID))
          )
          .map((route) => (
            <RouteCard key={route.routeID} routeData={route} />
          ))}

        <span className="w-full inline-flex justify-center">
          <Button
            onClick={toggleSpecialEventRoutes}
            variant={"ghost"}
            size={"sm"}
          >
            {listSpecialEventRoutes ? "Hide" : "Show"} hidden routes
          </Button>
        </span>

        {listSpecialEventRoutes
          ? filteredRoutes
              .filter(
                // @ts-expect-error
                (route) => !STANDARD_ROUTE_IDS.includes(route.routeID)
              )
              .map((route) => (
                <RouteCard key={route.routeID} routeData={route} />
              ))
          : null}
      </>
    );
  } else {
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
}
