import { preact } from '@preact/preset-vite';
import { defineConfig } from 'vite';

// Vite is used for JavaScript bundling and development server
// CSS is built separately by PostCSS
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [preact()],
});
