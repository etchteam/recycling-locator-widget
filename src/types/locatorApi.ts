export interface PostcodeResponse {
  error?: string;
  postcode?: string;
}

export interface Material {
  id: number;
  name: string;
  popular: boolean;
}

export interface ValpakMaterial {
  category: string;
  code: string;
  name: string;
}

export interface MaterialCategory {
  id: number;
  name: string;
  popular: boolean;
}

export interface MaterialWithCategory extends Material {
  category: MaterialCategory;
}

export interface CoreInformation {
  enquiryNumber: string;
  recyclingUri: string;
  hwrcUri: string;
  gardenWasteUri: string;
}

export interface Container {
  name: string;
  displayName: string;
  bodyColour: string;
  lidColour?: string;
  interiorColour?: string;
  notes?: string;
}

export interface DryStreamContainer extends Container {
  materials?: MaterialWithCategory[];
}

export interface OrganicStreamContainer extends Container {
  cost?: number;
}

export interface ResidualScheme {
  name: string;
  containers: Container[];
}

export interface OrganicScheme {
  name: string;
  containers: OrganicStreamContainer[];
}

export interface DryScheme {
  name: string;
  containers: DryStreamContainer[];
}

export interface LocalAuthority {
  id: number;
  name: string;
  coreInformation: CoreInformation;
  dryStreams: DryScheme[];
  organicStreams: OrganicScheme[];
  residualStreams: ResidualScheme[];
}

export interface Location {
  id: number;
  distance: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  materials: ValpakMaterial[];
  data_source: string;
  is_hwrc: boolean;
}

export interface LocationsResponse {
  items: Location[];
  latitude: number;
  longitude: number;
}
