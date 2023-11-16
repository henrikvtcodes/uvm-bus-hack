import { Hono } from "hono";
import { jsxRenderer, useRequestContext } from "hono/jsx-renderer";
import { getVehicleStatuses } from "./transloc/vehicle-status";
import { RootLayout } from "./components/root";
import { VehicleStatus } from "components/vehicles";
import { getRoutes } from "transloc/routes";
import { Fragment } from "hono/jsx/jsx-runtime";

const app = new Hono();

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
  const vehiclestatus = await getVehicleStatuses();
  const routeData = await getRoutes();
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
  return c.render(<div></div>);
});

export default {
  port: 4300,
  fetch: app.fetch,
};
