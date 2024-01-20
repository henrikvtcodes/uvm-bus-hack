export const locationStreamWorker = new Worker(
  new URL("location_stream.ts", import.meta.url).href
);
