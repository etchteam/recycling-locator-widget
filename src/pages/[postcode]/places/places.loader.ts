import { LoaderFunctionArgs, useRouteLoaderData } from 'react-router-dom';

import LocatorApi from '@/lib/LocatorApi';
import { Location, LocationsResponse } from '@/types/locatorApi';

export interface PlacesLoaderResponse {
  locations: Location[];
  /** Max is true if no more results can be loaded */
  max: boolean;
}

export default async function placesLoader({
  request,
  params,
}: LoaderFunctionArgs) {
  const postcode = params.postcode;
  const url = new URL(request.url);
  const page = Number(url.searchParams.get('page') ?? 1);
  const limit = page * 30;
  const locations = await LocatorApi.get<LocationsResponse>(
    `locations/${postcode}?limit=${limit}&radius=25`,
  );
  const locationsCount = locations.items.length;

  return {
    locations: locations.items,
    max: locationsCount < limit || limit === 120,
  };
}

export function usePlacesLoaderData() {
  return useRouteLoaderData('places') as PlacesLoaderResponse;
}
