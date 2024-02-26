import { expect, test, beforeAll } from 'vitest';

import provideI18n from '../utils/providei18n';
import tMap from '@/lib/tArray';

beforeAll(async () => {
  await provideI18n();
});

test('invalid tKey', () => {
  expect(tMap('notEvenCloseToAValidKey')).toStrictEqual([]);
});

test('valid tKey', () => {
  expect(tMap('start.aside.list')).toHaveLength(3);
});
