import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// import vueJsx from '@vitejs/plugin-vue-jsx';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		VitePWA({
			registerType: 'autoUpdate',
			devOptions: {
				enabled: true,
			},
		}),
	],
	server: {
		watch: {
			usePolling: true,
		},
	},
	resolve: {
		// preserveSymlinks: true,
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
