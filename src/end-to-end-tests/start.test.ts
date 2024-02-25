import { t } from 'i18next';
import { expect } from 'playwright/test';
import { test } from 'vitest';

import config from '@/config';

import {
  GuernseyGeocodeResponse,
  PostcodeGeocodeResponse,
} from './mocks/geocode';
import {
  InvalidPostcodeResponse,
  ValidPostcodeResponse,
} from './mocks/postcode';
import describeEndToEndTest from './utils/describeEndToEndTest';

const GEOCODE_ENDPOINT = 'https://geocode.search.hereapi.com/v1/geocode**';
const POSTCODE_ENDPOINT = `${config.locatorApiPath}postcode/**`;

describeEndToEndTest('Postcode location search', () => {
  test('Address outside mainland England', async ({ page }) => {
    await page.route(GEOCODE_ENDPOINT, (route) => {
      route.fulfill({ json: GuernseyGeocodeResponse });
    });

    const input = page.locator('input').first();
    const notInUk = page.getByText(t('notFound.title.notInTheUK')).first();
    await expect(input).toBeVisible();
    await expect(notInUk).not.toBeVisible();
    await input.fill('Guernsey');
    await input.press('Enter');
    await page.waitForRequest(GEOCODE_ENDPOINT);
    await expect(notInUk).toBeVisible();
  });

  test('Valid postcode entry (skips lat lng check)', async ({ page }) => {
    await page.route(GEOCODE_ENDPOINT, (route) => {
      route.fulfill({ json: PostcodeGeocodeResponse });
    });

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
    await page.waitForRequest(GEOCODE_ENDPOINT);
    await expect(postcode).toBeVisible();
    await expect(city).toBeVisible();
    await expect(postcodePageTitle).toBeVisible();
  });

  test('Valid location entry', async ({ page }) => {
    await page.route(GEOCODE_ENDPOINT, (route) => {
      route.fulfill({ json: PostcodeGeocodeResponse });
    });

    await page.route(POSTCODE_ENDPOINT, (route) => {
      route.fulfill({ json: ValidPostcodeResponse });
    });

    const input = page.locator('input').first();
    const postcode = page.getByText('EX327RB').first();
    const city = page.getByText('Barnstaple').first();
    const postcodePageTitle = page.getByText(t('postcode.title')).first();
    await expect(input).toBeVisible();
    await expect(postcode).not.toBeVisible();
    await expect(city).not.toBeVisible();
    await expect(postcodePageTitle).not.toBeVisible();
    await input.fill('Barnstaple');
    await input.press('Enter');
    await page.waitForRequest(GEOCODE_ENDPOINT);
    await page.waitForRequest(POSTCODE_ENDPOINT);
    await expect(postcode).toBeVisible();
    await expect(city).toBeVisible();
    await expect(postcodePageTitle).toBeVisible();
  });

  test('Invalid location entry', async ({ page }) => {
    await page.route(GEOCODE_ENDPOINT, (route) => {
      route.fulfill({ json: PostcodeGeocodeResponse });
    });

    await page.route(POSTCODE_ENDPOINT, (route) => {
      route.fulfill({ json: InvalidPostcodeResponse });
    });

    const input = page.locator('input').first();
    const postcode = page.getByText('EX327RB').first();
    const city = page.getByText('Barnstaple').first();
    const notFoundPageTitle = page
      .getByText(t('notFound.title.default'))
      .first();
    await expect(input).toBeVisible();
    await expect(postcode).not.toBeVisible();
    await expect(city).not.toBeVisible();
    await expect(notFoundPageTitle).not.toBeVisible();
    await input.fill('Barnstaple');
    await input.press('Enter');
    await page.waitForRequest(GEOCODE_ENDPOINT);
    await page.waitForRequest(POSTCODE_ENDPOINT);
    await expect(notFoundPageTitle).toBeVisible();
  });
});
