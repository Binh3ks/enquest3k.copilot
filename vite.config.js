import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve, join } from 'path'
import { cpSync } from 'fs'

// Plugin to copy public/data/ → dist/data/ (lessonPlans.json etc.)
// Other large assets (images/audio) stay on R2 CDN, so publicDir stays false.
function copyDataDir() {
  return {
    name: 'copy-data-dir',
    closeBundle() {
      cpSync(resolve('public/data'), resolve('dist/data'), { recursive: true });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), copyDataDir()],
  publicDir: false, // Disable auto-copy public/ → dist/ (media served from R2 CDN)
})
