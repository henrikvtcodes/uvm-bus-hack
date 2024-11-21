"use client";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStopsQuery } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";
import NextLink from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
export default function Page() {
  const stopsQuery = useQuery(getStopsQuery);

  return (
    <div className="w-screen h-screen flex flex-col justify-start items-center overflow-y-auto">
      <h1 className="text-4xl">Configure Signage</h1>
      {/* <ul className="list-disc">
        {stopsQuery.data?.stop.map((stop) => (
          <li key={stop.stopID}>
            <NextLink
              className={buttonVariants({
                variant: "link",
                className: "gap-x-2",
              })}
              href={`/stops/display/${stop.stopID}`}
            >
              {stop.longName}
            </NextLink>
          </li>
        ))}
      </ul> */}
      <Card className=" w-3/5">
        <CardHeader>
          <CardTitle>Signage Configurator</CardTitle>
        </CardHeader>
        <CardContent className="">
          <div>
            <Label>Title Text</Label>
            <Input />
          </div>
          <div className="grid grid-cols-2 grid-rows-1 mt-6 gap-x-8">
            <div className="col-start-1 col-span-1 row-start-1 row-span-1 w-full">
              <div>
                <Select>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Route" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="col-start-2 col-span-1 row-start-1 row-span-1 w-full space-x-1">
              <div>
                <Label>Route 2</Label>
                <Select>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Route" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
