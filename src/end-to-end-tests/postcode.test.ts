import { expect } from '@playwright/test';
import i18n from 'i18next';
import { test } from 'vitest';

import { GuernseyGeocodeResponse } from './mocks/geocode';
import { describeEndToEndTest } from './utils';

describeEndToEndTest('Postcode location search', () => {
  test('Location not found page shows when a non-mainland England address is entered', async ({
    page,
  }) => {
    console.log(1);
    await page.route('**/v1/geocode**', (route) => {
      console.log('mocking geocode response');
      route.fulfill({
        status: 200,
        json: GuernseyGeocodeResponse,
      });
    });
    console.log(2);
    const label = page.getByText(i18n.t('start.label'));
    const input = page.getByLabel(i18n.t('start.label')).first();
    console.log(3);
    const notInUk = page.getByText(i18n.t('notFound.title.notInTheUK')).first();
    console.log(4, i18n.t('start.label'));
    await expect(label).toBeVisible({ timeout: 30000 });
    console.log(5);
    await expect(input).toBeVisible({ timeout: 30000 });
    console.log(5);
    await expect(notInUk).not.toBeVisible();
    console.log(6);
    await input.fill('Guernsey');
    console.log(7);
    await input.press('Enter');
    console.log(8);
    await expect(notInUk).toBeVisible();
  }, 30000);

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
