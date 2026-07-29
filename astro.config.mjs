// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  build: {
    format: 'directory'
  },
  redirects: {
    '/articles': '/writing'
  },
  site: 'https://farhan.dev',
  integrations: [sitemap()]
});
