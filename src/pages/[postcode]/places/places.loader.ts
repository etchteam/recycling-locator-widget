import compact from 'lodash/compact';
import { LoaderFunctionArgs, defer } from 'react-router-dom';

import LocatorApi from '@/lib/LocatorApi';
import PostCodeResolver from '@/lib/PostcodeResolver';
import getTip from '@/lib/getTip';
import { Location, LocationsResponse, RecyclingMeta } from '@/types/locatorApi';

export interface PlacesLoaderResponse {
  latitude: number;
  longitude: number;
  locations: Location[];
  /** Max is true if no more results can be loaded */
  max: boolean;
  /** The page being requested by the loader */
  page: number;
  /** The material being requested by the loader */
  materialId?: string;
  tip: RecyclingMeta;
}

async function getData({
  request,
  params,
}: LoaderFunctionArgs): Promise<PlacesLoaderResponse> {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get('page') ?? 1);
  const radius = Number(url.searchParams.get('radius') ?? 25);
  const materialId = url.searchParams.get('materialId');
  const lat = url.searchParams.get('lat');
  const lng = url.searchParams.get('lng');
  const limit = page * 30;

  const postcode =
    lat && lng
      ? await PostCodeResolver.fromLatLng(Number(lat), Number(lng))
      : params.postcode;

  const query = compact([
    `limit=${limit}`,
    `radius=${radius}`,
    materialId ? `materials=${materialId}` : undefined,
  ]).join('&');

  const locations = await LocatorApi.get<LocationsResponse>(
    `locations/${postcode}?${query}`,
  );
  const locationsCount = locations.items.length;

  const meta = await LocatorApi.get<RecyclingMeta[]>(
    'recycling-meta?categories=HINT',
  );

  return {
    latitude: locations.latitude,
    longitude: locations.longitude,
    locations: locations.items,
    max: locationsCount < limit || limit === 120,
    page,
    materialId,
    tip: getTip(meta, { path: '/:postcode/places' }),
  };
}

export default async function placesLoader(args: LoaderFunctionArgs) {
  return defer({ data: getData(args) });
}
