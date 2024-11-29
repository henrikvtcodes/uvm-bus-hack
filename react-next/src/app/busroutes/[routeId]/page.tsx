import { getRoutesQuery } from "@/lib/queries";
import { getQueryClient } from "@/lib/query-client";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRoutes } from "peaktransit";

export async function generateMetadata({
  params,
}: {
  params: { routeId: string };
}): Promise<Metadata> {
  const { routeId } = await params;
  const routes = await getRoutes();

  const routeData = routes.routes.find(
    (route) => route.routeID.toString() === routeId
  );

  console.log("Metadata for ", routeData?.shortName);

  return {
    title: `${routeData?.shortName} ${routeData?.shortName.includes("Route") ? "" : "Route"} | Better CATS Bus`,
  };
}

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: { routeId: string };
}) {
  const { routeId } = await params;

  const queryClient = getQueryClient();
  const routes = await queryClient.fetchQuery(getRoutesQuery);
  const routeData = routes.routes.find(
    (route) => route.routeID.toString() === routeId
  );

  if (routeData === undefined) return notFound();

  return <></>;
}
