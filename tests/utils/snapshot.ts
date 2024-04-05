import percySnapshot from '@percy/playwright';
import { Page } from 'playwright';

export default async function snapshot(page: Page, name: string) {
  if (!process.env.PERCY_TOKEN) {
    return;
  }

  try {
    await percySnapshot(page, name, {
      percyCSS: 'recycling-locator { height: auto !important; }',
    });
  } catch (error) {
    console.error(error);
  }
}
