import 'vitest';
import type { Browser, Page } from 'playwright';
import type { PreviewServer } from 'vite';

declare module 'vitest' {
  export interface TestContext {
    // This context is only available in end-to-end tests
    server: PreviewServer;
    browser: Browser;
    page: Page;
  }
}
