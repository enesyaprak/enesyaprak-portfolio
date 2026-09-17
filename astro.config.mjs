// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // GEÇİCİ (domain ~20 Ekim'de geri gelene kadar): GitHub Pages proje adresi.
  // Domain dönünce → site: 'https://enesyaprak.com', base: '/' ve public/CNAME ekle.
  site: 'https://enesyaprak.github.io',
  base: '/enesyaprak-portfolio',
  vite: {
    plugins: [tailwindcss()]
  }
});
