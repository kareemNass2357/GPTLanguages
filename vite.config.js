import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;
const proxyTarget = process.env.PROXY_TARGET_VITE || 'http://localhost:8000';

export default defineConfig({
  plugins: [react()],
  server: {
    port: port,
    watch: {
      usePolling: true,
    },
    proxy: {
      '/api': {
        target: proxyTarget,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  }
});