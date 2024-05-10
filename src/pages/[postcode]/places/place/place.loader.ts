import { LoaderFunctionArgs, useRouteLoaderData } from 'react-router-dom';

import LocatorApi from '@/lib/LocatorApi';
import { Location } from '@/types/locatorApi';

export interface PlaceLoaderResponse {
  location: Promise<Location>;
}

function loadPlaceByProvider({
  provider,
  id,
  postcode,
}: {
  provider: 'wrap' | 'valpak';
  id: string;
  postcode?: string;
}) {
  return LocatorApi.get<Location>(
    provider === 'wrap'
      ? `location/${provider}/${id}`
      : `location/${provider}/${id}/${postcode}`,
  );
}

function loadPlaceByNameAndPostcode({
  name,
  postcode,
}: {
  name: string;
  postcode: string;
}) {
  return LocatorApi.get<Location>(`location/${name}/${postcode}`);
}

export default async function placeLoader({ params }: LoaderFunctionArgs) {
  const { placeNameOrProvider, placePostcodeOrId, placePostcode } = params;

  if (placeNameOrProvider === 'wrap' || placeNameOrProvider === 'valpak') {
    return {
      location: loadPlaceByProvider({
        provider: placeNameOrProvider,
        id: placePostcodeOrId,
        postcode: placePostcode,
      }),
    };
  }

  return {
    location: loadPlaceByNameAndPostcode({
      name: placeNameOrProvider,
      postcode: placePostcodeOrId,
    }),
  };
}

export function usePlaceLoaderData() {
  return useRouteLoaderData('place') as PlaceLoaderResponse;
}
