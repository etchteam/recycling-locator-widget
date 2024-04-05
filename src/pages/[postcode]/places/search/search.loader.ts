import * as Sentry from '@sentry/browser';
import { defer } from 'react-router-dom';

import LocatorApi from '@/lib/LocatorApi';
import { Material } from '@/types/locatorApi';

export interface PlacesSearchLoaderResponse {
  popularMaterials: Promise<Material[]>;
}

export default async function placesSearchLoader() {
  const popularMaterials = LocatorApi.get<Material[]>(
    'materials?popular=true',
  ).catch((error) => {
    Sentry.captureException(error, {
      tags: { route: 'Places search loader' },
    });
    return Promise.resolve([]);
  });

  return defer({ popularMaterials });
}
