const PUBLIC_PATH = import.meta.env.VITE_PUBLIC_PATH ?? '/';

const config = {
  publicPath: PUBLIC_PATH,
  imagePath: `${PUBLIC_PATH}images/`,
};

export default config;
