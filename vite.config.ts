import { preact } from '@preact/preset-vite';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// Vite is used for JavaScript bundling and development server
// CSS is built separately by PostCSS
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    svgr(),
    preact(),
    {
      name: 'reload-on-public-file-change',
      handleHotUpdate({ file, server }) {
        if (file.includes('public')) {
          server.ws.send({
            type: 'full-reload',
            path: '*',
          });
        }
      },
    },
  ],
});
