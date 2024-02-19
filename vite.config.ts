import path from 'node:path';

import { preact } from '@preact/preset-vite';
import { sentryVitePlugin } from '@sentry/vite-plugin';
import { defineConfig, loadEnv, UserConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// Vite is used for JavaScript bundling and development server
// CSS is built separately by PostCSS
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const config: UserConfig = {
    server: {
      port: 3000,
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },

    plugins: [svgr(), preact()],

    test: {
      browser: {
        enabled: true,
        name: 'chromium',
        provider: 'playwright',
      },
    },

    build: {
      sourcemap: true,
    },
  };

  if (mode === 'production') {
    config.plugins.push(
      sentryVitePlugin({
        org: env.SENTRY_ORG,
        project: env.SENTRY_PROJECT,
      }),
    );
  }

  if (mode === 'development') {
    config.plugins.push({
      name: 'reload-on-public-file-change',
      handleHotUpdate({ file, server }) {
        if (file.includes('public')) {
          server.ws.send({
            type: 'full-reload',
            path: '*',
          });
        }
      },
    });
  }

  return config;
});
