"use client";
import dynamic from "next/dynamic";

const StopMap = dynamic(
  async () => {
    return await import("./StopMap").then((mod) => mod.StopMap);
  },
  { ssr: false }
);

export default function StopMapContainer() {
  return <StopMap />;
}
