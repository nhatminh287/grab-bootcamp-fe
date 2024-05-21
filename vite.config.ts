import { defineConfig } from 'vite'
import * as path from 'path';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  server: {
    // tự động khởi chạy backend server khi chạy frontend
    // port: 3001,
    // proxy: {
    //   '/api': {
    //     target: process.env.VITE_API_URL || 'http://localhost:3001',
    //     changeOrigin: true,
    //     secure: false,
    //   },
    // },
  },
})
