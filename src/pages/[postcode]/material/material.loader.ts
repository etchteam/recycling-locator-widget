import {
  defer,
  LoaderFunctionArgs,
  useRouteLoaderData,
} from 'react-router-dom';

import LocatorApi from '@/lib/LocatorApi';
import getTip from '@/lib/getTip';
import {
  LocalAuthority,
  Location,
  LocationsResponse,
  RecyclingMeta,
} from '@/types/locatorApi';

export interface MaterialLoaderResponse {
  materialId: number;
  localAuthority: LocalAuthority;
  locations: Location[];
  tip: RecyclingMeta;
}

async function getData({
  request,
  params,
}: LoaderFunctionArgs): Promise<MaterialLoaderResponse> {
  const url = new URL(request.url);
  const materialId = Number(url.searchParams.get('id'));
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

  return {
    localAuthority,
    materialId,
    locations: locations.items,
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
