import * as Sentry from '@sentry/browser';
import { defer } from 'react-router-dom';

import LocatorApi from '@/lib/LocatorApi';
import { Material } from '@/types/locatorApi';

export interface PlacesSearchLoaderResponse {
  popularMaterials: Material[];
}

async function getData(): Promise<PlacesSearchLoaderResponse> {
  try {
    const popularMaterials = await LocatorApi.get<Material[]>(
      'materials?popular=true',
    );

    return {
      popularMaterials,
    };
  } catch (error) {
    Sentry.captureException(error, {
      tags: { route: 'Places search loader' },
    });
    // Let the user carry on without the popularMaterials
    return Promise.resolve({ popularMaterials: [] });
  }
}

export default async function placesSearchLoader() {
  return defer({ data: getData() });
}
