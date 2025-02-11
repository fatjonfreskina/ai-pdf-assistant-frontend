import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    vue(),
  ],
  server: {
    port: 5000,
    strictPort: true,
    host: true,
  },
  preview: {
    port: 5000,
    strictPort: true,
    cors: true,
  }
})
