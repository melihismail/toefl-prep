import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The legacy exercises live under public/ untouched, so their existing URLs
// (/reading/complete-the-words/index.html and friends) keep resolving in both
// dev and build. Vite copies public/ to dist/ verbatim.
export default defineConfig({
  plugins: [react()],
  server: { port: 8123 },
  preview: { port: 8123 },
});
