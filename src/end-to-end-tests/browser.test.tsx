import { expect, test, beforeAll } from 'vitest';

import '../index';

beforeAll(() => {});

test('Adds a button', async () => {
  document.body.innerHTML = '<recycling-locator></recycling-locator>';
  const renderedWidget = document.querySelector('recycling-locator');
  expect(renderedWidget).not.toBe(null);
});
