import { expect } from '@playwright/test';
import { t } from 'i18next';
import { test } from 'vitest';

import { GEOCODE_ENDPOINT, PostcodeGeocodeResponse } from '../mocks/geocode';
import { LOCATIONS_ENDPOINT, LocationsResponse } from '../mocks/locations';
import {
  MATERIALS_ENDPOINT,
  POPULAR_MATERIALS_ENDPOINT,
  PopularMaterialsResponse,
  ValidMaterialsResponse,
} from '../mocks/materials';
import describeEndToEndTest from '../utils/describeEndToEndTest';
import config from '@/config';

describeEndToEndTest('Places', () => {
  test('Places get listed', async ({ page, widget }) => {
    await page.route(LOCATIONS_ENDPOINT, (route) => {
      route.fulfill({ json: LocationsResponse });
    });

    const placesCount = page.getByText(t('places.count', { count: 1 })).first();
    const placeName = page.getByText(LocationsResponse.items[0].name).first();

    await widget.evaluate((node) =>
      node.setAttribute('path', '/EX32%207RB/places'),
    );

    await page.waitForRequest(LOCATIONS_ENDPOINT);
    await expect(placesCount).toBeVisible();
    await expect(placeName).toBeVisible();
  });

  test('Load more', async ({ page, widget }) => {
    const mockLocation = LocationsResponse.items[0];

    await page.route(
      `${config.locatorApiPath}locations/EX32%207RB?limit=30&radius=25`,
      (route) => {
        route.fulfill({
          json: {
            ...LocationsResponse,
            items: Array.from({ length: 30 }, (_, i) => ({
              ...mockLocation,
              id: i,
            })),
          },
        });
      },
    );

    await page.route(
      `${config.locatorApiPath}locations/EX32%207RB?limit=60&radius=25`,
      (route) => {
        route.fulfill({
          json: {
            ...LocationsResponse,
            items: Array.from({ length: 50 }, (_, i) => ({
              ...mockLocation,
              id: i,
            })),
          },
        });
      },
    );

    const placesCount30 = page
      .getByText(t('places.count', { count: 30 }))
      .first();
    const placesCount50 = page
      .getByText(t('places.count', { count: 50 }))
      .first();
    const loadMoreButton = page.getByRole('button', {
      name: t('actions.loadMore'),
    });

    await widget.evaluate((node) =>
      node.setAttribute('path', '/EX32%207RB/places'),
    );
    await page.waitForRequest(LOCATIONS_ENDPOINT);
    await expect(placesCount30).toBeVisible();
    await loadMoreButton.click();
    await expect(placesCount50).toBeVisible();
    // load more not visible because only 50 locations are available
    await expect(loadMoreButton).not.toBeVisible();
  });

  test('Search', async ({ page, widget }) => {
    await page.route(GEOCODE_ENDPOINT, (route) => {
      route.fulfill({ json: PostcodeGeocodeResponse });
    });

    await page.route(POPULAR_MATERIALS_ENDPOINT, (route) => {
      route.fulfill({ json: PopularMaterialsResponse });
    });

    await page.route(MATERIALS_ENDPOINT, (route) => {
      route.fulfill({
        json: ValidMaterialsResponse,
      });
    });

    await page.route(
      `${config.locatorApiPath}locations/EX32%207RB?limit=30&radius=25`,
      (route) => {
        route.fulfill({ json: LocationsResponse });
      },
    );

    await page.route(
      `${config.locatorApiPath}locations/EX32%207RB?limit=30&radius=25&materials=undefined`,
      (route) => {
        route.fulfill({
          json: {
            ...LocationsResponse,
            items: [],
          },
        });
      },
    );

    await page.route(
      `${config.locatorApiPath}locations/EX32%207RB?limit=30&radius=25&materials=${ValidMaterialsResponse[0].id}`,
      (route) => {
        route.fulfill({ json: LocationsResponse });
      },
    );

    const placesCount = page.getByText(t('places.count', { count: 1 })).first();
    const placeName = page.getByText(LocationsResponse.items[0].name).first();
    const searchLink = page
      .getByRole('link', { name: t('places.searchPlaceholder') })
      .first();
    const materialInput = page
      .getByPlaceholder(t('components.materialSearchInput.placeholder'))
      .first();
    const fakeMaterial = 'Not a material m8';
    const realMaterial = ValidMaterialsResponse[0].name;
    const fakeMaterialTag = page
      .locator('button', { has: page.getByText(fakeMaterial).first() })
      .first();
    const realMaterialTag = page
      .locator('button', { has: page.getByText(realMaterial).first() })
      .first();

    await widget.evaluate((node) =>
      node.setAttribute('path', '/EX32%207RB/places'),
    );

    await page.waitForRequest(LOCATIONS_ENDPOINT);
    console.log(1);
    await expect(placesCount).toBeVisible();
    console.log(2);
    await expect(placeName).toBeVisible();
    console.log(3);
    await searchLink.click();
    console.log(4);
    await expect(materialInput).toBeVisible();
    console.log(5);
    await materialInput.fill(fakeMaterial);
    console.log(6);
    await materialInput.press('Enter');
    console.log(7);
    await page.waitForRequest(LOCATIONS_ENDPOINT);
    console.log(8);
    await expect(fakeMaterialTag).toBeVisible();
    console.log(9);
    await expect(placeName).not.toBeVisible();
    console.log(10);
    await fakeMaterialTag.click();
    console.log(11);
    await page.waitForRequest(LOCATIONS_ENDPOINT);
    console.log(12);
    await expect(fakeMaterialTag).not.toBeVisible();
    console.log(13);
    await expect(placeName).toBeVisible();
    console.log(14);
    await searchLink.click();
    console.log(15);
    await materialInput.fill(realMaterial);
    console.log(16);
    await materialInput.press('Enter');
    console.log(17);
    await page.waitForRequest(LOCATIONS_ENDPOINT);
    console.log(18);
    await expect(realMaterialTag).toBeVisible();
    console.log(19);
    await expect(placeName).toBeVisible();
  });

  test('Map', async ({ page, widget }) => {
    await page.route(GEOCODE_ENDPOINT, (route) => {
      route.fulfill({ json: PostcodeGeocodeResponse });
    });

    await page.route(LOCATIONS_ENDPOINT, (route) => {
      route.fulfill({ json: LocationsResponse });
    });

    const placesCount = page.getByText(t('places.count', { count: 1 })).first();
    const placeName = page.getByText(LocationsResponse.items[0].name).first();
    const mapButton = page
      .getByRole('link', { name: t('actions.showMap') })
      .first();
    const map = page.locator('locator-places-map').first();
    const pin = page
      .getByRole('button', { name: LocationsResponse.items[0].name })
      .first();

    await widget.evaluate((node) =>
      node.setAttribute('path', '/EX32%207RB/places'),
    );

    await page.waitForRequest(LOCATIONS_ENDPOINT);
    await expect(placesCount).toBeVisible();
    await expect(placeName).toBeVisible();
    await expect(mapButton).toBeVisible();
    mapButton.click();
    await page.waitForTimeout(500); // half a second chance for the map to load
    await expect(map).toBeVisible();
    await expect(pin).toBeVisible();
    await expect(placeName).not.toBeVisible();
    await pin.click();
    await expect(placeName).toBeVisible();
  });
});
