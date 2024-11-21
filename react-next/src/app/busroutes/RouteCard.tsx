"use client";
import { Route } from "peaktransit";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
} from "../../components/ui/card";
import { RouteIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useRoutesStore } from "@/lib/state/routelist";
import { useEffect } from "react";

export function RouteCard({ routeData }: { routeData: Route }) {
  const shouldShow = useRoutesStore(
    (state) => state.routes[routeData.routeID].draw
  );
  const setShow = useRoutesStore((state) => state.setDrawRoute);

  useEffect(() => {
    console.log("Load route card for ", routeData.shortName);
    return () => console.log("Unload route card for ", routeData.shortName);
  });

  return (
    <Card className="basis-full shrink-0 grow-1">
      <CardHeader>
        <CardTitle className="inline-flex items-center gap-x-2">
          <RouteIcon
            className="w-auto h-6 text-white p-1 rounded"
            style={{ backgroundColor: `#${routeData.color}` }}
          />
          {routeData.longName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <Switch
            id={`drawRoute-${routeData.routeID}`}
            checked={shouldShow}
            onCheckedChange={(checked) => setShow(routeData.routeID, checked)}
          />
          <Label htmlFor={`drawRoute-${routeData.routeID}`}>Show route</Label>
        </div>
      </CardContent>
    </Card>
  );
}
