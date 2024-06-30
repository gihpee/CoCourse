import { defineConfig } from 'vite'
import nodePolyfills from 'vite-plugin-node-stdlib-browser'

export default defineConfig({
  // other options
  plugins: [nodePolyfills()]
})