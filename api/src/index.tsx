import { Hono } from "hono";
import { jsxRenderer, useRequestContext } from "hono/jsx-renderer";
import { getVehicleStatuses } from "./transloc";
import { RootLayout } from "./templates/root";

const app = new Hono();

app.get(
  "/*",
  jsxRenderer(({ children }) => {
    return <RootLayout>{children}</RootLayout>;
  })
);

app.get("/hello", (c) => c.text("Hello Hono!"));

app.get("/status", async (c) => {
  const vehiclestatus = await getVehicleStatuses();
  return c.html(
    <RootLayout>
      <h1 class="text-4xl"> Vehicles on {vehiclestatus} </h1>
      <div class="flex flex-col border-separate">
        {vehiclestatus.vehicles.map((v) => (
          <div class="border-y-2">
            <h2 class="text-2xl">Vehicle: {v.call_name}</h2>
            {/* Generate a table based on the vehicle data */}
            <div class="flex flex-col">
              <div class="inline-flex">
                <span class="text-semibold">Service Status:</span>
                {v.service_status}
              </div>
              <div class="inline-flex">
                <span class="text-semibold">Stop Pattern ID: </span>
                {v.stop_pattern_id}
              </div>
              <div class="inline-flex">
                <span class="text-semibold">Speed: </span>
                {v.speed}
              </div>
            </div>
          </div>
        ))}
      </div>
    </RootLayout>
  );
});

app.get("/statraw", async (c) => {
  const vehiclestatus = await getVehicleStatuses();
  return c.html(<RootLayout>{JSON.stringify(vehiclestatus)}</RootLayout>);
});

export default {
  port: 4300,
  fetch: app.fetch,
};
