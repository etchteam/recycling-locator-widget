import i18n from 'i18next';
import { chromium } from 'playwright';
import type { Browser, BrowserContext } from 'playwright';
import { preview } from 'vite';
import type { PreviewServer } from 'vite';
import { afterAll, afterEach, beforeAll, beforeEach, describe } from 'vitest';

import en from '../../public/translations/en.json';
const PORT = 3001;

export function describeEndToEndTest(
  description: string,
  callback: () => void,
) {
  describe(description, () => {
    let server: PreviewServer;
    let browser: Browser;
    let browserContext: BrowserContext;

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
      browserContext = await browser.newContext();
    });

    beforeEach(async (context) => {
      browserContext = await browser.newContext();
      const page = await browserContext.newPage();
      await page.route('**/translations/en.json', (route) => {
        route.fulfill({ status: 200, json: en });
      });
      page.goto(`http://localhost:${PORT}`);

      context.page = page;
    });

    afterEach(async () => {
      await browserContext.close();
    });

    afterAll(async () => {
      await browser.close();
      await new Promise<void>((resolve, reject) => {
        server.httpServer.close((error) => (error ? reject(error) : resolve()));
      });
    });

    callback();
  });
}
