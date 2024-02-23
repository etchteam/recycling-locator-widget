import { LoaderFunctionArgs } from 'react-router-dom';

import LocatorApi from '@/lib/LocatorApi';
import getDryContainersByMaterial from '@/lib/getDryContainersByMaterial';
import {
  DryScheme,
  LocalAuthority,
  Location,
  LocationsResponse,
} from '@/types/locatorApi';

export interface MaterialLoaderResponse {
  recycleAtHome: {
    localAuthority: {
      name: string;
      url: string;
    };
    schemes: DryScheme[];
  };
  locations: Location[];
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
  const locations = await LocatorApi.get<LocationsResponse>(
    `locations/${postcode}?materials=${materialId}`,
  );

  return {
    recycleAtHome: {
      localAuthority: {
        name: home.name,
        url: home.coreInformation.recyclingUri,
      },
      schemes: getDryContainersByMaterial(materialId, home.dryStreams),
    },
    locations: locations.items,
  };
}
