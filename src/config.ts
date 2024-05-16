const PUBLIC_PATH = import.meta.env.VITE_PUBLIC_PATH ?? '/';
const LOCATOR_API =
  import.meta.env.VITE_RECYCLING_LOCATOR_API ??
  'https://rl.recyclenow.com/widget/';
const hostname =
  typeof window !== 'undefined' ? window?.location?.hostname : 'localhost'; // Can be undefined in tests

const config = {
  hostname,
  packageVersion: import.meta.env.VITE_PACKAGE_VERSION ?? '1.0.0',
  publicPath: PUBLIC_PATH,
  mapsPlacesKey: import.meta.env.VITE_HERE_MAPS_PLACES_KEY,
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  locatorApiPath: `${LOCATOR_API}${encodeURIComponent(hostname)}/`,
  locatorAnalyticsPath: `${LOCATOR_API}analytics/record`,
  testMode: import.meta.env.VITE_TEST === 'true',
};

export default config;
