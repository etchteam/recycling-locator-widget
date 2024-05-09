import isEmpty from 'lodash/isEmpty';

import containerHasMaterial from '@/lib/containerHasMaterial';
import { LocalAuthority, LocalAuthorityProperty } from '@/types/locatorApi';

function hasSchemeWithMaterial(
  property: LocalAuthorityProperty[],
  { materials, category }: { materials?: string; category?: string },
): boolean {
  return property.some((scheme) =>
    scheme.containers.some((container) =>
      containerHasMaterial(container, { materials, category }),
    ),
  );
}

export default function getPropertiesByMaterial(
  properties: LocalAuthority['properties'] = {},
  { materials, category }: { materials?: string; category?: string } = {},
): LocalAuthority['properties'] | undefined {
  const propertyTypes = Object.keys(properties);

  const foundProperties = propertyTypes.reduce(
    (propertiesWithMaterial, propertyType) => {
      const property = properties[propertyType];

      if (hasSchemeWithMaterial(property, { materials, category })) {
        propertiesWithMaterial[propertyType] = property;
      }

      return propertiesWithMaterial;
    },
    {},
  );

  return isEmpty(foundProperties) ? undefined : foundProperties;
}
