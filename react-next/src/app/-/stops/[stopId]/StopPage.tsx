"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Stop } from "peaktransit";
import NextLink from "next/link";

export function StopPage({ stopData }: { stopData: Stop }) {
  return (
    <Card className="w-full min-h-full overflow-y-auto">
      <CardHeader>
        <NextLink
          href={`/-/stops`}
          className="mb-2 inline-flex items-center font-semibold font-xs"
        >
          <ArrowLeft className="cursor-pointer w-auto h-6" /> Back
        </NextLink>
        <CardTitle>{stopData.longName}</CardTitle>
      </CardHeader>
    </Card>
  );
}
