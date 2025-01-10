import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target:  "http://localhost:4000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/v1, ''),
      }
    }
  }
})
