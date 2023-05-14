import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), vueJsx()],
	server: {
		watch: {
			usePolling: true,
		},
	},
	resolve: {
		preserveSymlinks: true,
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
		// alias: [
		//   {
		//     find: "@vue/runtime-core",
		//     replacement: "@vue/runtime-core/dist/runtime-core.esm-bundler.js",
		//   },
		// ],
	},
});
