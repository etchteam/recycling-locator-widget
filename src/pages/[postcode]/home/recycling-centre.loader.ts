import { LoaderFunctionArgs } from 'react-router-dom';

import LocatorApi from '@/lib/LocatorApi';
import { Location, LocationsResponse } from '@/types/locatorApi';

export interface HomeRecyclingCentreLoaderResponse {
  locations: Location[];
}

export default async function homeRecyclingCentreLoader({
  params,
}: LoaderFunctionArgs) {
  const postcode = params.postcode;
  const locations = await LocatorApi.get<LocationsResponse>(
    `locations/${postcode}`,
  );

  return {
    locations: locations.items,
  };
}
