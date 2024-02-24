import { expect } from '@playwright/test';
import { test } from 'vitest';

import { describeEndToEndTest } from './utils';

describeEndToEndTest('Postcode location search', () => {
  test('Location not found page shows when a non-mainland England address is entered', async ({
    page,
  }) => {
    const input = page.getByLabel('Where are you?').first();
    const notInUk = page
      .getByText('Sorry, this service isn’t available in your area.')
      .first();
    await expect(input).toBeVisible();
    await expect(notInUk).not.toBeVisible();
    await input.fill('Guernsey');
    await input.press('Enter');
    await expect(notInUk).toBeVisible();
  });
});
