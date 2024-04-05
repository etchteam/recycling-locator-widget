import compact from 'lodash/compact';
import {
  LoaderFunctionArgs,
  defer,
  useRouteLoaderData,
} from 'react-router-dom';

import LocatorApi from '@/lib/LocatorApi';
import PostCodeResolver from '@/lib/PostcodeResolver';
import { getTipByPath } from '@/lib/getTip';
import { LocationsResponse, RecyclingMeta } from '@/types/locatorApi';

export interface PlacesLoaderResponse {
  locations: Promise<LocationsResponse>;
  tip: Promise<RecyclingMeta>;
}

export default async function placesLoader({
  request,
  params,
}: LoaderFunctionArgs) {
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

  const locations = LocatorApi.get<LocationsResponse>(
    `locations/${postcode}?${query}`,
  );

  const tip = getTipByPath('/:postcode/places');

  return defer({
    page,
    locations: locations,
    tip,
  });
}

export function usePlacesLoaderData() {
  return useRouteLoaderData('places') as PlacesLoaderResponse;
}
