import { expect, test } from 'vitest';

import getContainerList from '@/lib/getContainerList';
import { LocalAuthorityProperty } from '@/types/locatorApi';

test('Returns a list of containers in the expected format', () => {
  const mock: LocalAuthorityProperty[] = [
    {
      name: 'Kerbside Properties - Aylesbury area',
      type: 'Dry',
      containers: [],
    },
    {
      name: 'Kerbside Properties - Wycombe area',
      type: 'Residual',
      containers: [],
    },
    {
      name: 'Communal Properties - Chiltern area',
      type: 'Dry',
      containers: [],
    },
    {
      name: 'All Properties with Gardens - Aylesbury area',
      type: 'Garden',
      containers: [],
    },
  ];
  expect(getContainerList(mock)).toEqual({
    Dry: [mock[0], mock[2]],
    Residual: [mock[1]],
    Garden: [mock[3]],
  });
});
