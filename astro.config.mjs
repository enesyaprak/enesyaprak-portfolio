// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://enesyaprak.com',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: { theme: 'github-dark', wrap: false },
  },
  vite: {
    // Keep bundled scripts as external files so the CSP can stay `script-src 'self'`.
    build: { assetsInlineLimit: 0 },
  },
});
