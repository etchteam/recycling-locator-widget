import { expect } from '@playwright/test';
import { t } from 'i18next';
import { test } from 'vitest';

import {
  LOCAL_AUTHORITY_ENDPOINT,
  LocalAuthorityResponse,
} from '../mocks/localAuthority';
import { LOCATIONS_ENDPOINT, LocationsResponse } from '../mocks/locations';
import describeEndToEndTest from '../utils/describeEndToEndTest';
import { DryScheme } from '@/types/locatorApi';

describeEndToEndTest('Material page', () => {
  test('Single scheme + location options', async ({ page }) => {
    await page.route(LOCAL_AUTHORITY_ENDPOINT, (route) => {
      route.fulfill({ json: LocalAuthorityResponse });
    });

    await page.route(LOCATIONS_ENDPOINT, (route) => {
      route.fulfill({ json: LocationsResponse });
    });

    const widget = page.locator('recycling-locator');
    const recyclableText = page.getByText(t('material.hero.yes')).first();
    const homeText = page
      .getByText(t('material.recycleAtHome.oneScheme.collection', { count: 1 }))
      .first();
    const locationsText = page
      .getByText(t('material.nearbyPlaces.places.title'))
      .first();

    await expect(recyclableText).not.toBeVisible();
    await widget.evaluate((node) =>
      node.setAttribute(
        'path',
        '/EX327RB/material?id=43&name=Plastic%20milk%20bottles',
      ),
    );
    await page.waitForRequest(LOCAL_AUTHORITY_ENDPOINT);
    await page.waitForRequest(LOCATIONS_ENDPOINT);
    await expect(recyclableText).toBeVisible();
    await expect(homeText).toBeVisible();
    await expect(locationsText).toBeVisible();
  });

  test('Some home recycling options', async ({ page }) => {
    await page.route(LOCAL_AUTHORITY_ENDPOINT, (route) => {
      const dryStreams = LocalAuthorityResponse.dryStreams.concat([
        {
          name: 'Fake scheme 1',
          containers: [],
        },
        {
          name: 'Fake scheme 2',
          containers: [],
        },
      ]);
      route.fulfill({
        json: {
          ...LocalAuthorityResponse,
          dryStreams,
        },
      });
    });

    await page.route(LOCATIONS_ENDPOINT, (route) => {
      route.fulfill({ json: LocationsResponse });
    });

    const widget = page.locator('recycling-locator');
    const recyclableText = page.getByText(t('material.hero.yes')).first();
    const schemeOneText = page
      .getByText(LocalAuthorityResponse.dryStreams[0].name)
      .first();
    const somePropertiesText = page.getByText('some properties').first();
    const locationsText = page
      .getByText(t('material.nearbyPlaces.places.title'))
      .first();

    await expect(recyclableText).not.toBeVisible();
    await widget.evaluate((node) =>
      node.setAttribute(
        'path',
        '/EX327RB/material?id=43&name=Plastic%20milk%20bottles',
      ),
    );
    await page.waitForRequest(LOCAL_AUTHORITY_ENDPOINT);
    await page.waitForRequest(LOCATIONS_ENDPOINT);
    await expect(recyclableText).toBeVisible();
    await expect(somePropertiesText).toBeVisible();
    await expect(schemeOneText).toBeVisible();
    await expect(locationsText).toBeVisible();
  });

  test('All home recycling options', async ({ page }) => {
    await page.route(LOCAL_AUTHORITY_ENDPOINT, (route) => {
      const dryStreams = LocalAuthorityResponse.dryStreams.concat([
        {
          name: 'Fake scheme 1',
          containers: [
            {
              name: 'Box',
              displayName: 'Box (35 to 60L)',
              materials: [
                {
                  id: 43,
                  name: 'Plastic milk bottles',
                },
              ],
            },
          ],
        },
        {
          name: 'Fake scheme 2',
          containers: [
            {
              name: 'Box',
              displayName: 'Box (35 to 60L)',
              materials: [
                {
                  id: 43,
                  name: 'Plastic milk bottles',
                },
              ],
            },
          ],
        },
      ] as DryScheme[]);
      route.fulfill({
        json: {
          ...LocalAuthorityResponse,
          dryStreams,
        },
      });
    });

    await page.route(LOCATIONS_ENDPOINT, (route) => {
      route.fulfill({ json: LocationsResponse });
    });

    const widget = page.locator('recycling-locator');
    const recyclableText = page.getByText(t('material.hero.yes')).first();
    const schemeOneText = page
      .getByText(LocalAuthorityResponse.dryStreams[0].name)
      .first();
    const somePropertiesText = page.getByText('all properties').first();
    const locationsText = page
      .getByText(t('material.nearbyPlaces.places.title'))
      .first();

    await expect(recyclableText).not.toBeVisible();
    await widget.evaluate((node) =>
      node.setAttribute(
        'path',
        '/EX327RB/material?id=43&name=Plastic%20milk%20bottles',
      ),
    );
    await page.waitForRequest(LOCAL_AUTHORITY_ENDPOINT);
    await page.waitForRequest(LOCATIONS_ENDPOINT);
    await expect(recyclableText).toBeVisible();
    await expect(somePropertiesText).toBeVisible();
    await expect(schemeOneText).toBeVisible();
    await expect(locationsText).toBeVisible();
  });

  test('No home recycling', async ({ page }) => {
    await page.route(LOCAL_AUTHORITY_ENDPOINT, (route) => {
      route.fulfill({ json: LocalAuthorityResponse });
    });

    await page.route(LOCATIONS_ENDPOINT, (route) => {
      route.fulfill({ json: LocationsResponse });
    });

    const widget = page.locator('recycling-locator');
    const recyclableText = page.getByText(t('material.hero.yes')).first();
    const homeText = page
      .getByText(t('material.recycleAtHome.noSchemes.content'))
      .first();
    const locationsText = page
      .getByText(t('material.nearbyPlaces.places.title'))
      .first();

    await expect(recyclableText).not.toBeVisible();
    await widget.evaluate((node) =>
      node.setAttribute('path', '/EX327RB/material?id=79&name=Car%20batteries'),
    );
    await page.waitForRequest(LOCAL_AUTHORITY_ENDPOINT);
    await page.waitForRequest(LOCATIONS_ENDPOINT);
    await expect(recyclableText).toBeVisible();
    await expect(homeText).toBeVisible();
    await expect(locationsText).toBeVisible();
  });

  test('Not recyclable', async ({ page }) => {
    await page.route(LOCAL_AUTHORITY_ENDPOINT, (route) => {
      route.fulfill({ json: LocalAuthorityResponse });
    });

    await page.route(LOCATIONS_ENDPOINT, (route) => {
      route.fulfill({ json: { items: [] } });
    });

    const widget = page.locator('recycling-locator');
    const recyclableText = page.getByText(t('material.hero.no')).first();
    const homeText = page
      .getByText(t('material.recycleAtHome.noSchemes.content'))
      .first();
    const locationsText = page
      .getByText(t('material.nearbyPlaces.noPlaces.title'))
      .first();

    await expect(recyclableText).not.toBeVisible();
    await widget.evaluate((node) =>
      node.setAttribute(
        'path',
        '/EX327RB/material?id=122&name=Toilet%20roll%20wrapping',
      ),
    );
    await page.waitForRequest(LOCAL_AUTHORITY_ENDPOINT);
    await page.waitForRequest(LOCATIONS_ENDPOINT);
    await expect(recyclableText).toBeVisible();
    await expect(homeText).toBeVisible();
    await expect(locationsText).toBeVisible();
  });
});
