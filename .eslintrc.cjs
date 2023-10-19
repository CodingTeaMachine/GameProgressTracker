module.exports = {
	root: true,
	extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:svelte/recommended",
        "prettier",
        "plugin:storybook/recommended"
    ],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte'],
		project: './tsconfig.json',
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	globals: {
		NodeJS: true,
	},
	overrides: [
		{
			files: ['**/*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			},
			rules: {
				'import/no-named-as-default': 0,
				'import/no-named-as-default-member': 0,
			},
		}
	],
	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': ['.cjs', '.js', '.ts'],
		},
		'import/resolver': {
			typescript: {
				alwaysTryTypes: true,
			},
		},
	},
	ignorePatterns: ['tailwind.config.js', 'svelte.config.js', 'prisma/seed.ts', 'prisma/seedHelper.ts'],
	rules: {
		"semi": [ 2, "always" ],
		"import/extensions": [ "off" ],
		"@typescript-eslint/ban-ts-comment": [ "warn" ]
	},
};
