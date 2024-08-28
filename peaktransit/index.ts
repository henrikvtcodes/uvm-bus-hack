// UVM's Agency ID on PeakTransit
const AGENCY_ID = 159 as const;
// This isn't secret but I suspect they change it as a shitty security thing. To validate/update,
// head to https://uvm.rider.peaktransit.com/ , open network devtools, and look at the `key` url param.
// Copy it from there if needed.
const API_URL_KEY_PARAM = "c620b8fe5fdbd6107da8c8381f4345b4" as const;

export const PEAKTRANSIT_UVM_ROOT_URL = new URL(
  `https://api.peaktransit.com/v5/index.php?app_id=_RIDER&key=${API_URL_KEY_PARAM}&action=list&agencyID=${AGENCY_ID}`,
);

const PEAKTRANSIT_UVM_SHAPES_URL = new URL(PEAKTRANSIT_UVM_ROOT_URL);
PEAKTRANSIT_UVM_SHAPES_URL.searchParams.append("controller", "shape2");

export async function getRouteShapes() {
  return (await (
    await fetch(PEAKTRANSIT_UVM_SHAPES_URL)
  ).json()) as ShapeResponse;
}

export interface ShapeResponse {
  shape: Shape[];
  success: boolean;
}

export interface Shape {
  shapeID: number;
  agencyID: number;
  shapeName: string;
  routeID: number;
  description: string;
  points: string;
  source: string;
  updated: number;
  disabled: boolean;
  directions: string;
  dynamicTotalShapeTime: number;
}

const PEAKTRANSIT_UVM_ETA_URL = new URL(PEAKTRANSIT_UVM_ROOT_URL);
PEAKTRANSIT_UVM_ETA_URL.searchParams.append("controller", "eta");

export async function getETAs() {
  return (await (
    await fetch(PEAKTRANSIT_UVM_ROUTESTOP_URL)
  ).json()) as ETAResponse;
}

export interface ETAResponse {
  stop: StopETA[];
  success: boolean;
}

export interface StopETA {
  stopID: number;
  routeID: number;
  ETA1: number;
  ETA2: number;
}

const PEAKTRANSIT_UVM_STOPS_URL = new URL(PEAKTRANSIT_UVM_ROOT_URL);
PEAKTRANSIT_UVM_STOPS_URL.searchParams.append("controller", "stop2");

export async function getStops() {
  return (await (
    await fetch(PEAKTRANSIT_UVM_STOPS_URL)
  ).json()) as StopsResponse;
}

export interface StopsResponse {
  stop: Stop[];
  success: boolean;
}

export interface Stop {
  stopID: number;
  agencyID: number;
  shortName: any;
  longName: string;
  lat: number;
  lng: number;
  textID: string;
  updated: number;
  disabled: boolean;
  stopCode: string;
  aliases: string;
  stopCodeAlias: string;
  closed: boolean;
  sheltered: boolean;
  source: any;
  hidden: boolean;
  depot: boolean;
}

const PEAKTRANSIT_UVM_VEHICLES_URL = new URL(PEAKTRANSIT_UVM_ROOT_URL);
PEAKTRANSIT_UVM_VEHICLES_URL.searchParams.append("controller", "vehicles2");

export async function getVehicles() {
  return (await (
    await fetch(PEAKTRANSIT_UVM_VEHICLES_URL)
  ).json()) as VehiclesResponse;
}

export interface VehiclesResponse {
  vehicles: Vehicle[];
  success: boolean;
}

export interface Vehicle {
  vehicleID: number;
  agencyID: number;
  routeID: number;
  driverID: number;
  tripID: number;
  shapeID: number;
  vehicleName: string;
  vehicleType: string;
  numPax: number;
  lat: number;
  lng: number;
  positionUpdated: number;
  speed: number;
  course: number;
  canAcceptDispatchRequests: boolean;
  checklistID: number;
  supervisor: boolean;
  trail: string;
  updated: number;
  disabled: boolean;
  hidden: boolean;
  externalVehicleID: string;
  externalRouteID: string;
  oos: string;
  source?: string;
  icon: number;
  atLink: number;
  linkLat: number;
  linkLng: number;
  linkUpdated: number;
  linkChanged: number;
  linkBearing: number;
  minsLate: number;
  minsLateUpdated: number;
  onAssignment: number;
  mpg: number;
  fuelType: string;
  HasAPC: boolean;
  showCounts: boolean;
  APCPercentage: number;
  APCCapacity: number;
  APCCount: number;
  APCChanged: number;
  batteryLevel: number;
  batteryState: number;
  nextStopID: number;
  nextStopETA: number;
  nextStopUnscheduled: boolean;
  cat: number;
  alert: boolean;
  routeUpdated: number;
  altitude: number;
  verticalSpeed: number;
  headway: number;
  holdAtStopID: number;
  holdTime: number;
  waitTime: number;
  DSUpdated: number;
  desiredHeadway: number;
  mdtUpdate: number;
  mdtVersion: string;
  mdtSerial: any;
  routeSource: string;
  vehicleState: number;
  positionSource?: string;
}

const PEAKTRANSIT_UVM_ROUTES_URL = new URL(PEAKTRANSIT_UVM_ROOT_URL);
PEAKTRANSIT_UVM_ROUTES_URL.searchParams.append("controller", "route2");

export async function getRoutes() {
  return (await (
    await fetch(PEAKTRANSIT_UVM_ROUTES_URL)
  ).json()) as RoutesResponse;
}

export interface RoutesResponse {
  routes: Route[];
  success: boolean;
}

export interface Route {
  routeID: number;
  agencyID: number;
  shortName: string;
  longName: string;
  routeType: number;
  sequence: number;
  description: string;
  color: string;
  textColor: string;
  onDemand: boolean;
  calcETA: boolean;
  hidden: boolean;
  updated: number;
  disabled: boolean;
  scheduleURL: string;
  scheduleURLType: string;
  shapeID: number;
  schedAdh: boolean;
  aliases: string;
  source: any;
  LastETACalc: number;
  routeCode: string;
  special_service: boolean;
}

const PEAKTRANSIT_UVM_ROUTESTOP_URL = new URL(PEAKTRANSIT_UVM_ROOT_URL);
PEAKTRANSIT_UVM_ROUTESTOP_URL.searchParams.append("controller", "routestop2");

export async function getRouteStops() {
  return (await (
    await fetch(PEAKTRANSIT_UVM_ROUTESTOP_URL)
  ).json()) as RouteStopsResponse;
}

export interface RouteStopsResponse {
  routeStops: RouteStop[];
  success: boolean;
}

export interface RouteStop {
  routeStopID: number;
  agencyID: number;
  routeID: number;
  stopID: number;
  link: number;
  sequence: any;
  updated: number;
  disabled: boolean;
}
