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
			},
			animation: {
				'spin-slow': 'spin 2s linear infinite',
				'small-ping': 'small-ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
			},
			keyframes: {
				'small-ping': {
					'75%, 100%': { transform: 'scale(1.3)', opacity: 0}
				}
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
