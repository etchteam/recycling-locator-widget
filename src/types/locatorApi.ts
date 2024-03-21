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

export type ContainerName =
  | 'Box'
  | 'Communal Wheeled Bin'
  | 'Inner Caddy'
  | 'Kerbside Caddy'
  | 'Kitchen Caddy'
  | 'Reusable Sack'
  | 'Non-Reusable Sack'
  | 'Householder Provided Carrier Bag'
  | 'Trollibox'
  | 'Wheeled Bin';

export interface Container {
  name: ContainerName;
  displayName: string;
  bodyColour: string;
  lidColour?: string;
  interiorColour?: string;
  notes?: string[] | null;
  materials?: MaterialWithCategory[];
  cost?: number;
}

export enum PROPERTY_TYPE_EN {
  ALL = 'All properties',
  KERBSIDE = 'Kerbside properties',
  FLATS_WITH_COMMUNAL_BINS = 'Flats with communal bins',
  FLATS_WITH_INDIVIDUAL_BINS = 'Flats with individual bins or bags',
  NARROW_ACCESS = 'Narrow access/difficult to reach/remote properties',
}

export enum PROPERTY_TYPE_CY {
  ALL = 'Pob eiddo',
  KERBSIDE = 'Eiddo ymyl y ffordd',
  FLATS_WITH_COMMUNAL_BINS = 'Mynediad cul/anodd eu cyrraedd/eiddo anghysbell',
  FLATS_WITH_INDIVIDUAL_BINS = 'Fflatiau gyda biniau neu fagiau unigol',
  NARROW_ACCESS = 'Fflatiau gyda biniau cymunedol',
}

export interface LocalAuthorityProperty {
  name: string;
  type: 'Dry' | 'Food' | 'Garden' | 'Residual';
  containers: Container[];
  notes?: string[];
}

export interface LocalAuthority {
  id: number;
  name: string;
  lastUpdate: string;
  enquiryNumber: string;
  recyclingUri: string;
  hwrcUri: string;
  gardenWasteUri: string;
  properties: { [key in PROPERTY_TYPE_EN]?: LocalAuthorityProperty[] };
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

export interface RecyclingMeta {
  id: number;
  category: 'HINT' | 'QUESTION';
  title: string;
  subtitle: string;
  content: string;
  materials: number[];
  path?: string;
  image?: string;
  cta?: string;
  ctaLink?: string;
}
