import { expect, test } from 'vitest';

import materialNameSearch from '@/lib/materialNameSearch';
import { MaterialWithCategory } from '@/types/locatorApi';

test('performs a case insensitive name match against both the material and category name', () => {
  const materials: MaterialWithCategory[] = [
    {
      id: '1',
      name: 'Gift cards',
      category: { id: '1', name: 'Cardboard' },
    },
  ];
  expect(materialNameSearch('GIFT CARDS', materials)).toBe(true);
  expect(materialNameSearch('Cardboard', materials)).toBe(true);
  expect(materialNameSearch('Plastic', materials)).toBe(false);
});
