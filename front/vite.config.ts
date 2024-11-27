import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const rootPath = path.resolve(fileURLToPath(import.meta.url), '../../');
dotenv.config({ path: path.resolve(rootPath, '.env') });

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.GOOGLE_API_KEY': JSON.stringify(process.env.GOOGLE_API_KEY),
    'process.env.PUBLIC_API_URL': JSON.stringify(process.env.PUBLIC_API_URL)
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 80
  }
})
