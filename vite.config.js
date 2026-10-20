import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// BASE PATH
// Default './' (relative) works under any GitHub Pages repository name, because the
// app uses hash routing. To force an absolute base, build with e.g.:
//   VITE_BASE=/your-repo-name/ npm run build
export default defineConfig({
  base: process.env.VITE_BASE || './',
  plugins: [react(), tailwindcss()],
})
