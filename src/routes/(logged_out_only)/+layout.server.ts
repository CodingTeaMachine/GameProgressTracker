import { redirect } from '@sveltejs/kit';
import { HttpStatusCode } from 'axios';
import type { LayoutServerLoad } from './$types';
import { Pages } from '$types/enums/pages';

export const load: LayoutServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();

	if (session) {
		throw redirect(HttpStatusCode.Found, Pages.HOME);
	}
};
