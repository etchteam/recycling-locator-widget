import 'vitest';
import type { Locator, Page } from 'playwright';

declare module 'vitest' {
  export interface TestContext {
    // This context is only available in end-to-end tests
    page: Page;
    widget: Locator;
  }
}
