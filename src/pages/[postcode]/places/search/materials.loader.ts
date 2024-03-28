import LocatorApi from '@/lib/LocatorApi';
import { Material } from '@/types/locatorApi';

export interface PlacesMaterialsLoaderResponse {
  materials: Material[];
}

export default async function placesMaterialsLoader() {
  const materials = await LocatorApi.get<Material[]>('materials');

  return { materials };
}
