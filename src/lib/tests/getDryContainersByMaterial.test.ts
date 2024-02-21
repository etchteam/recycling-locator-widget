import { expect, test } from 'vitest';

import getDryContainersByMaterial from '../getDryContainersByMaterial';
import { DryScheme } from '@/types/locatorApi';

test('Returns dry containers that accept the given material', () => {
  const dryStream = [
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
  ] as DryScheme[];

  expect(getDryContainersByMaterial(1, dryStream)).toEqual([
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
      ],
    },
    {
      name: 'Non-city centre households',
      containers: [],
    },
  ]);
});
