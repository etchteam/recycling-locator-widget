import { expect, test } from 'vitest';

import getStartPath from '@/lib/getStartPath';

test('Default path is /', () => {
  expect(getStartPath({})).toBe('/');
});

test('Path attribute is used if provided', () => {
  expect(getStartPath({ path: '/path' })).toBe('/path');
});
