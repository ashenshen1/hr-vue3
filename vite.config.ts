import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import { resolve } from 'path'
import { fileURLToPath, URL } from 'url'


// https://vite.dev/config/
export default defineConfig({
  server: {
    // 设置代理
    proxy: {
      '/api': {
        target: 'https://heimahr.itheima.net',
        changeOrigin: true,  // 修改host头
        // rewrite: path => path.replace(/^\/api/, ''), //  去掉 /api 前缀
      }
    }
  },
  plugins: [vue()],
  resolve: {
    alias: {
      // '@': resolve(__dirname, 'src'),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  }
})
