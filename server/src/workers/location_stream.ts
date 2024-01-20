import { StopInfo, Transloc, AGENCY_ID } from "transloc";

declare var self: Worker;

const transloc = new Transloc(AGENCY_ID);

transloc.getVehicleStatus;

export type LocationStreamOnMessage =
  | {
      type: "start";
    }
  | {
      type: "stop";
    };

export type LocationStreamPostMessage = {
  type: "update";
  data: StopInfo;
};

let streamInterval: Timer;

self.onmessage = (event: MessageEvent<LocationStreamOnMessage>) => {
  switch (event.data.type) {
    case "start":
      streamInterval = setInterval(async () => {
        const data = await transloc.getVehicleStatus();
        postMessage({ type: "update", data });
      }, 1000);

      break;
    case "stop":
      clearInterval(streamInterval);
      break;
  }
  postMessage({});
};
