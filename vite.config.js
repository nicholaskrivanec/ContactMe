import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 8000,
    strictPort: true,
    hmr: {
      timeout: 10000,
      path: '@vite',
    },
    watch: {
      ignored: ["**/.npm/**", "**/node_modules/**"],
    },
  },
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'), // Ensure Vite uses the correct HTML entry point
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Optional alias for easier imports
    },
  },
});
