import { expect, test, beforeAll } from 'vitest';

import provideI18n from '../utils/providei18n';
import getPropertyTypeEnum from '@/lib/getPropertyTypeEnum';
import sortPropertyTypes from '@/lib/sortPropertyTypes';

beforeAll(async () => {
  await provideI18n();
});

test('sorts properties in the correct order', () => {
  const PROPERTY_TYPE = getPropertyTypeEnum();
  const LocalAuthorityMock = {
    properties: {
      [PROPERTY_TYPE.ALL]: [],
      [PROPERTY_TYPE.KERBSIDE]: [],
      [PROPERTY_TYPE.NARROW_ACCESS]: [],
      [PROPERTY_TYPE.FLATS_WITH_INDIVIDUAL_BINS]: [],
    },
  };

  expect(Object.keys(LocalAuthorityMock.properties)).toStrictEqual([
    PROPERTY_TYPE.ALL,
    PROPERTY_TYPE.KERBSIDE,
    PROPERTY_TYPE.NARROW_ACCESS,
    PROPERTY_TYPE.FLATS_WITH_INDIVIDUAL_BINS,
  ]);

  expect(
    Object.keys(sortPropertyTypes(LocalAuthorityMock.properties)),
  ).toStrictEqual([
    PROPERTY_TYPE.KERBSIDE,
    PROPERTY_TYPE.FLATS_WITH_INDIVIDUAL_BINS,
    PROPERTY_TYPE.NARROW_ACCESS,
    PROPERTY_TYPE.ALL,
  ]);
});
