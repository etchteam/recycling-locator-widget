import { t } from 'i18next';
import { expect } from 'playwright/test';
import { test } from 'vitest';

import {
  GuernseyGeocodeResponse,
  PostcodeGeocodeResponse,
} from './mocks/geocode';
import { describeEndToEndTest } from './utils';

describeEndToEndTest('Postcode location search', () => {
  test('Location not found page shows when a non-mainland England address is entered', async ({
    page,
  }) => {
    await page.route(
      'https://geocode.search.hereapi.com/v1/geocode**',
      (route) => {
        route.fulfill({
          status: 200,
          json: GuernseyGeocodeResponse,
        });
      },
    );

    const input = page.locator('input').first();
    const notInUk = page.getByText(t('notFound.title.notInTheUK')).first();
    await expect(input).toBeVisible({ timeout: 30000 });
    await expect(notInUk).not.toBeVisible();
    await input.fill('Guernsey');
    await input.press('Enter');
    await page.waitForRequest(
      'https://geocode.search.hereapi.com/v1/geocode**',
    );
    await expect(notInUk).toBeVisible();
  });

  test('Location found page shows with the valid postcode + city entered', async ({
    page,
  }) => {
    await page.route(
      'https://geocode.search.hereapi.com/v1/geocode**',
      (route) => {
        route.fulfill({
          status: 200,
          json: PostcodeGeocodeResponse,
        });
      },
    );

    const input = page.locator('input').first();
    const postcode = page.getByText('EX327RB').first();
    const city = page.getByText('Barnstaple').first();
    const postcodePageTitle = page.getByText(t('postcode.title')).first();
    await expect(input).toBeVisible();
    await expect(postcode).not.toBeVisible();
    await expect(city).not.toBeVisible();
    await expect(postcodePageTitle).not.toBeVisible();
    await input.fill('EX32 7RB');
    await input.press('Enter');
    await page.waitForRequest(
      'https://geocode.search.hereapi.com/v1/geocode**',
    );
    await expect(postcode).toBeVisible();
    await expect(city).toBeVisible();
    await expect(postcodePageTitle).toBeVisible();
  });
});
