import { DryScheme } from '@/types/locatorApi';

/**
 * Returns a list of dry scheme containers that accept the given material
 */
export default function getDryContainersByMaterial(
  materialId: number,
  dryStream: DryScheme[],
): DryScheme[] {
  return dryStream.map((scheme) => ({
    ...scheme,
    containers: scheme.containers.filter(({ materials }) =>
      materials.some(({ id }) => id === materialId),
    ),
  }));
}
