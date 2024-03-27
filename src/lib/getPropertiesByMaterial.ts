import isEmpty from 'lodash/isEmpty';

import { LocalAuthority, LocalAuthorityProperty } from '@/types/locatorApi';

function hasSchemeWithMaterial(
  materialId: string,
  property: LocalAuthorityProperty[],
): boolean {
  return property.some((scheme) =>
    scheme.containers.some((container) =>
      container.materials?.some((material) => material.id === materialId),
    ),
  );
}

export default function getPropertiesByMaterial(
  materialId: string,
  properties: LocalAuthority['properties'],
): LocalAuthority['properties'] | undefined {
  const propertyTypes = Object.keys(properties);

  const foundProperties = propertyTypes.reduce(
    (propertiesWithMaterial, propertyType) => {
      const property = properties[propertyType];

      if (hasSchemeWithMaterial(materialId, property)) {
        propertiesWithMaterial[propertyType] = property;
      }

      return propertiesWithMaterial;
    },
    {},
  );

  return isEmpty(foundProperties) ? undefined : foundProperties;
}
