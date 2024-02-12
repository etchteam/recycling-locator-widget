const PUBLIC_PATH = import.meta.env.VITE_PUBLIC_PATH ?? '/';
const MAPS_PLACES_KEY = import.meta.env.VITE_HERE_MAPS_PLACES_KEY;
const WIDGET_API =
  import.meta.env.VITE_WIDGET_API ?? 'https://rl.recyclenow.com/widget/';
const host = encodeURIComponent(window.location.hostname);

const config = {
  publicPath: PUBLIC_PATH,
  imagePath: `${PUBLIC_PATH}images/`,
  mapsPlacesKey: MAPS_PLACES_KEY,
  widgetApiPath: `${WIDGET_API}${host}/`,
};

export default config;
