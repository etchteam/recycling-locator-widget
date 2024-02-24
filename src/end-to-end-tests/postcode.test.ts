import { expect } from '@playwright/test';
import i18n from 'i18next';
import { test } from 'vitest';

import { describeEndToEndTest } from './utils';

describeEndToEndTest('Postcode location search', () => {
  test('Location not found page shows when a non-mainland England address is entered', async ({
    page,
  }) => {
    const input = page.getByLabel(i18n.t('start.label')).first();
    const notInUk = page.getByText(i18n.t('notFound.title.notInTheUK')).first();
    await expect(input).toBeVisible();
    await expect(notInUk).not.toBeVisible();
    await input.fill('Guernsey');
    await input.press('Enter');
    await expect(notInUk).toBeVisible();
  });

  test('Location found page shows with the valid postcode + city entered', async ({
    page,
  }) => {
    const input = page.getByLabel(i18n.t('start.label')).first();
    const postcode = page.getByText('EX327RB').first();
    const city = page.getByText('Barnstaple').first();
    const postcodePageTitle = page.getByText(i18n.t('postcode.title')).first();
    await expect(input).toBeVisible();
    await expect(postcode).not.toBeVisible();
    await expect(city).not.toBeVisible();
    await expect(postcodePageTitle).not.toBeVisible();
    await input.fill('EX32 7RB');
    await input.press('Enter');
    await expect(postcode).toBeVisible();
    await expect(city).toBeVisible();
    await expect(postcodePageTitle).toBeVisible();
  });
});
