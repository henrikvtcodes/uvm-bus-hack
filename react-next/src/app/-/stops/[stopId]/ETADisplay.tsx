import { getEtasQuery } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";
import { time } from "console";
import {
  formatDistance,
  formatDistanceStrict,
  formatDuration,
  intervalToDuration,
} from "date-fns";
import next from "next";
import { useMemo } from "react";

const timeDiffInMinutes = (time: number) => time / 1000 / 60 / 60;

export function ETADisplay({
  stopId,
  routeId,
}: {
  stopId: number;
  routeId: number;
}) {
  const etaQuery = useQuery(getEtasQuery);

  const rawETA = useMemo(
    () =>
      etaQuery.data?.stop.filter(
        (stop) => stop.stopID === stopId && stop.routeID === routeId
      ) ?? [],
    [etaQuery.data?.stop, routeId, stopId]
  );

  const formedETA = useMemo(() => {
    if (rawETA.length === 0) return null;
    // It seems the PeakTransit API provides ETAs by providing a timestamp in seconds-since-epoch
    // for when the next bus should arrive.
    // First, convert to milliseconds, then to a Date object.
    const nextBus = new Date(rawETA[0].ETA1 * 1000);
    // Next, convert to a duration object, then format it.
    const duration = intervalToDuration({ start: Date.now(), end: nextBus });
    return formatDuration(duration);
  }, [rawETA]);

  if (!formedETA) return null;

  return (
    <>
      <span className="text-sm">
        <span className="font-semibold mr-2">Next Bus:</span>
        {formedETA.toLocaleString()}
      </span>
    </>
  );
}
