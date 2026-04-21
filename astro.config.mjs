// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        // Force @libsql/client to use the edge-compatible web build
        '@libsql/client': '@libsql/client/web',
        // Stub node-fetch with Cloudflare Workers' native fetch
        'node-fetch': path.resolve(__dirname, 'src/lib/node-fetch-stub.js'),
      }
    }
  },
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  })
});
