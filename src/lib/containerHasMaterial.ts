import { Container } from '@/types/locatorApi';

export function containerHasMaterialName(
  container: Container,
  search: string,
): boolean {
  return container.materials?.some((material) => {
    const materialName = material.name.toLowerCase();
    const categoryName = material.category.name.toLowerCase();
    const safeSearch = search.toLowerCase();
    return safeSearch === materialName || safeSearch === categoryName;
  });
}

export function containerHasMaterialId(
  container: Container,
  { materials, category }: { materials?: string; category?: string } = {},
): boolean {
  return container.materials?.some((material) => {
    if (materials) {
      return material.id == materials;
    }

    if (category) {
      return material.category.id == category;
    }

    return false;
  });
}
