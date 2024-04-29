import * as Sentry from '@sentry/browser';

import config from '@/config';

const DSN = import.meta.env.VITE_SENTRY_DSN;

Sentry.init({
  enabled: Boolean(DSN),
  dsn: DSN,
  release: `recycling-locator@${config.packageVersion}`,
  defaultIntegrations: false,
});
