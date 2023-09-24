import type { PageServerLoad, Actions } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { registerSchema } from '$lib/validators/schemas/register.schema';
import { ActionFailure, fail, redirect } from '@sveltejs/kit';
import { ClientStatusCode, RedirectStatusCode, ServerStatusCode } from '$types/enums/HTTP';
import { auth } from '$lib/server/lucia';
import { USERNAME_AUTH_PROVIDER } from '$lib/data/constants';
import type { User } from 'lucia';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaErrors } from '$types/enums/prismaErrors';
import { errorMessages } from '$lib/validators/schemas/errorMesages';
import { Pages } from '$types/enums/pages';
import { userHandlingStore } from '$/lib/stores/user';
import { userHandling } from '$lib/data/userHandling';

export const load = (async () => {
	const form = await superValidate(registerSchema);
	return { form, errorMessage: '' };
}) satisfies PageServerLoad;

type FailResponse = {
	form: object;
	errorMessage?: string;
};

export const actions = {
	default: async ({ request, locals, cookies }): Promise<ActionFailure<FailResponse>> => {
		const form = await superValidate(request, registerSchema);

		if (!form.valid) {
			form.data.password = '';
			form.data.confirmPassword = '';
			return fail(ClientStatusCode.BAD_REQUEST, { form });
		}

		try {
			const user: User = await auth.createUser({
				key: {
					providerId: USERNAME_AUTH_PROVIDER,
					providerUserId: form.data.username.toLowerCase(),
					password: form.data.password
				},
				attributes: {
					username: form.data.username,
					email: form.data.email
				}
			});
			await userHandling.loginUser(user, locals, cookies);
			userHandlingStore.loginUser(user);

		} catch (e) {
			console.error(e);
			form.data.password = '';
			form.data.confirmPassword = '';

			if (e instanceof PrismaClientKnownRequestError && e.message.includes(PrismaErrors.UNIQUE_KEY_VIOLATION)) {
				/**
				 * The type of target is unknown, but according to the documentation it has that field
				 * https://www.prisma.io/docs/reference/api-reference/error-reference#prismaclientknownrequesterror
				 */
				// @ts-ignore
				if (e.meta?.target.includes('email')) {
					form.errors.email = [errorMessages.email.taken];
				}

				/**
				 * The type of target is unknown, but according to the documentation it has that field
				 * https://www.prisma.io/docs/reference/api-reference/error-reference#prismaclientknownrequesterror
				 */
				// @ts-ignore
				if (e.meta?.target.includes('username')) {
					form.errors.username = [errorMessages.username.taken];
				}

				return fail(ClientStatusCode.BAD_REQUEST, { form });
			}

			return fail(ServerStatusCode.INTERNAL_SERVER_ERROR, { form, errorMessage: errorMessages.unknown });
		}

		throw redirect(RedirectStatusCode.FOUND, Pages.HOME);
	}
} satisfies Actions;
