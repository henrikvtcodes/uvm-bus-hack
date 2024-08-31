"use client";
import { getStopsQuery } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";
import { Stop } from "peaktransit";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export function StopMap() {
  const stopsQuery = useQuery(getStopsQuery);
  return (
    <MapContainer
      className="w-full h-full"
      center={[44.47522, -73.19255]}
      zoom={15}
      scrollWheelZoom={true}
    >
      <TileLayer
        url={"https://tile.openstreetmap.org/{z}/{x}/{y}.png"}
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {stopsQuery.data?.stop.map((stop) => (
        <StopMarker key={stop.stopID} stopData={stop} />
      ))}
    </MapContainer>
  );
}

function StopMarker({ stopData }: { stopData: Stop }) {
  return (
    <Marker position={[stopData.lat, stopData.lng]}>
      <Popup>{stopData.longName}</Popup>
    </Marker>
  );
}
