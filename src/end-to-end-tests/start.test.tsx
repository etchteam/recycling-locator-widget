import { expect, test, beforeAll } from 'vitest';

import '../index';
import { getHostElement, setup } from './utils';

beforeAll(async () => {
  await setup();
});

test('The locator renders', async () => {
  const host = getHostElement();
  const inner = host.querySelector('article');
  expect(inner).toBeTruthy();
});
