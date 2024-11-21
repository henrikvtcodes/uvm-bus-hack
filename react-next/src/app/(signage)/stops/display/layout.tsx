import {
  getBusesQuery,
  getRouteStopsQuery,
  getRoutesQuery,
  getStopsQuery,
} from "@/lib/queries";
import { getQueryClient } from "@/lib/query-client";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export default function Layout({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(getStopsQuery);
  void queryClient.prefetchQuery(getBusesQuery);
  void queryClient.prefetchQuery(getRouteStopsQuery);
  void queryClient.prefetchQuery(getRoutesQuery);

  return (
    <div className="w-screen h-screen overflow-hidden">
      <HydrationBoundary state={dehydrate(queryClient)}>
        {children}
      </HydrationBoundary>
    </div>
  );
}
