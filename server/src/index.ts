import { Elysia } from "elysia";
import { Transloc, API_URL, UVM_AGENCY_ID, type StopInfo } from "transloc";
import { locationStreamWorker } from "./workers";
import {
  LocationStreamOnMessage,
  LocationStreamPostMessage,
} from "./workers/location_stream";
const transloc = new Transloc(UVM_AGENCY_ID);

const locations = new Map<number, StopInfo>();

locationStreamWorker.onmessage = (
  event: MessageEvent<LocationStreamPostMessage>
) => {
  switch (event.data.type) {
    case "update":
      console.log(event.data.data);
      locations.set(locations.size, event.data.data);
      break;
  }
};

const app = new Elysia();

app.ws("/locations", {
  // Send a message every time the locationStreamWorker sends new
  open: (ws) => {
    setInterval(() => {
      ws.send("hi");
    }, 1000);
  },
});

app.ws("/locations/", {
  open: (ws) => {
    setInterval(() => {
      ws.send(JSON.stringify(locations.get(locations.size - 1)));
    }, 1000);
  },
});

app.listen(1791);

locationStreamWorker.postMessage({ type: "start" });

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
