import type { User } from 'lucia';
import { readonly, writable } from 'svelte/store';

function useUserStore() {
	const loggedInUser = writable<null | User>(null);
	const isLoggedIn = writable(false);

	function update(updater: (currentValue: null | User) => typeof loggedInUser) {
		loggedInUser.update(currentValue => {
			const newValue = updater(currentValue);
			isLoggedIn.set(!!newValue);
			return newValue;
		});
	}

	function set(newValue: null | User) {
		update(() => newValue);
	}

	function login(user: User) {
		set(user);
	}

	function logout() {
		set(null);
	}

	return {
		user: {
			...loggedInUser,
			update,
			set,
			logout,
			login
		},
		isLoggedIn: readonly(isLoggedIn)
	};
}

export const userStore = useUserStore();
