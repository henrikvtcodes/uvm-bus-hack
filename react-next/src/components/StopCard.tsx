import { Stop } from "peaktransit";
import { Card, CardTitle, CardHeader, CardContent } from "./ui/card";

export function StopCard({ stopData }: { stopData: Stop }) {
  return (
    <Card className="basis-full shrink-0 grow-1">
      <CardHeader>
        <CardTitle>{stopData.longName}</CardTitle>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
