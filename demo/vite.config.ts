import { defineConfig, loadEnv, UserConfig } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const config: UserConfig = {
    define: {
      'process.env': env,
    },
    base: '/recycling-locator',
    server: {
      port: 3040,
    },
  };

  return config;
});
