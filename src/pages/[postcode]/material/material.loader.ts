import { defer, LoaderFunctionArgs } from 'react-router-dom';

import LocatorApi from '@/lib/LocatorApi';
import { getTipByMaterial } from '@/lib/getTip';
import {
  LocalAuthority,
  LocationsResponse,
  RecyclingMeta,
} from '@/types/locatorApi';

interface MaterialLoaderResponse {
  materialId: string;
  materialName: string;
}

export interface DeferredMaterialLoaderResponse extends MaterialLoaderResponse {
  localAuthority: Promise<LocalAuthority>;
  locations: Promise<LocationsResponse>;
  tip: Promise<RecyclingMeta>;
}

export interface AwaitedMaterialLoaderResponse extends MaterialLoaderResponse {
  localAuthority: LocalAuthority;
  locations: LocationsResponse;
  tip?: RecyclingMeta;
}

export default async function materialLoader({
  request,
  params,
}: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const materialId = url.searchParams.get('id');
  const materialName = url.searchParams.get('name');
  const postcode = params.postcode;
  const localAuthority = LocatorApi.get<LocalAuthority>(
    `local-authority/${postcode}`,
  );
  const locations = LocatorApi.get<LocationsResponse>(
    `locations/${postcode}?materials=${materialId}`,
  );
  const tip = getTipByMaterial(materialId);

  return defer({
    materialId,
    materialName,
    localAuthority,
    locations,
    tip,
  });
}
