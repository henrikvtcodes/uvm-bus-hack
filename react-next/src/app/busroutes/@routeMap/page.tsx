"use client";
import dynamic from "next/dynamic";

const RouteMap = dynamic(
  async () => {
    return await import("./RouteMap").then((mod) => mod.RouteMap);
  },
  { ssr: false }
);

export default function Page() {
  return <RouteMap />;
}
