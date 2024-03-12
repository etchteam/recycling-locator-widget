import { defineConfig, UserConfig } from 'vite';

export default defineConfig(() => {
  const config: UserConfig = {
    base: '/recycling-locator',
    server: {
      port: 3040,
    },
  };

  return config;
});
