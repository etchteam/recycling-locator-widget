import {
  LoaderFunctionArgs,
  defer,
  useRouteLoaderData,
} from 'react-router-dom';

import LocatorApi from '@/lib/LocatorApi';
import PostCodeResolver from '@/lib/PostcodeResolver';
import createSearchParams from '@/lib/createSearchParams';
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
  const lat = url.searchParams.get('lat');
  const lng = url.searchParams.get('lng');

  const postcode =
    lat && lng
      ? await PostCodeResolver.fromLatLng(Number(lat), Number(lng))
      : params.postcode;

  const searchParams = createSearchParams(
    ['limit', 'radius', 'materials', 'category'],
    {
      limit: page * 30,
      radius: url.searchParams.get('radius') ?? 25,
      materials: url.searchParams.get('materials'),
      category: url.searchParams.get('category'),
    },
  );

  const locations = LocatorApi.get<LocationsResponse>(
    `locations/${postcode}?${searchParams.toString()}`,
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
