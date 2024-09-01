"use client";
import { getStopsQuery } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";
import { Stop } from "peaktransit";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { LatLngExpression } from "leaflet";

const DEFAULT_POSITION = [44.47522, -73.19255] as LatLngExpression;
const DEFAULT_ZOOM = 15 as const;

export function StopMap() {
  const stopsQuery = useQuery(getStopsQuery);
  const { stopId } = useParams<{ stopId: string }>();

  const selectedStop = useMemo(() => {
    return stopsQuery.data?.stop.find(
      (stop) => stop.stopID.toString() === stopId,
    );
  }, [stopsQuery.data, stopId]);

  return (
    <MapContainer
      className="w-full h-full"
      center={DEFAULT_POSITION}
      zoom={DEFAULT_ZOOM}
      scrollWheelZoom={true}
    >
      <TileLayer
        url={"https://tile.openstreetmap.org/{z}/{x}/{y}.png"}
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {stopsQuery.data?.stop.map((stop) => (
        <StopMarker
          key={stop.stopID}
          stopData={stop}
          selected={selectedStop?.stopID === stop.stopID}
        />
      ))}
      <StopWatcher />
    </MapContainer>
  );
}

function StopMarker({
  stopData,
  selected,
}: {
  stopData: Stop;
  selected: boolean;
}) {
  return (
    <Marker position={[stopData.lat, stopData.lng]}>
      <Popup className="bg-red-300">{stopData.longName}</Popup>
    </Marker>
  );
}

// This component uses the map hooks to zoom into/out of a stop whenever a stop is selected or deselected.
function StopWatcher() {
  const map = useMap();
  const { stopId } = useParams<{ stopId: string }>();

  const stopsQuery = useQuery(getStopsQuery);

  const selectedStop = useMemo(() => {
    return stopsQuery.data?.stop.find(
      (stop) => stop.stopID.toString() === stopId,
    );
  }, [stopsQuery.data, stopId]);

  useEffect(() => {
    if (selectedStop !== undefined) {
      map.flyTo([selectedStop.lat, selectedStop.lng], 18);
    } else {
      map.flyTo(DEFAULT_POSITION, DEFAULT_ZOOM);
    }
  }, [selectedStop, map]);

  return null;
}
