import { expect, test } from 'vitest';

import getTip from '@/lib/getTip';
import { RecyclingMeta } from '@/types/locatorApi';

const metaMock = [
  { title: 'tip 1', materials: [1], path: null },
  { title: 'tip 2', materials: [2], path: '/path' },
  { title: 'tip 3', materials: [], path: null },
] as RecyclingMeta[];

test('Returns a material tip given a material id', () => {
  expect(getTip(metaMock, { materialId: 1 })).toBe(metaMock[0]);
});

test('Returns a tip with a matching path given a path', () => {
  expect(getTip(metaMock, { path: '/path' })).toBe(metaMock[1]);
});

test('Returns a generic tip when not given a materialId or path', () => {
  expect(getTip(metaMock)).toBe(metaMock[2]);
});

test('Returns one tip that matches the material or path given', () => {
  expect(getTip(metaMock, { materialId: 1, path: '/path' })).toSatisfy(
    (value) => {
      return value === metaMock[0] || value === metaMock[1];
    },
  );
});

test('Returns a generic tip if no matching path or material is found', () => {
  expect(getTip(metaMock, { materialId: 100, path: '/nooooo' })).toBe(
    metaMock[2],
  );
});
