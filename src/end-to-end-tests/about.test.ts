import { expect } from '@playwright/test';
import { test } from 'vitest';

import i18n from '@/lib/i18n';

import { describeEndToEndTest } from './utils';

describeEndToEndTest('About page', () => {
  test('About page displays when info button is clicked', async ({ page }) => {
    const button = page.getByTestId('about-button').first();
    const aboutTitle = page.getByText(i18n.t('about.title')).first();
    await expect(button).toBeVisible();
    await expect(aboutTitle).not.toBeVisible();
    await button.click();
    await expect(aboutTitle).toBeVisible();
    await button.click();
    await expect(aboutTitle).not.toBeVisible();
  });
});
