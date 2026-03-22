import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: false, // Disable auto-copy public/ → dist/ (media served from R2 CDN)
})
