import { Card } from "@/components/ui/card";
import {
  getRouteStopsQuery,
  getRoutesQuery,
  getStopsQuery,
} from "@/lib/queries";
import { HydrationBoundary, dehydrate, useQuery } from "@tanstack/react-query";
import { notFound, useParams } from "next/navigation";
import { StopPage } from "./StopPage";
import { useMemo } from "react";
import { getQueryClient } from "@/lib/query-client";
import type { Metadata } from "next";
import { getStops } from "peaktransit";

export async function generateMetadata({
  params: { stopId },
}: {
  params: { stopId: string };
}): Promise<Metadata> {
  const stops = await getStops();

  return {
    title: `Stop ${stopId}`,
  };
}

export default async function Page({
  params: { stopId },
}: {
  params: { stopId: string };
}) {
  const queryClient = getQueryClient();

  const stops = await queryClient.fetchQuery(getStopsQuery);
  const stopData = stops.stop.find((stop) => stop.stopID.toString() === stopId);

  // If the stop is undefined, return a 404 page
  if (stopData === undefined) return notFound();

  void queryClient.prefetchQuery(getRouteStopsQuery);
  void queryClient.prefetchQuery(getRoutesQuery);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StopPage stopData={stopData} />
    </HydrationBoundary>
  );
}
