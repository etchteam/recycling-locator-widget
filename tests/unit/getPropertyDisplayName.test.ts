import { expect, test } from 'vitest';

import getPropertyDisplayName from '@/lib/getPropertyDisplayName';
import { LocalAuthority, PROPERTY_TYPE_EN } from '@/types/locatorApi';

test('Returns the first dry scheme name if there is one', () => {
  const drySchemeName = 'This one';
  const properties = {
    [PROPERTY_TYPE_EN.ALL]: [
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

  expect(getPropertyDisplayName(properties, PROPERTY_TYPE_EN.ALL)).toEqual(
    drySchemeName,
  );
});

test('Returns the first scheme name if there is no dry scheme', () => {
  const firstSchemeName = 'Non-city centre households';
  const properties = {
    [PROPERTY_TYPE_EN.ALL]: [
      {
        name: firstSchemeName,
        type: 'Food',
      },
      {
        name: 'Another scheme',
        type: 'Garden',
      },
      {
        name: 'Communal collections',
        type: 'Food',
      },
    ],
  } as LocalAuthority['properties'];

  expect(getPropertyDisplayName(properties, PROPERTY_TYPE_EN.ALL)).toEqual(
    firstSchemeName,
  );
});

test('Returns the first scheme name if the dry scheme is named all properties', () => {
  const firstSchemeName = 'Non-city centre households';
  const properties = {
    [PROPERTY_TYPE_EN.ALL]: [
      {
        name: firstSchemeName,
        type: 'Food',
      },
      {
        name: PROPERTY_TYPE_EN.ALL,
        type: 'Dry',
      },
      {
        name: 'Communal collections',
        type: 'Food',
      },
    ],
  } as LocalAuthority['properties'];

  expect(getPropertyDisplayName(properties, PROPERTY_TYPE_EN.ALL)).toEqual(
    firstSchemeName,
  );
});

test('Returns the scheme name not associated with all properties', () => {
  const properties = {
    [PROPERTY_TYPE_EN.ALL]: [
      {
        name: 'Some scheme',
        type: 'Food',
      },
      {
        name: 'All properties dry',
        type: 'Dry',
      },
      {
        name: 'Communal collections',
        type: 'Food',
      },
    ],
    [PROPERTY_TYPE_EN.KERBSIDE]: [
      {
        name: 'Another scheme',
        type: 'Food',
      },
      {
        name: 'Some scheme',
        type: 'Food',
      },
      {
        name: 'All properties dry',
        type: 'Dry',
      },
      {
        name: 'Communal collections',
        type: 'Food',
      },
    ],
  } as LocalAuthority['properties'];

  expect(getPropertyDisplayName(properties, PROPERTY_TYPE_EN.KERBSIDE)).toEqual(
    'Another scheme',
  );
});
