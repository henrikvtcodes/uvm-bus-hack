"use client";
import { getStopsQuery } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";
import { Stop } from "peaktransit";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useParams } from "next/navigation";
import { useMemo } from "react";
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

  const { position, zoom } = useMemo<{
    position: LatLngExpression;
    zoom: number;
  }>(
    () =>
      selectedStop !== undefined
        ? { position: [selectedStop.lat, selectedStop.lng], zoom: 19 }
        : { position: DEFAULT_POSITION, zoom: DEFAULT_ZOOM },
    [selectedStop],
  );

  console.log("Stop ID: ", stopId);
  console.log("Selected Stop: ", selectedStop?.longName);
  console.log(
    "Position: ",
    position === DEFAULT_POSITION ? "Default" : position,
  );
  console.log("Zoom: ", zoom === DEFAULT_ZOOM ? "Default" : zoom);

  return (
    <MapContainer
      // Key prop forces the map to rerender when we select/deselect a stop
      key={zoom}
      className="w-full h-full"
      center={position}
      zoom={zoom}
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
      <Popup>{stopData.longName}</Popup>
    </Marker>
  );
}
