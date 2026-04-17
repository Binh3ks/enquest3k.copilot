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
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), copyDataDir()],
  publicDir: false, // Disable auto-copy public/ → dist/ (media served from R2 CDN)
})
