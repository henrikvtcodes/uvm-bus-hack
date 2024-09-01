import { ReactNode } from "react";
import dynamic from "next/dynamic";
import { getQueryClient } from "@/lib/query-client";
import { getBusesQuery, getRoutesQuery, getStopsQuery } from "@/lib/queries";
import { getRoutes } from "peaktransit";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export const metadata = {
  title: "Stops | Better CATS Bus",
};

const StopMap = dynamic(
  async () => {
    return await import("../../../components/StopMap").then(
      (mod) => mod.StopMap
    );
  },
  { ssr: false }
);

export default function Page({ children }: { children: ReactNode }) {
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
      <div className="col-span-3 col-start-2 row-span-1 row-start-1 rounded shadow-md">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <StopMap />
        </HydrationBoundary>
      </div>
    </div>
  );
}
