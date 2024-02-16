import * as Sentry from '@sentry/browser';

import config from '@/config';

const DSN = import.meta.env.VITE_SENTRY_DSN;

Sentry.init({
  enabled: Boolean(DSN),
  dsn: DSN,
  release: `recycling-locator-widget@${config.packageVersion}`,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
