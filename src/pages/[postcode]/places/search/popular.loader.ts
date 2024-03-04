import LocatorApi from '@/lib/LocatorApi';
import { Material } from '@/types/locatorApi';

export interface PopularSearchLoaderResponse {
  popularMaterials: Material[];
}

export default async function popularSearchLoader() {
  const popularMaterials = await LocatorApi.get<Material[]>(
    'materials?popular=true',
  );

  return {
    popularMaterials,
  };
}
