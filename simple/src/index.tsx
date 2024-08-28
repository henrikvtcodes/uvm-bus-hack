import { Hono } from "hono";
import { jsxRenderer } from "hono/jsx-renderer";
import { getVehicleStatuses } from "./transloc/vehicle-status";
import { VehicleStatus } from "components/vehicles";
import { getRoutes } from "transloc/routes";
import { Fragment } from "hono/jsx/jsx-runtime";
import { getStopInfo } from "transloc/stops";
import { StopDisplay } from "components/stops";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { Transloc, UVM_AGENCY_ID } from "transloc";

const app = new Hono();

const transloc = new Transloc(UVM_AGENCY_ID);

app.get("/", (c) => c.text("Hello Bun!"));

app.get(
  "/app/*",
  jsxRenderer(
    ({ children }) => {
      return (
        <html>
          <head>
            <title>Fuck You Transloc</title>
            <script
              src="https://unpkg.com/htmx.org@1.9.8"
              integrity="sha384-rgjA7mptc2ETQqXoYC3/zJvkU7K/aP44Y+z7xQuJiVnB/422P/Ak+F/AqFR7E4Wr"
              crossorigin="anonymous"
            ></script>
            <script src="https://cdn.tailwindcss.com"></script>
          </head>
          <body>{children}</body>
        </html>
      );
    },
    { docType: true }
  )
);

app.get("/app", async (c) => {
  const vehiclestatus = await transloc.getVehicleStatuses();
  const routeData = await transloc.getRoutes();
  console.log(JSON.stringify(vehiclestatus, null, 2));
  console.log(JSON.stringify(routeData, null, 2));

  return c.render(
    <Fragment>
      <h1 class="text-4xl px-4 w-screen text-center">
        Vehicles on {vehiclestatus}
      </h1>
      <div class="flex flex-col border-separate px-4">
        {vehiclestatus.vehicles.map((v) => (
          <VehicleStatus vehicle={v} routeData={routeData} />
        ))}
      </div>
    </Fragment>
  );
});

app.get("/app/stops", async (c) => {
  const stopData = await transloc.getStopInfo();
  console.log(stopData);

  return c.render(
    <Fragment>
      <h1 class="text-4xl px-4 w-screen text-center">Stops</h1>
      <div class="flex flex-col border-separate px-4">
        {stopData.stops.map((s) => (
          <StopDisplay stop={s} isLink />
        ))}
      </div>
    </Fragment>
  );
});

app.get("/app/stops/:stopId", async (c) => {
  const stopIdParsed = z.coerce.number().int().safeParse(c.req.param("stopId"));
  if (stopIdParsed.success === false) {
    return c.notFound();
  }
  const stopId = stopIdParsed.data;
  const stopData = await transloc.getStopInfo();
  console.log(stopData);

  const stop = stopData.stops.find((s) => s.id === stopId);

  if (!stop) {
    return c.notFound();
  }

  return c.render(
    <Fragment>
      <h1 class="text-4xl px-4 w-screen text-center">Stops</h1>
      <div class="flex flex-col border-separate px-4">
        {stop ? (
          <StopDisplay stop={stop} />
        ) : (
          <div>Stop {stopId} not found</div>
        )}
      </div>
    </Fragment>
  );
});

export default {
  port: 4300,
  fetch: app.fetch,
};
