import { Route } from "peaktransit";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
} from "../../components/ui/card";
import { RouteIcon } from "lucide-react";

export function RouteCard({ routeData }: { routeData: Route }) {
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
    </Card>
  );
}
