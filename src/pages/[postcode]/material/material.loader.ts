import { defer, LoaderFunctionArgs } from 'react-router-dom';

import LocatorApi from '@/lib/LocatorApi';
import { LocalAuthority } from '@/types/locatorApi';

export interface MaterialLoaderResponse {
  materialId: number;
  home: LocalAuthority;
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

  return {
    home,
    materialId,
  };
}

export default async function materialLoader({
  request,
  params,
}: LoaderFunctionArgs) {
  return defer({ data: getData({ request, params }) });
}
