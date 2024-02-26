import { LoaderFunctionArgs } from 'react-router-dom';

import LocatorApi from '@/lib/LocatorApi';
import { LocalAuthority } from '@/types/locatorApi';

export interface HomeRecyclingLoaderResponse {
  localAuthority: LocalAuthority;
}

export default async function homeRecyclingLoader({
  params,
}: LoaderFunctionArgs) {
  const postcode = params.postcode;
  const localAuthority = await LocatorApi.get<LocalAuthority>(
    `local-authority/${postcode}`,
  );

  return {
    localAuthority,
  };
}
