const PUBLIC_PATH = import.meta.env.VITE_PUBLIC_PATH ?? '/';
const LOCATOR_API =
  import.meta.env.VITE_RECYCLING_LOCATOR_API ??
  'https://rl.recyclenow.com/widget/';

const config = {
  packageVersion: import.meta.env.VITE_PACKAGE_VERSION,
  publicPath: PUBLIC_PATH,
  imagePath: `${PUBLIC_PATH}images/`,
  mapsPlacesKey: import.meta.env.VITE_HERE_MAPS_PLACES_KEY,
  locatorApiPath: `${LOCATOR_API}${encodeURIComponent(window.location.hostname)}/`,
};

export default config;
