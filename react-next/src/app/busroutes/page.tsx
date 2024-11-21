"use client";

import { type RouteData, StopCard } from "@/app/stops/StopCard";
import {
  getRouteStopsQuery,
  getRoutesQuery,
  getStopsQuery,
} from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RouteList } from "./RouteList";
import { useRoutesStore } from "@/lib/state/routelist";

export default function Page() {
  const routesQuery = useQuery(getRoutesQuery);

  const [debouncedSearch, setSearch] = useDebounceValue("", 250);

  if (routesQuery.isLoading || !routesQuery.data) return <div>Loading...</div>;
  if (routesQuery.isError) return <div>Error: {routesQuery.error.message}</div>;

  return (
    <div className="flex max-h-full flex-wrap space-y-2 overflow-y-auto pr-2">
      <div className="w-full flex flex-col gap-1.5">
        <Input
          placeholder="Search routes"
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
      <RouteList
        allRoutes={routesQuery.data.routes}
        searchValue={debouncedSearch}
      />
    </div>
  );
}
