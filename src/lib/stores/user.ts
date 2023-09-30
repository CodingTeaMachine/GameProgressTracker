import type { User } from 'lucia';
import { readonly, writable } from 'svelte/store';

export const isLoggedIn = writable<boolean>(false);
export const loggedInUser = writable<null | User>(null);

export function withUserStore() {
	const loggedInUser = writable<null | User>(null);
	const isLoggedIn = writable(false);

	function update(updater: (currentValue: null | User) => typeof loggedInUser) {
		loggedInUser.update(currentValue => {
			isLoggedIn.set(!!currentValue);
			return updater(currentValue);
		});
	}

	function set(newValue: null | User) {
		update(() => newValue);
	}

	function logout() {
		set(null);
	}

	return {
		loggedInUser: {
			...loggedInUser,
			update,
			set,
			logout
		},
		isLoggedIn: readonly(isLoggedIn)
	};
}
