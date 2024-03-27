import {
  defer,
  LoaderFunctionArgs,
  useRouteLoaderData,
} from 'react-router-dom';

import LocatorApi from '@/lib/LocatorApi';
import getTip from '@/lib/getTip';
import {
  LocalAuthority,
  LocationsResponse,
  RecyclingMeta,
} from '@/types/locatorApi';

export interface MaterialLoaderResponse {
  materialId: string;
  localAuthority: LocalAuthority;
  locations: LocationsResponse;
  tip: RecyclingMeta;
}

async function getData({
  request,
  params,
}: LoaderFunctionArgs): Promise<MaterialLoaderResponse> {
  const url = new URL(request.url);
  const materialId = url.searchParams.get('id') as string;
  const postcode = params.postcode;
  const localAuthority = await LocatorApi.get<LocalAuthority>(
    `local-authority/${postcode}`,
  );
  const locations = await LocatorApi.get<LocationsResponse>(
    `locations/${postcode}?materials=${materialId}`,
  );
  const meta = await LocatorApi.get<RecyclingMeta[]>(
    'recycling-meta?categories=HINT',
  );
  console.log(`locations/${postcode}?materials=${materialId}`);
  return {
    localAuthority,
    materialId,
    locations,
    tip: getTip(meta, { materialId }),
  };
}

export default async function materialLoader({
  request,
  params,
}: LoaderFunctionArgs) {
  return defer({ data: getData({ request, params }) });
}

export function useMaterialLoaderData() {
  return useRouteLoaderData('material') as {
    data: Promise<MaterialLoaderResponse>;
  };
}
