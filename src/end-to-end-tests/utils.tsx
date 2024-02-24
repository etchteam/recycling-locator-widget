import { chromium } from 'playwright';
import type { Browser, Page } from 'playwright';
import { preview } from 'vite';
import type { PreviewServer } from 'vite';
import { afterAll, beforeAll, beforeEach, describe } from 'vitest';
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
