"use client";
import dynamic from "next/dynamic";

const StopMap = dynamic(
  async () => {
    return await import("./@stopMap/StopMap").then((mod) => mod.StopMap);
  },
  { ssr: false }
);

export function StopMapContainer() {
  return <StopMap />;
}
