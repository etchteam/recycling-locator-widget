import { chromium } from 'playwright';
import type { Browser, BrowserContext } from 'playwright';
import { preview } from 'vite';
import type { PreviewServer } from 'vite';
import { afterAll, afterEach, beforeAll, beforeEach, describe } from 'vitest';

import en from '../../public/translations/en.json';

import provideI18n from './providei18n';
const PORT = 3001;

export default function describeEndToEndTest(
  description: string,
  callback: () => void,
) {
  describe(description, () => {
    let server: PreviewServer;
    let browser: Browser;
    let browserContext: BrowserContext;

    beforeAll(async () => {
      await provideI18n();
      server = await preview({ preview: { port: PORT } });
      browser = await chromium.launch({ headless: true });
      browserContext = await browser.newContext();
    });

    beforeEach(async (context) => {
      browserContext = await browser.newContext();
      const page = await browserContext.newPage();
      await page.route('**/translations/en.json', (route) => {
        // Mock the response for the translations to speed it up slightly
        route.fulfill({ json: en });
      });
      page.goto(`http://localhost:${PORT}`);
      const widget = page.locator('recycling-locator');
      await widget.evaluate(async (node) => {
        return new Promise((resolve) => {
          node.addEventListener('ready', resolve);
          // If ready hasn't emitted after 2 seconds, resolve anyway
          setTimeout(resolve, 2000);
        });
      });

      context.page = page;
      context.widget = widget;
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
