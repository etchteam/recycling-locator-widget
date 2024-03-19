import percySnapshot from '@percy/playwright';
import { Page } from 'playwright';

export default async function snapshot(page: Page, name: string) {
  await percySnapshot(page, name, {
    scope: 'recycling-locator',
    percyCSS:
      'locator-layout, .recycling-locator-variant-widget, recycling-locator { height: auto !important; }',
  });
}
