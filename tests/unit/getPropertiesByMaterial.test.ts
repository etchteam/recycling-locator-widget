import { expect, test } from 'vitest';

import getPropertiesByMaterial from '@/lib/getPropertiesByMaterial';
import { LocalAuthority, PROPERTY_TYPE_EN } from '@/types/locatorApi';

test('Returns properties that accept the given material', () => {
  const properties = {
    [PROPERTY_TYPE_EN.ALL]: [
      {
        name: 'Communal collections',
        containers: [
          {
            name: 'Container 1',
            materials: [{ id: 1 }, { id: 2 }],
          },
          {
            name: 'Container 2',
            materials: [{ id: 1 }, { id: 2 }],
          },
          {
            name: 'Container 3',
            materials: [{ id: 5 }, { id: 2 }],
          },
        ],
      },
      {
        name: 'Non-city centre households',
        containers: [
          {
            materials: [{ id: 3 }, { id: 4 }],
          },
        ],
      },
    ],
    [PROPERTY_TYPE_EN.KERBSIDE]: [
      {
        name: 'Non-city centre households',
        containers: [
          {
            materials: [{ id: 3 }, { id: 4 }],
          },
        ],
      },
    ],
  } as unknown as LocalAuthority['properties'];

  expect(getPropertiesByMaterial(properties, { materials: '1' })).toEqual({
    [PROPERTY_TYPE_EN.ALL]: properties[PROPERTY_TYPE_EN.ALL],
  });
});
