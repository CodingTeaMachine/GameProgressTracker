import type { User } from 'lucia';
import { writable } from 'svelte/store';

export const isLoggedIn = writable<boolean>(false);
export const loggedInUser = writable<null | User>(null);


export const userHandlingStore = {
    loginUser: (user: User) => {
        isLoggedIn.update(() => true);
        loggedInUser.update(() => user);
    },
    logoutUser: () => {
        isLoggedIn.update(() => false);
        loggedInUser.update(() => null);
    }
};
