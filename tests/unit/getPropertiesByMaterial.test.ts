import { expect, test } from 'vitest';

import getPropertiesByMaterial from '@/lib/getPropertiesByMaterial';
import { LocalAuthority, PROPERTY_TYPE } from '@/types/locatorApi';

test('Returns properties that accept the given material', () => {
  const properties = {
    [PROPERTY_TYPE.ALL]: [
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
    [PROPERTY_TYPE.KERBSIDE]: [
      {
        name: 'Non-city centre households',
        containers: [
          {
            materials: [{ id: 3 }, { id: 4 }],
          },
        ],
      },
    ],
  } as LocalAuthority['properties'];

  expect(getPropertiesByMaterial(1, properties)).toEqual({
    [PROPERTY_TYPE.ALL]: properties[PROPERTY_TYPE.ALL],
  });
});
