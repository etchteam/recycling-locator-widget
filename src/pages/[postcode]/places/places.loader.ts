import { LoaderFunctionArgs, useRouteLoaderData } from 'react-router-dom';

import LocatorApi from '@/lib/LocatorApi';
import { Location, LocationsResponse } from '@/types/locatorApi';

export interface PlacesLoaderResponse {
  locations: Location[];
}

export default async function placesLoader({ params }: LoaderFunctionArgs) {
  const postcode = params.postcode;
  const locations = await LocatorApi.get<LocationsResponse>(
    `locations/${postcode}`,
  );

  return {
    locations: locations.items,
  };
}

export function usePlacesLoaderData() {
  return useRouteLoaderData('places') as PlacesLoaderResponse;
}
