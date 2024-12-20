import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension"; // required for devtools typing
import { STANDARD_ROUTE_IDS } from "peaktransit";
import { produce } from "immer";
import { immer } from "zustand/middleware/immer";

type RoutesState = {
  listSpecialEventRoutes: boolean;
  routes: Record<number, { draw: boolean; hasShape: boolean }>;
  routeLoadComplete: boolean;
};

type RoutesActions = {
  setDrawRoute: (routeId: number, shouldDraw: boolean) => void;
  setDrawDefaultState: (routeId: number) => void;
  toggleSpecialEventRoutes: () => void;
  setRouteLoadComplete: () => void;
  setHasShape: (routeId: number, hasShape: boolean) => void;
};

export const useRoutesStore = create<RoutesState & RoutesActions>()(
  devtools(
    immer((set) => ({
      // State
      routes: STANDARD_ROUTE_IDS.reduce(
        (acc, id) => ({ ...acc, [id]: { draw: true, hasShape: true } }),
        {}
      ),
      listSpecialEventRoutes: false,
      routeLoadComplete: false,

      // Actions
      setDrawRoute: (routeId, shouldDraw) =>
        set((state) => {
          state.routes[routeId].draw = shouldDraw;
        }),
      setHasShape: (routeId, hasShape) =>
        set((state) => {
          state.routes[routeId].hasShape = hasShape;
        }),
      setDrawDefaultState: (routeId) =>
        set((state) => {
          state.routes[routeId] = state.routes[routeId] ?? {
            draw: false,
            hasShape: false,
          };
        }),
      toggleSpecialEventRoutes: () =>
        set((state) => {
          state.listSpecialEventRoutes = !state.listSpecialEventRoutes;
        }),
      setRouteLoadComplete: () =>
        set((state) => {
          state.routeLoadComplete = true;
        }),
    }))
  )
);
