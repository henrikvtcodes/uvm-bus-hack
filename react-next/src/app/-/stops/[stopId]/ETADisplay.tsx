import { getEtasQuery } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";
import { time } from "console";
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

  const etas = useMemo(
    () =>
      etaQuery.data?.stop.filter(
        (stop) => stop.stopID === stopId && stop.routeID === routeId
      ) ?? [],
    [etaQuery.data?.stop, routeId, stopId]
  );

  return (
    <>
      <span className="text-sm">
        <span className="font-semibold mr-2">Next Bus:</span>
        {etas.length > 0 ? timeDiffInMinutes(etas[0].ETA1) : null}
      </span>
    </>
  );
}
