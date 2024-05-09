import { MaterialWithCategory } from '@/types/locatorApi';

/**
 *
 * @param search the material name to search for
 * @param materials a list of materials to search through
 * @returns true if the material name is found in the list of materials
 */
export default function materialNameSearch(
  search: string,
  materials: MaterialWithCategory[] = [],
): boolean {
  return materials.some((material) => {
    const materialName = material.name.toLowerCase();
    const categoryName = material.category?.name.toLowerCase();
    const safeSearch = search.toLowerCase();
    return safeSearch === materialName || safeSearch === categoryName;
  });
}
