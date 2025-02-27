import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  base:'./',
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build:{
    assetsInlineLimit:0,//设置静态资源本文件大小，超过此值，会转为base64编码，减少请求数量
    rollupOptions:{
      output:{//配置输出文件
        dir:'docs',
        entryFileNames:"js/[name]-[hash].js",//入口文件配置
        chunkFileNames:"js/[name]-[hash].js",//分包文件配置
        assetFileNames(assetInfo){// css 和图片资源文件配置
          const name = assetInfo.name;
          if(name.endsWith('.css')){
            return "css/[name]-[hash].css"
          }
          const imgExts = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'];
          if(imgExts.some(ext => name.endsWith(ext))){
            return "img/[name]-[hash].[ext]"
          }
          return "assets/[name]-[hash].[ext]"
        },
        manualChunks(id){//分包配置
          if(id.includes('node_modules') && id.endsWith('.js') || id.endsWith('.ts')){
            return 'vendor'
          }
        }
      }
    }
  }
})
