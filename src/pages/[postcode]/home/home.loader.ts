import { omit } from 'lodash';
import { LoaderFunctionArgs, useRouteLoaderData } from 'react-router-dom';

import LocatorApi from '@/lib/LocatorApi';
import { LocalAuthority, PROPERTY_TYPE } from '@/types/locatorApi';

export interface HomeRecyclingLoaderResponse {
  localAuthority: LocalAuthority;
  properties: LocalAuthority['properties'];
}

export default async function homeRecyclingLoader({
  params,
}: LoaderFunctionArgs) {
  const postcode = params.postcode;
  const localAuthority = await LocatorApi.get<LocalAuthority>(
    `local-authority/${postcode}`,
  );
  const propertyTypes = Object.keys(localAuthority.properties);

  return {
    localAuthority,
    // Place "All properties" at the end of the list
    properties: propertyTypes.includes(PROPERTY_TYPE.ALL)
      ? {
          ...omit(localAuthority.properties, PROPERTY_TYPE.ALL),
          [PROPERTY_TYPE.ALL]: localAuthority.properties[PROPERTY_TYPE.ALL],
        }
      : localAuthority.properties,
  };
}

export function useHomeRecyclingLoaderData() {
  return useRouteLoaderData('home-recycling') as HomeRecyclingLoaderResponse;
}
