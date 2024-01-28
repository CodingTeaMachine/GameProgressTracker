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
		}),
		require('daisyui')
	],

	daisyui: {
		themes: [
			{
				wintry: {
					primary: '#3B82F6',
					secondary: '#0EA5E9',
					accent: '#6366F1',
					neutral: '#6B7280',
				}
			}
		],
		prefix: 'dai-',
		logs: false,
	}
};

export default config;
