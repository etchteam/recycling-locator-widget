import { expect, test } from 'vitest';

test('Adds a button', () => {
  document.body.innerHTML = `<button>Button</button>`;
  const button = document.querySelector('button');
  expect(button).not.toBe(null);
});
