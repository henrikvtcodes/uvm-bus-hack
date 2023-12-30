export interface Routes {
  routes: Route[];
  success: boolean;
}

export interface Route {
  agency_id: number;
  bounds?: number[];
  color: string;
  description: string;
  id: number;
  is_active: boolean;
  long_name: string;
  short_name: string;
  text_color: string;
  type: string;
  url: string;
}
