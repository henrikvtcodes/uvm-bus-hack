"use client";
import { MapContainer, TileLayer } from "react-leaflet";

export function StopMap() {
  return (
    <MapContainer
      className="w-full h-full"
      center={[44.47522, -73.19255]}
      zoom={15}
      scrollWheelZoom={false}
    >
      <TileLayer
        url={"https://tile.openstreetmap.org/{z}/{x}/{y}.png"}
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
    </MapContainer>
  );
}
