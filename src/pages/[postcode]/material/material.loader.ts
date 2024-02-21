import { LoaderFunctionArgs } from 'react-router-dom';

import LocatorApi from '@/lib/LocatorApi';
import getDryContainersByMaterial from '@/lib/getDryContainersByMaterial';
import { DryScheme, LocalAuthority } from '@/types/locatorApi';

export interface MaterialLoaderResponse {
  recycleAtHome: DryScheme[];
}

export default async function materialLoader({
  request,
  params,
}: LoaderFunctionArgs): Promise<MaterialLoaderResponse> {
  const url = new URL(request.url);
  const materialId = Number(url.searchParams.get('id'));
  const postcode = params.postcode;
  const home = await LocatorApi.get<LocalAuthority>(
    `local-authority/${postcode}`,
  );

  return {
    recycleAtHome: getDryContainersByMaterial(materialId, home.dryStreams),
  };
}
