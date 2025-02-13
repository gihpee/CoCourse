import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import react from '@vitejs/plugin-react'
import rollupNodePolyFill from 'rollup-plugin-node-polyfills'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [react()],
	optimizeDeps: {
		esbuildOptions: {
			define: {
				global: 'globalThis',
			},
			plugins: [
				NodeGlobalsPolyfillPlugin({
					buffer: true,
				}),
				NodeModulesPolyfillPlugin(),
			],
		},
	},
	build: {
		rollupOptions: {
			plugins: [rollupNodePolyFill()],
		},
	},
})
