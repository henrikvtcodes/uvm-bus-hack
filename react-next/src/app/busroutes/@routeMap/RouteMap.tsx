"use client";
import {
  getRouteShapesQuery,
  getRoutesQuery,
  getStopsQuery,
} from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";
import { getRouteShapes, Stop } from "peaktransit";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import type { LatLngExpression } from "leaflet";
import { Polyline } from "react-leaflet/Polyline";
import { useRoutesStore } from "@/lib/state/routelist";
import { set } from "date-fns";

const DEFAULT_POSITION = [44.47522, -73.19255] as LatLngExpression;
const DEFAULT_ZOOM = 15 as const;

type RouteShape = {
  routeID: number;
  color: string;
  shape: LatLngExpression[];
};

export function RouteMap() {
  const routesQuery = useQuery(getRoutesQuery);
  const shapesQuery = useQuery(getRouteShapesQuery);
  // const { stopId } = useParams<{ stopId: string }>();
  const routeLoadComplete = useRoutesStore((state) => state.routeLoadComplete);
  const setHasShape = useRoutesStore((state) => state.setHasShape);

  const routeShapes = useMemo(() => {
    if (!shapesQuery.data || !routesQuery.data) return [];

    return routesQuery.data.routes
      .map((route) => {
        const shape = shapesQuery.data.shape.find(
          (shape) => shape.shapeID === route.shapeID
        );
        if (!shape) return undefined;
        setHasShape(route.routeID, true);
        const points = shape.points
          .split(";")
          .filter((point) => point.length > 0)
          .map((point) => {
            const [lat, lon] = point.split(",");

            return [parseFloat(lat), parseFloat(lon)] as LatLngExpression;
          });

        console.log("Route ", route.shortName, " points ", points);

        return {
          routeID: route.routeID,
          color: route.color,
          shape: points,
        };
      })
      .filter((shape) => shape !== undefined);
  }, [shapesQuery.data, routesQuery.data, setHasShape]) satisfies RouteShape[];

  return (
    <MapContainer
      className="w-full h-full rounded-xl"
      center={DEFAULT_POSITION}
      zoom={DEFAULT_ZOOM}
      scrollWheelZoom={true}
      minZoom={15}
    >
      <TileLayer
        url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {routeLoadComplete
        ? routeShapes.map((shape) => (
            <RouteShape key={shape.routeID} shape={shape} />
          ))
        : null}
    </MapContainer>
  );
}

function RouteShape({ shape }: { shape: RouteShape }) {
  const shouldShow = useRoutesStore(
    (state) => state.routes[shape.routeID].draw
  );

  return shouldShow ? (
    <Polyline positions={shape.shape} color={`#${shape.color}`} />
  ) : null;
}
