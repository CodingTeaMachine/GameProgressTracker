import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { prisma } from '@lucia-auth/adapter-prisma';
import { dev } from '$app/environment';
import prismaClient from './prisma';

export const auth = lucia({
	env: dev ? 'DEV' : 'PROD',
	adapter: prisma(prismaClient),
	middleware: sveltekit(),
	getUserAttributes: data => {
		return {
			username: data.username,
			email: data.email
		};
	}
});

export type Auth = typeof auth;
