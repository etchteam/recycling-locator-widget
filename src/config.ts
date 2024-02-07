const PUBLIC_PATH = import.meta.env.VITE_PUBLIC_PATH ?? '/';

const config = {
  publicPath: PUBLIC_PATH,
  imagePath: `${PUBLIC_PATH}images/`,
  mapsPlacesKey: import.meta.env.VITE_HERE_MAPS_PLACES_KEY,
};

export default config;
