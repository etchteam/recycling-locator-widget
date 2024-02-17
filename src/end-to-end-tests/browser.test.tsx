import { render } from 'preact';
import { expect, test, beforeAll } from 'vitest';

beforeAll(() => {});

test('Adds a button', async () => {
  await import('../index');
  render(
    <>
      <link rel="stylesheet" href="/styles.css" />
      <div style="container-type:inline-size;">
        <recycling-locator></recycling-locator>
      </div>
    </>,
    document.body,
  );
  const renderedWidget = document.querySelector('recycling-locator');
  expect(renderedWidget).not.toBe(null);
});
