import { expect, test } from 'vitest';

import getPropertyDisplayName from '@/lib/getPropertyDisplayName';
import { LocalAuthority, PROPERTY_TYPE } from '@/types/locatorApi';

test('Returns the first dry scheme name if there is one', () => {
  const drySchemeName = 'This one';
  const properties = {
    [PROPERTY_TYPE.ALL]: [
      {
        name: 'Non-city centre households',
        type: 'Food',
      },
      {
        name: drySchemeName,
        type: 'Dry',
      },
      {
        name: 'Communal collections',
        type: 'Dry',
      },
    ],
  } as LocalAuthority['properties'];

  expect(getPropertyDisplayName(properties[PROPERTY_TYPE.ALL])).toEqual(
    drySchemeName,
  );
});

test('Returns the first scheme name if there is no dry scheme', () => {
  const firstSchemeName = 'Non-city centre households';
  const properties = {
    [PROPERTY_TYPE.ALL]: [
      {
        name: firstSchemeName,
        type: 'Food',
      },
      {
        name: drySchemeName,
        type: 'Garden',
      },
      {
        name: 'Communal collections',
        type: 'Food',
      },
    ],
  } as LocalAuthority['properties'];

  expect(getPropertyDisplayName(properties[PROPERTY_TYPE.ALL])).toEqual(
    firstSchemeName,
  );
});
