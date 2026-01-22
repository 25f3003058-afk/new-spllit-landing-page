import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
    jsxRuntime: 'automatic',
    jsxImportSource: 'react',
    babel: {
      plugins: [],
      babelrc: false,
      configFile: false,
    },
  })],
  build: {
    sourcemap: false,
  },
})
