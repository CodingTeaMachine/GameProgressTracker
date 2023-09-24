import type {RequestHandler} from "@sveltejs/kit";
import {  userHandlingStore } from '$lib/stores/user';
import {redirect} from "@sveltejs/kit";
import {RedirectStatusCode} from "$types/enums/HTTP";
import {Pages} from "$types/enums/pages";
import { userHandling } from '$lib/data/userHandling';

export const POST: RequestHandler = async ({locals, cookies}) => {
    const session = await locals.auth.validate();

    if(session) {
        await userHandling.logoutUser(session, locals, cookies);
        userHandlingStore.logoutUser();
    }

    throw redirect(RedirectStatusCode.FOUND, Pages.HOME);
};

export const GET = POST;
