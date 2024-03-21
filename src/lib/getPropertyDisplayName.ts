import {
  LocalAuthority,
  LocalAuthorityProperty as LAProperty,
} from '@/types/locatorApi';

import getPropertyTypeEnum from './getPropertyTypeEnum';

function filterAllProperties(
  property: LAProperty[],
  allProperties: LAProperty[],
) {
  return property.filter(
    (scheme) =>
      !allProperties.some((allScheme) => allScheme.name === scheme.name),
  );
}

/**
 * If there's a dry scheme return its name
 * otherwise return the name of the first scheme
 */
export default function getPropertyDisplayName(
  properties: LocalAuthority['properties'],
  propertyType: string,
): string {
  const PROPERTY_TYPE = getPropertyTypeEnum();
  const property = properties[propertyType] as LAProperty[];
  const allProperties = properties[PROPERTY_TYPE.ALL] as LAProperty[];
  const filteredSchemes =
    allProperties && propertyType !== PROPERTY_TYPE.ALL
      ? filterAllProperties(allProperties, property)
      : property;
  const dryScheme = filteredSchemes.find((scheme) => scheme.type === 'Dry');

  if (dryScheme?.name === PROPERTY_TYPE.ALL) {
    // Avoid displaying "All properties" as the display name if we can help it
    return filteredSchemes[0]?.name;
  }

  return dryScheme?.name ?? property[0].name;
}
