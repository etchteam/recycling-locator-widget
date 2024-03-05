import { LoaderFunctionArgs } from 'react-router-dom';

import LocatorApi from '@/lib/LocatorApi';
import { Location } from '@/types/locatorApi';

export interface PlaceLoaderResponse {
  location: Location;
}

export default async function placeLoader({ params }: LoaderFunctionArgs) {
  // TODO(WRAP-207): Use params.id instead
  const location = await LocatorApi.get<Location>(
    `location/${params.placeName}/${params.placePostcode}`,
  );
  throw new Error('Not implemented');
  return {
    location,
  };
}
