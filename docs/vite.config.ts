import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/veil/', // This matches lafittemehdy.github.io/veil/
  server: {
    port: 3001
  },
  optimizeDeps: {
    exclude: ['react-veil']
  }
})