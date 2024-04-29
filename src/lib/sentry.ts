import * as Sentry from '@sentry/browser';

import config from '@/config';

const DSN = import.meta.env.VITE_SENTRY_DSN;

Sentry.init({
  enabled: Boolean(DSN),
  dsn: DSN,
  release: `recycling-locator@${config.packageVersion}`,
  // Prevent auto capturing of global errors from host sites
  defaultIntegrations: false,
  // Enable integrations that can be used without capturing host site errors
  // https://docs.sentry.io/platforms/javascript/configuration/integrations/#modifying-default-integrations
  integrations: [
    Sentry.httpContextIntegration(),
    Sentry.linkedErrorsIntegration(),
    Sentry.dedupeIntegration(),
    Sentry.breadcrumbsIntegration(),
    Sentry.functionToStringIntegration(),
  ],
});
