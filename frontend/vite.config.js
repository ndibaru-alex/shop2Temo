import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import env from 'vite-plugin-env-compatible'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define :{
    'process.env.VITE_KEY' : JSON.stringify(process.env.VITE_KEY)
  }

})
