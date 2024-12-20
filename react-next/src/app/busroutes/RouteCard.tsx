"use client";
import { Route } from "peaktransit";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
} from "../../components/ui/card";
import { ArrowUpRight, RouteIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useRoutesStore } from "@/lib/state/routelist";
import { useEffect } from "react";
import NextLink from "next/link";

export function RouteCard({ routeData }: { routeData: Route }) {
  const hasShape = useRoutesStore(
    (state) => state.routes[routeData.routeID].hasShape
  );
  const shouldShow = useRoutesStore(
    (state) => state.routes[routeData.routeID].draw
  );
  const setShow = useRoutesStore((state) => state.setDrawRoute);

  return (
    <Card className="basis-full shrink-0 grow-1">
      <CardHeader className="inline-flex flex-row justify-between items-center w-full">
        <CardTitle className="inline-flex items-center gap-x-2">
          <RouteIcon
            className="w-auto h-6 text-white p-1 rounded"
            style={{ backgroundColor: `#${routeData.color}` }}
          />
          {routeData.longName}
        </CardTitle>
        <NextLink
          className="justify-self-end"
          href={`/busroutes/${routeData.routeID}`}
        >
          <ArrowUpRight className="w-auto h-6" />
        </NextLink>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          {hasShape ? (
            <>
              <Switch
                id={`drawRoute-${routeData.routeID}`}
                checked={shouldShow}
                onCheckedChange={(checked) =>
                  setShow(routeData.routeID, checked)
                }
              />
              <Label htmlFor={`drawRoute-${routeData.routeID}`}>
                Show route
              </Label>
            </>
          ) : (
            <Label>Route has no outline</Label>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
