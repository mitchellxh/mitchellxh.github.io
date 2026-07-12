import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// mitchellxh.github.io is a USER GitHub Pages site -> served at the domain root.
// `base` defaults to '/', kept explicit for clarity. (A project page would use '/<repo>/'.)
export default defineConfig({
  plugins: [react()],
  base: '/',
})
