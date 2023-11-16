import { Routes } from "transloc/routes";
import { Vehicle } from "transloc/vehicle-status";

export const VehicleStatus = ({
  vehicle,
  routeData,
}: {
  vehicle: Vehicle;
  routeData: Routes;
}) => {
  const routeInfo = routeData.routes.find((r) => r.id === vehicle.route_id);
  return (
    <div class="border-y-2">
      <h2 class="text-2xl">Vehicle: {vehicle.call_name}</h2>
      <div class="flex flex-col">
        <div class="inline-flex">
          <span class="text-semibold">Service Status:</span>
          {vehicle.service_status}
        </div>
        <div class="inline-flex">
          <span class="text-semibold">Route: </span>
          {routeInfo?.long_name}
        </div>
      </div>
    </div>
  );
};
