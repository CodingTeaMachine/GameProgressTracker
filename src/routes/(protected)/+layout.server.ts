import { redirect } from '@sveltejs/kit';
import { RedirectStatusCode } from '$types/enums/HTTP';
import type { LayoutServerLoad } from './$types';
import { Pages } from '$types/enums/pages';

export const load: LayoutServerLoad = async ({locals}) => {
	const session = await locals.auth.validate();
	if (!session) {
		throw redirect(RedirectStatusCode.FOUND, Pages.HOME);
	}
};
