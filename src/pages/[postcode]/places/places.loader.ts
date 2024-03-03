import compact from 'lodash/compact';
import { LoaderFunctionArgs, useRouteLoaderData } from 'react-router-dom';

import LocatorApi from '@/lib/LocatorApi';
import { Location, LocationsResponse } from '@/types/locatorApi';

export interface PlacesLoaderResponse {
  locations: Location[];
  /** Max is true if no more results can be loaded */
  max: boolean;
  /** The page being requested by the loader */
  page: number;
  /** The material being requested by the loader */
  materialId?: string;
}

export default async function placesLoader({
  request,
  params,
}: LoaderFunctionArgs) {
  const postcode = params.postcode;
  const url = new URL(request.url);
  const page = Number(url.searchParams.get('page') ?? 1);
  const materialId = url.searchParams.get('materialId');
  const limit = page * 30;
  const query = compact([
    `limit=${limit}`,
    'radius=25',
    materialId ? `materials=${materialId}` : undefined,
  ]).join('&');

  const locations = await LocatorApi.get<LocationsResponse>(
    `locations/${postcode}?${query}`,
  );
  const locationsCount = locations.items.length;

  return {
    locations: locations.items,
    max: locationsCount < limit || limit === 120,
    page,
    materialId,
  };
}

export function usePlacesLoaderData() {
  return useRouteLoaderData('places') as PlacesLoaderResponse;
}
