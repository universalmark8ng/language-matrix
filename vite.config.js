import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Standalone single-page app. base: './' keeps asset paths relative so the
// built dist/ folder can be dropped onto any static host (Netlify, GH Pages, etc.)
export default defineConfig({
  plugins: [react()],
  base: './',
})
