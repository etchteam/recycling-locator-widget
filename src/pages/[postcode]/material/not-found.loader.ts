import * as Sentry from '@sentry/browser';

import LocatorApi from '@/lib/LocatorApi';
import { Material } from '@/types/locatorApi';

export interface NotFoundLoaderResponse {
  popularMaterials: Material[];
}

export default async function notFoundLoader(): Promise<NotFoundLoaderResponse> {
  try {
    const materials = await LocatorApi.get<Material[]>('materials');
    const popularMaterials = materials.filter((material) => material.popular);
    return { popularMaterials };
  } catch (error) {
    Sentry.captureException(error, {
      tags: { route: 'Material not found loader' },
    });
    // Let the user carry on without the popularMaterials
    return { popularMaterials: [] };
  }
}
