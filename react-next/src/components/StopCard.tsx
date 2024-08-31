import { Stop } from "peaktransit";
import { Card, CardTitle, CardHeader, CardContent } from "./ui/card";
import { ArrowRight, ArrowUpRight, RouteIcon } from "lucide-react";
import NextLink from "next/link";

export function StopCard({
  stopData,
  routeData,
}: {
  stopData: Stop;
  routeData: RouteData[];
}) {
  return (
    <Card className="basis-full shrink-0 grow-1">
      <CardHeader className="inline-flex flex-row justify-between items-center w-full p-3 px-6 ">
        <CardTitle>{stopData.longName}</CardTitle>
        <NextLink href={`/-/stops/${stopData.stopID}`}>
          <ArrowUpRight className="w-auto h-6" />
        </NextLink>
      </CardHeader>
      <CardContent className="">
        <ul className="list-none flex flex-col space-y-2 ">
          {routeData.map((route) => (
            <li key={route.name} className="inline-flex items-center gap-x-2 ">
              <RouteIcon
                className="w-auto h-6 text-white p-1 rounded"
                style={{ backgroundColor: `#${route.color}` }}
              />
              {route.name}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export type RouteData = {
  name: string;
  color: string;
  alternateName?: string;
};
