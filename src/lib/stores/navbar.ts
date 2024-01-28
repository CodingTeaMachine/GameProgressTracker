import { writable } from 'svelte/store';

function useNavbarStore() {
	const isNavbarOpen = writable<boolean>(true);

	return {
		isNavbarOpen,
		open: () => isNavbarOpen.set(true),
		close: () => isNavbarOpen.set(false),
		toggle: () => isNavbarOpen.update(currentVal => !currentVal),
	};
}

export const navbarStore = useNavbarStore();
