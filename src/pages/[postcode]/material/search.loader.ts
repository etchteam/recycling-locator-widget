import * as Sentry from '@sentry/browser';
import { defer } from 'react-router-dom';

import LocatorApi from '@/lib/LocatorApi';
import { Material } from '@/types/locatorApi';

export interface MaterialSearchLoaderResponse {
  popularMaterials: Material[];
}

async function getData(): Promise<MaterialSearchLoaderResponse> {
  try {
    const popularMaterials = await LocatorApi.get<Material[]>(
      'materials?popular=true',
    );

    return {
      popularMaterials,
    };
  } catch (error) {
    Sentry.captureException(error, {
      tags: { route: 'Material search loader' },
    });
    // Let the user carry on without the popularMaterials
    return Promise.resolve({ popularMaterials: [] });
  }
}

export default function materialSearchLoader() {
  return defer({ data: getData() });
}
