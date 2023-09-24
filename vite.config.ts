import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { resolve } from 'path';

export default defineConfig({
	plugins: [sveltekit(), purgeCss()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	server: {
		host: 'gpt.local',
		port: 80
	},
	resolve: {
		alias: {
			$: resolve('./src'),
			$types: resolve('src/lib/types'),
			$assets: resolve('src/lib/assets')
		}
	}
});
