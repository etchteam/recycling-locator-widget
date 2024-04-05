import { LocalAuthority } from '@/types/locatorApi';

import getPropertyTypeEnum from './getPropertyTypeEnum';

export default function sortPropertyTypes(
  properties: LocalAuthority['properties'],
) {
  const PROPERTY_TYPE = getPropertyTypeEnum();
  const sortOrder = [
    PROPERTY_TYPE.KERBSIDE,
    PROPERTY_TYPE.FLATS_WITH_INDIVIDUAL_BINS,
    PROPERTY_TYPE.FLATS_WITH_COMMUNAL_BINS,
    PROPERTY_TYPE.NARROW_ACCESS,
    PROPERTY_TYPE.ALL,
  ] as string[];

  return Object.keys(properties)
    .toSorted((a, b) => {
      return sortOrder.indexOf(a) - sortOrder.indexOf(b);
    })
    .reduce((sorted, propertyType) => {
      sorted[propertyType] = properties[propertyType];
      return sorted;
    }, {});
}
