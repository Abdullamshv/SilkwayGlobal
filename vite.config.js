import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig({
  base: '/SilkwayGlobal/',
  plugins: [
    tailwindcss(),
    ViteImageOptimizer(),
  ],
})