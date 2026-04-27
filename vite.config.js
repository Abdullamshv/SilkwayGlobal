import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/SilkwayGlobal/',
  plugins: [
    react(),
    tailwindcss(),
    ViteImageOptimizer(),
  ],
})