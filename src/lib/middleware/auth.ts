import { redirect } from '@sveltejs/kit';
import { Pages } from '$types/enums/pages';

export const authenticated = async (locals: App.Locals) => {
	const session = await locals.auth.validate();

	if (session) {
		throw redirect(302, Pages.HOME);
	}
};
