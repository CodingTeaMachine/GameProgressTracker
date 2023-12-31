// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

/// <reference types="@sveltejs/kit" />
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			auth: import('lucia').AuthRequest;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

/// <reference types="lucia" />
declare namespace Lucia {
	type Auth = import('$lib/server/lucia').Auth;
	type DatabaseUserAttributes = {
		username: string;
		email: string;
	};
	type DatabaseSessionAttributes = {};
}

export {};
