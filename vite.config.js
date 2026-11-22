import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import localBuildEditor from './src/editor/local-server.js'

export default defineConfig({
  plugins: [react(), localBuildEditor()],
})
