import { HttpStatusCode } from 'axios';
import type { PageServerLoad, Actions } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { registerSchema } from '$lib/validators/schemas/register.schema';
import { ActionFailure, fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import { USERNAME_AUTH_PROVIDER } from '$lib/data/constants';
import type { User } from 'lucia';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaErrors } from '$types/enums/prismaErrors';
import { errorMessages } from '$lib/validators/errorMesages';
import { Pages } from '$types/enums/pages';
import { userStore } from '$/lib/stores/user';
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
			return fail(HttpStatusCode.BadRequest, { form });
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

			userStore.user.login(user);

		} catch (e) {
			console.error(e);
			form.data.password = '';
			form.data.confirmPassword = '';

			if (e instanceof PrismaClientKnownRequestError && e.message.includes(PrismaErrors.UNIQUE_KEY_VIOLATION)) {
				const target = e.meta?.target as string[];

				if (target.includes('email')) {
					form.errors.email = [errorMessages.email.taken];
				}

				if (target.includes('username')) {
					form.errors.username = [errorMessages.username.taken];
				}

				return fail(HttpStatusCode.BadRequest, { form });
			}

			return fail(HttpStatusCode.InternalServerError, { form, errorMessage: errorMessages.unknown });
		}

		throw redirect(HttpStatusCode.Found, Pages.HOME);
	}
} satisfies Actions;
