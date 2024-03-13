import { LocalAuthorityProperty } from '@/types/locatorApi';

import getPropertyTypeEnum from './getPropertyTypeEnum';

/**
 * If there's a dry scheme return its name
 * otherwise return the name of the first scheme
 */
export default function getPropertyDisplayName(
  property: LocalAuthorityProperty[],
): string {
  const PROPERTY_TYPE = getPropertyTypeEnum();
  const dryScheme = property.find((scheme) => scheme.type === 'Dry');

  if (dryScheme?.name === PROPERTY_TYPE.ALL) {
    // Avoid displaying "All properties" as the display name if we can help
    return property[0]?.name;
  }

  return dryScheme?.name ?? property[0].name;
}
