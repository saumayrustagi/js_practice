import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // <-- Add this line
  build: {
    outDir: 'docs', // This is the default, but good to be explicit
  },
  // Other Vite configurations...
});
