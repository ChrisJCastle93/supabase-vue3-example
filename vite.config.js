import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
	plugins: [
		vue(),
		VitePWA({
			devOptions: {
				enabled: true,
			},
			includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
			manifest: {
				name: 'Ale Blazers',
				icons: [
					{
						src: 'img/icons/android-chrome-192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: 'img/icons/android-chrome-256x256.png',
						sizes: '256x256',
						type: 'image/png',
					},
				],
				// icons: [
				// 	{
				// 		src: 'img/icons/android-chrome-192x192.png',
				// 		sizes: '192x192',
				// 		type: 'image/png',
				// 	},
				// 	{
				// 		src: 'img/icons/android-chrome-512x512.png',
				// 		sizes: '512x512',
				// 		type: 'image/png',
				// 		purpose: 'any',
				// 	},
				// 	{
				// 		src: 'img/icons/android-chrome-maskable-192x192.png',
				// 		sizes: '192x192',
				// 		type: 'image/png',
				// 	},
				// 	{
				// 		src: 'img/icons/android-chrome-maskable-512x512.png',
				// 		sizes: '512x512',
				// 		type: 'image/png',
				// 	},
				// 	{
				// 		src: 'img/icons/apple-touch-icon-76x76.png',
				// 		sizes: '76x76',
				// 		type: 'image/png',
				// 	},
				// 	{
				// 		src: 'img/icons/apple-touch-icon-120x120.png',
				// 		sizes: '120x120',
				// 		type: 'image/png',
				// 	},
				// 	{
				// 		src: 'img/icons/apple-touch-icon-152x152.png',
				// 		sizes: '152x152',
				// 		type: 'image/png',
				// 	},
				// 	{
				// 		src: 'img/icons/apple-touch-icon-180x180.png',
				// 		sizes: '180x180',
				// 		type: 'image/png',
				// 	},
				// 	{
				// 		src: 'img/icons/apple-touch-icon.png',
				// 		sizes: '512x512',
				// 		type: 'image/png',
				// 		purpose: 'any',
				// 	},
				// 	{
				// 		src: 'img/icons/favicon-16x16.png',
				// 		sizes: '16x16',
				// 		type: 'image/png',
				// 	},
				// 	{
				// 		src: 'img/icons/favicon-32x32.png',
				// 		sizes: '32x32',
				// 		type: 'image/png',
				// 	},
				// 	{
				// 		src: 'img/icons/msapplication-icon-144x144.png',
				// 		sizes: '144x144',
				// 		type: 'image/png',
				// 	},
				// 	{
				// 		src: 'img/icons/mstile-150x150.png',
				// 		sizes: '150x150',
				// 		type: 'image/png',
				// 	},
				// 	{
				// 		src: 'img/icons/safari-pinned-tab.svg',
				// 		type: 'image/svg',
				// 	},
				// ],
				short_name: 'Ale Blazers',
				start_url: '/',
				id: '/',
				description: 'foo',
				display: 'fullscreen',
				background_color: '#D3D5E1',
				theme_color: '#D3D5E1',
				orientation: 'portrait-primary',
			},
			registerType: 'autoUpdate',
		}),
	],
	server: {
		watch: {
			usePolling: true,
		},
	},
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
});
