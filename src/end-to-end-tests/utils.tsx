import i18n from 'i18next';
import { chromium } from 'playwright';
import type { Browser, Page } from 'playwright';
import { preview } from 'vite';
import type { PreviewServer } from 'vite';
import { afterAll, beforeAll, beforeEach, describe } from 'vitest';

import en from '../../public/translations/en.json';
const PORT = 3001;

export function describeEndToEndTest(
  description: string,
  callback: () => void,
) {
  describe(description, () => {
    let server: PreviewServer;
    let browser: Browser;
    let page: Page;

    beforeAll(async () => {
      await new Promise<void>((resolve) => {
        i18n.init(
          {
            lng: 'en',
            debug: false,
            ns: ['translations'],
            defaultNS: 'translations',
            resources: {
              en: {
                translations: en,
              },
            },
          },
          () => resolve(),
        );
      });

      server = await preview({ preview: { port: PORT } });
      browser = await chromium.launch({ headless: true });
      page = await browser.newPage();
    });

    afterAll(async () => {
      await browser.close();
      await new Promise<void>((resolve, reject) => {
        server.httpServer.close((error) => (error ? reject(error) : resolve()));
      });
    });

    beforeEach(async (context) => {
      await page.goto(`http://localhost:${PORT}`);
      context.browser = browser;
      context.server = server;
      context.page = page;
    });

    callback();
  });
}
