"use client";

import { StopCard } from "@/components/StopCard";
import { getStopsQuery } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
  const stopsQuery = useQuery(getStopsQuery);

  if (stopsQuery.isLoading || !stopsQuery.data) {
    return <div>Loading...</div>;
  }

  if (stopsQuery.isError) {
    return <div>Error: {stopsQuery.error.message}</div>;
  }

  return (
    <div className="flex max-h-full flex-wrap space-y-2 overflow-y-scroll">
      {stopsQuery.data.stop.map((stop) => (
        <StopCard key={stop.stopID} stopData={stop} />
      ))}
    </div>
  );
}
