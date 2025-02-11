import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  base:'./',
  outputDir:'docs',
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build:{
    assetsInlineLimit:0,
    rollupOptions:{
      output:{
        entryFileNames:"js/[name]-[hash].js",
        chunkFileNames:"js/[name]-[hash].js",
        assetFileNames(assetInfo){
          const name = assetInfo.name;
          if(name.endsWith('.css')){
            return "css/[name]-[hash].css"
          }
          const imgExts = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'];
          if(imgExts.some(ext => name.endsWith(ext))){
            return "img/[name]-[hash].[ext]"
          }
          return "assets/[name]-[hash].[ext]"
        }
      }
    }
  }
})
