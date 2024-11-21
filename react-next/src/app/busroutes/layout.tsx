import { ReactNode } from "react";
import dynamic from "next/dynamic";
import { getQueryClient } from "@/lib/query-client";
import { getBusesQuery, getRoutesQuery, getStopsQuery } from "@/lib/queries";
import { getRoutes } from "peaktransit";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
// import { StopMapContainer } from "./StopMapContainer";

export const metadata = {
  title: "Routes | Better CATS Bus",
};

export default function Layout({
  children,
  routeMap,
}: {
  children: ReactNode;
  routeMap: ReactNode;
}) {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(getBusesQuery);
  void queryClient.prefetchQuery(getRoutesQuery);
  void queryClient.prefetchQuery(getStopsQuery);
  return (
    <div className="grid h-screen w-screen grid-cols-4 grid-rows-1 space-x-2 p-2">
      <div className="col-span-1 col-start-1 row-span-1 row-start-1">
        <HydrationBoundary state={dehydrate(queryClient)}>
          {children}
        </HydrationBoundary>
      </div>
      <div className="col-span-3 col-start-2 row-span-1 row-start-1 rounded-xl shadow-md">
        <HydrationBoundary state={dehydrate(queryClient)}>
          {routeMap}
        </HydrationBoundary>
      </div>
    </div>
  );
}
