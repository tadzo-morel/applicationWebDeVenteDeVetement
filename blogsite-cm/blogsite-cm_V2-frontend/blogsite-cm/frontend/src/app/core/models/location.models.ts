export interface Region {
  id: number;
  name: string;
  nameEn: string | null;
  code: string | null;
}

export interface City {
  id: number;
  name: string;
  regionId: number;
  regionName: string;
  latitude: number | null;
  longitude: number | null;
  isMainHub: boolean;
}

export interface LatLng {
  lat: number;
  lng: number;
}

export interface AddressInfo {
  region?: string;
  city?: string;
  neighborhood?: string;
  country?: string;
  latLng?: LatLng;
}
