import type {RequestHandler} from "@sveltejs/kit";
import { userStore } from '$lib/stores/user';
import {redirect} from "@sveltejs/kit";
import {Pages} from "$types/enums/pages";
import { userHandling } from '$lib/data/userHandling';
import { HttpStatusCode } from 'axios';

export const POST: RequestHandler = async ({locals, cookies}) => {
    const session = await locals.auth.validate();

    if(session) {
        await userHandling.logoutUser(session, locals, cookies);
        userStore.user.logout();
    }

    throw redirect(HttpStatusCode.Found, Pages.HOME);
};

export const GET = POST;
