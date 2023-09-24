import type { Session, User } from 'lucia';
import type { Cookies } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';

export const userHandling = {
	loginUser: async (user: User, locals: App.Locals, cookies: Cookies) => {
		const session = await auth.createSession({
			userId: user.userId,
			attributes: {}
		});

		const sessionCookie = auth.createSessionCookie(session);
		locals.auth.setSession(session);

		cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	},
	logoutUser: async (session: Session, locals: App.Locals, cookies: Cookies) => {
		await auth.invalidateSession(session.sessionId);
		locals.auth.setSession(null);

		const sessionCookie = auth.createSessionCookie(null);
		cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

	}
};
