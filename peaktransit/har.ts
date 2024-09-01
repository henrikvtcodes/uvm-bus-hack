export interface HARFile {
  log: Log;
}

export interface Log {
  version: string;
  creator: Creator;
  browser: Browser;
  pages: Page[];
  entries: Entry[];
}

export interface Creator {
  name: string;
  version: string;
}

export interface Browser {
  name: string;
  version: string;
}

export interface Page {
  id: string;
  pageTimings: PageTimings;
  startedDateTime: string;
  title: string;
}

export interface PageTimings {
  onContentLoad: number;
  onLoad: number;
}

export interface Entry {
  startedDateTime: string;
  request: Request;
  response: Response;
  cache: Cache;
  timings: Timings;
  time: number;
  pageref: string;
  _securityState?: string;
  serverIPAddress?: string;
  connection?: string;
}

export interface Request {
  bodySize: number;
  method: string;
  url: string;
  httpVersion: string;
  headers: Header[];
  cookies: any[];
  queryString: QueryString[];
  headersSize: number;
}

export interface Header {
  name: string;
  value: string;
}

export interface QueryString {
  name: string;
  value: string;
}

export interface Response {
  status: number;
  statusText: string;
  httpVersion: string;
  headers: Header2[];
  cookies: any[];
  content: Content;
  redirectURL: string;
  headersSize: number;
  bodySize: number;
}

export interface Header2 {
  name: string;
  value: string;
}

export interface Content {
  mimeType?: string;
  size?: number;
  text?: string;
  encoding?: string;
}

export interface Cache {}

export interface Timings {
  blocked?: number;
  dns?: number;
  connect?: number;
  ssl?: number;
  send?: number;
  wait?: number;
  receive?: number;
}

async function getAllUrlsAndComponents() {
  const harFile = Bun.file("./uvm_peaktransit_24-08-28.har");
  const harContents = JSON.parse(await harFile.text()) as HARFile;

  const controllers = new Set<string>();
  const keys = new Set<string>();

  for (const entry of harContents.log.entries) {
    const endpoint = new URL(entry.request.url);

    const ctrlr = endpoint.searchParams.get("controller");

    if (typeof ctrlr === "string") controllers.add(ctrlr);
  }

  for (const controller of controllers) {
    console.log(controller);
  }
}

await getAllUrlsAndComponents();
