import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import NextLink from "next/link";
export default function Home() {
  return (
    <div className="w-screen h-screen grid place-content-center">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Better CATS Bus</CardTitle>
          <CardDescription>
            A nicer, easier to use UI for the UVM CATS bus system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CardTitle>Pages</CardTitle>
          <ul>
            <li>
              <NextLink
                href={`/stops`}
                className={buttonVariants({
                  variant: "link",
                  className: "gap-x-2",
                })}
              >
                Stops
                <ArrowRight className="inline-block w-4 h-4" />
              </NextLink>
            </li>
            <li>
              <NextLink
                href={`/buses`}
                className={buttonVariants({
                  variant: "link",
                  className: "gap-x-2",
                })}
              >
                Buses
                <ArrowRight className="inline-block w-4 h-4" />
              </NextLink>
            </li>
            <li>
              <NextLink
                href={`/routes`}
                className={buttonVariants({
                  variant: "link",
                  className: "gap-x-2",
                })}
              >
                Routes
                <ArrowRight className="inline-block w-4 h-4" />
              </NextLink>
            </li>
            <li>
              <NextLink
                href={`/stops/display`}
                className={buttonVariants({
                  variant: "link",
                  className: "gap-x-2",
                })}
              >
                Signage Viewer
                <ArrowRight className="inline-block w-4 h-4" />
              </NextLink>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
