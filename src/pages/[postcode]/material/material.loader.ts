import { defer, LoaderFunctionArgs } from 'react-router-dom';

import LocatorApi from '@/lib/LocatorApi';
import {
  LocalAuthority,
  Location,
  LocationsResponse,
} from '@/types/locatorApi';

export interface MaterialLoaderResponse {
  materialId: number;
  home: LocalAuthority;
  locations: Location[];
}

async function getData({
  request,
  params,
}: LoaderFunctionArgs): Promise<MaterialLoaderResponse> {
  const url = new URL(request.url);
  const materialId = Number(url.searchParams.get('id'));
  const postcode = params.postcode;
  const home = await LocatorApi.get<LocalAuthority>(
    `local-authority/${postcode}`,
  );
  const locations = await LocatorApi.get<LocationsResponse>(
    `locations/${postcode}?materials=${materialId}`,
  );

  return {
    home,
    materialId,
    locations: locations.items,
  };
}

export default async function materialLoader({
  request,
  params,
}: LoaderFunctionArgs) {
  return defer({ data: getData({ request, params }) });
}
