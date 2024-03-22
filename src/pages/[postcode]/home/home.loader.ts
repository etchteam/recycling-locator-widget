import { LoaderFunctionArgs, useRouteLoaderData } from 'react-router-dom';

import LocatorApi from '@/lib/LocatorApi';
import getPropertyTypeEnum from '@/lib/getPropertyTypeEnum';
import { LocalAuthority } from '@/types/locatorApi';

export interface HomeRecyclingLoaderResponse {
  localAuthority: LocalAuthority;
  properties: LocalAuthority['properties'];
}

export default async function homeRecyclingLoader({
  params,
}: LoaderFunctionArgs) {
  const postcode = params.postcode;
  const PROPERTY_TYPE = getPropertyTypeEnum();
  const localAuthority = await LocatorApi.get<LocalAuthority>(
    `local-authority/${postcode}`,
  );

  const sortOrder = [
    PROPERTY_TYPE.KERBSIDE,
    PROPERTY_TYPE.FLATS_WITH_INDIVIDUAL_BINS,
    PROPERTY_TYPE.FLATS_WITH_COMMUNAL_BINS,
    PROPERTY_TYPE.NARROW_ACCESS,
    PROPERTY_TYPE.ALL,
  ] as string[];

  const sortedProperties = Object.keys(localAuthority.properties)
    .toSorted((a, b) => {
      return sortOrder.indexOf(a) - sortOrder.indexOf(b);
    })
    .reduce((sorted, propertyType) => {
      sorted[propertyType] = localAuthority.properties[propertyType];
      return sorted;
    }, {});

  return {
    localAuthority,
    properties: sortedProperties,
  };
}

export function useHomeRecyclingLoaderData() {
  return useRouteLoaderData('home-recycling') as HomeRecyclingLoaderResponse;
}
