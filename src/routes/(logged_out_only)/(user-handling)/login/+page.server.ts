import type { FailResponse } from '$types/clientTypes';
import type { Actions } from '@sveltejs/kit';
import { HttpStatusCode } from 'axios';
import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { loginSchema } from '$lib/validators/schemas/login.schema';
import { ActionFailure, fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import { USERNAME_AUTH_PROVIDER } from '$lib/data/constants';
import { userStore } from '$lib/stores/user';
import { Pages } from '$types/enums/pages';
import { LuciaError } from 'lucia';
import { errorMessages, luciaErrors } from '$lib/validators/errorMessages';
import { userHandling } from '$lib/data/userHandling';

export const load = (async () => {
	const form = await superValidate(loginSchema);
	return { form };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals, cookies }): Promise<ActionFailure<FailResponse>> => {
		const form = await superValidate(request, loginSchema);

		if (!form.valid) {
			form.data.password = '';
			return fail(HttpStatusCode.BadRequest, { form });
		}

		try {
			const user = await auth.useKey(
				USERNAME_AUTH_PROVIDER,
				form.data.username.toLowerCase(),
				form.data.password
			);
			await userHandling.loginUser(user, locals, cookies);

			userStore.user.login(user);
		} catch (e) {
			console.log(e);
			form.data.password = '';

			if (
				e instanceof LuciaError &&
				(e.errorMessage === luciaErrors.invalid_key || e.errorMessage === luciaErrors.invalid_password)
			) {
				form.errors.username = [errorMessages.login.invalid_username_or_password];

				return fail(HttpStatusCode.BadRequest, { form });
			}

			return fail(HttpStatusCode.InternalServerError, { form, errorMessage: errorMessages.unknown });
		}

		throw redirect(HttpStatusCode.Found, Pages.HOME);
	}
} satisfies Actions;
