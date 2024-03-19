import percySnapshot from '@percy/playwright';
import { Page } from 'playwright';

export default async function snapshot(page: Page, name: string) {
  await percySnapshot(page, name, {
    percyCSS: 'recycling-locator { height: auto !important; }',
  });
}
