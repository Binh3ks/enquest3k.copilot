import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve, join } from 'path'
import { cpSync, copyFileSync, existsSync } from 'fs'

// Plugin to copy public/data/ → dist/data/ (lessonPlans.json etc.)
// Also copies public/sw.js → dist/sw.js (service worker must be at root)
// Other large assets (images/audio) stay on R2 CDN, so publicDir stays false.
function copyDataDir() {
  return {
    name: 'copy-data-dir',
    closeBundle() {
      cpSync(resolve('public/data'), resolve('dist/data'), { recursive: true });
      // Copy service worker to dist root
      if (existsSync(resolve('public/sw.js'))) {
        copyFileSync(resolve('public/sw.js'), resolve('dist/sw.js'));
      }
      // Copy Cloudflare Pages _redirects (SPA fallback + R2 proxy rules)
      if (existsSync(resolve('public/_redirects'))) {
        copyFileSync(resolve('public/_redirects'), resolve('dist/_redirects'));
      }
      // Copy Cloudflare Pages _headers (cache control rules)
      if (existsSync(resolve('public/_headers'))) {
        copyFileSync(resolve('public/_headers'), resolve('dist/_headers'));
      }
      // Copy avatar gallery SVGs
      if (existsSync(resolve('public/avatars'))) {
        cpSync(resolve('public/avatars'), resolve('dist/avatars'), { recursive: true });
      }
      // Copy images directory (public/images → dist/images)
      if (existsSync(resolve('public/images'))) {
        cpSync(resolve('public/images'), resolve('dist/images'), { recursive: true });
      }
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), copyDataDir()],
  publicDir: false, // Disable auto-copy public/ → dist/ (media served from R2 CDN)
  build: {
    sourcemap: true,  // Generate source maps for debugging minified errors
    rollupOptions: {
      output: {
        // Remove hash from the main entry file so index.html always points to
        // the same filename — eliminates MIME errors caused by stale index.html
        // referencing an old hashed chunk that no longer exists after a new deploy.
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: (chunkInfo) => {
          const facade = chunkInfo.facadeModuleId || '';
          if (facade.includes('weeks')) {
            const match = facade.match(/\/week_(\d+)\/index\.js$/i);
            if (match) {
              const isEasy = facade.includes('weeks_easy');
              return `assets/week_${match[1].padStart(2, '0')}${isEasy ? '_easy' : ''}_index-[hash].js`;
            }
            const matchReal = facade.match(/\/week_(\d+)_real\.js$/i);
            if (matchReal) {
              return `assets/week_${matchReal[1].padStart(2, '0')}_real-[hash].js`;
            }
          }
          return 'assets/[name]-[hash].js';
        }
      }
    }
  }
})
