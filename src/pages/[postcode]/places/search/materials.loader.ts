import { defer } from 'react-router-dom';

import LocatorApi from '@/lib/LocatorApi';
import { Material } from '@/types/locatorApi';

export interface PlacesMaterialsLoaderResponse {
  materials: Promise<Material[]>;
}

export default async function placesMaterialsLoader() {
  const materials = LocatorApi.get<Material[]>('materials');

  return defer({ materials });
}
