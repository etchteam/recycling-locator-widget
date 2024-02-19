import { expect, test } from 'vitest';

import getStartPath from '../getStartPath';

test('Default path is /', () => {
  expect(getStartPath({})).toBe('/');
});

test('Postcode attribute is the path if provided', () => {
  expect(getStartPath({ postcode: 'eX32 7rB' })).toBe('/EX327RB');
});

test('Path attribute is used if provided', () => {
  expect(getStartPath({ path: '/path' })).toBe('/path');
  expect(getStartPath({ postcode: 'EX327RB', path: '/path' })).toBe('/path');
});
