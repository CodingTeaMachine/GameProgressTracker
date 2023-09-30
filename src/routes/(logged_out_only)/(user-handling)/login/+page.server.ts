import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { loginSchema } from '$lib/validators/schemas/login.schema';
import { ActionFailure, fail, redirect } from '@sveltejs/kit';
import { ClientStatusCode, RedirectStatusCode, ServerStatusCode } from '$types/enums/HTTP';
import { auth } from '$lib/server/lucia';
import { USERNAME_AUTH_PROVIDER } from '$lib/data/constants';
import { withUserStore } from '$lib/stores/user';
import { Pages } from '$types/enums/pages';
import { LuciaError } from 'lucia';
import { errorMessages, luciaErrors } from '$lib/validators/schemas/errorMesages';
import { userHandling } from '$lib/data/userHandling';

type FailResponse = {
	form: object;
	errorMessage?: string;
};

export const load = (async () => {
	const form = await superValidate(loginSchema);
	return { form };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals, cookies }): Promise<ActionFailure<FailResponse>> => {
		const form = await superValidate(request, loginSchema);

		if (!form.valid) {
			form.data.password = '';
			return fail(ClientStatusCode.BAD_REQUEST, { form });
		}

		try {
			const user = await auth.useKey(USERNAME_AUTH_PROVIDER, form.data.username.toLowerCase(), form.data.password);
			await userHandling.loginUser(user, locals, cookies);

            const { loggedInUser } = withUserStore();
			loggedInUser.set(user);

		} catch (e) {
			console.log(e);
			form.data.password = '';

			if (e instanceof LuciaError && (e.message === luciaErrors.invalid_key || e.message === luciaErrors.invalid_password)) {
				form.errors.username = [errorMessages.login.invalid_username_or_password];

				return fail(ClientStatusCode.BAD_REQUEST, { form });
			}

			return fail(ServerStatusCode.INTERNAL_SERVER_ERROR, { form, errorMessage: errorMessages.unknown });
		}

		throw redirect(RedirectStatusCode.FOUND, Pages.HOME);
	}
} satisfies Actions;
