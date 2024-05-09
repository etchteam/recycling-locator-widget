import { expect, test } from 'vitest';

import containerHasMaterial from '@/lib/containerHasMaterial';
import { Container } from '@/types/locatorApi';

test('finds a matching material or material category id in a container', () => {
  const container: Container = {
    name: 'Reusable Sack',
    displayName: 'Reusable Sack',
    bodyColour: '#3cb848',
    lidColour: null,
    notes: [],
    materials: [
      {
        id: '10',
        name: 'Junk mail',
        popular: false,
        category: {
          id: '2',
          name: 'Paper',
          popular: false,
        },
      },
      {
        id: 54 as unknown as string,
        name: 'Shoes & bags',
        popular: false,
        category: {
          id: '9',
          name: 'Textiles',
          popular: false,
        },
      },
    ],
  };

  expect(containerHasMaterial(container, { materials: '10' })).toBe(true);
  expect(containerHasMaterial(container, { materials: '54' })).toBe(true);
  expect(containerHasMaterial(container, { category: '9' })).toBe(true);
  expect(containerHasMaterial(container, { materials: '1,2,3,10' })).toBe(true);
  expect(containerHasMaterial(container, { materials: '500' })).toBe(false);
  expect(containerHasMaterial(container, { materials: '1,2,3,4' })).toBe(false);
  expect(containerHasMaterial(container, { category: '10' })).toBe(false);
});
