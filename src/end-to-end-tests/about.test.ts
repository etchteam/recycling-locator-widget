import { expect } from '@playwright/test';
import { test } from 'vitest';

import { describeEndToEndTest } from './utils';

describeEndToEndTest('About page', () => {
  test('About page displays when info button is clicked', async ({ page }) => {
    const button = page.getByTestId('about-button').first();
    const content = page.getByTestId('about-content').first();
    await expect(button).toBeVisible();
    await expect(content).not.toBeVisible();
    await button.click();
    await expect(content).toBeVisible();
    await button.click();
    await expect(content).not.toBeVisible();
  });
});
