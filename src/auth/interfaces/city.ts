export interface City {
  id: string;
  name: string;
  locale: string;
  currency_id: string;
  decimal_separator: string;
  thousands_separator: string;
  time_zone: string;
  geo_information: GeoInformation;
  states: State[];
}

export interface GeoInformation {
  location: Location;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface State {
  id: string;
  name: string;
}
