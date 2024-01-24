import preact from '@preact/preset-vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    preact({
      babel: {
        plugins: [
          ['@babel/plugin-proposal-decorators', { version: '2023-05' }],
        ],
      },
    }),
  ],
});
