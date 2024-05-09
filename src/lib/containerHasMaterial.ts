import { Container } from '@/types/locatorApi';

export default function containerHasMaterial(
  container: Container,
  { materials, category }: { materials?: string; category?: string } = {},
): boolean {
  return container.materials?.some((material) => {
    if (materials) {
      return materials.split(',').includes(String(material.id));
    }

    if (category) {
      return material.category.id == category;
    }

    return false;
  });
}
