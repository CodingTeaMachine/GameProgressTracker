import { join } from 'path';
import { skeleton } from '@skeletonlabs/tw-plugin';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
const config = {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {
			aspectRatio: {
				'cover': '9 / 16'
			}
		}
	},

	plugins: [
		forms,
		skeleton({
			themes: { preset: [{ name: 'wintry', enhancements: true }] }
		})
	]
};

export default config;
