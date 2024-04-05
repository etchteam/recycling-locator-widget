import {
  LoaderFunctionArgs,
  defer,
  useRouteLoaderData,
} from 'react-router-dom';

import LocatorApi from '@/lib/LocatorApi';
import { LocalAuthority } from '@/types/locatorApi';

export interface HomeRecyclingLoaderResponse {
  localAuthority: Promise<LocalAuthority>;
}

export default function homeRecyclingLoader({ params }: LoaderFunctionArgs) {
  const postcode = params.postcode;
  const localAuthority = LocatorApi.get<LocalAuthority>(
    `local-authority/${postcode}`,
  );

  return defer({ localAuthority });
}

export function useHomeRecyclingLoaderData() {
  return useRouteLoaderData('home-recycling') as HomeRecyclingLoaderResponse;
}
