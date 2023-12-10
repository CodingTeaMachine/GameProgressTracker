import logger from "$lib/helpers/logger";
import DeveloperService from '$lib/services/developer.service';
import GenreService from '$lib/services/genre.service';
import PlatformService from '$lib/services/platform.service';
import StorefrontService from '$lib/services/storefront.service';
import { newGameSchema } from "$lib/validators/schemas/newGame.schema";
import { ClientStatusCode, ServerStatusCode } from "$types/enums/HTTP";
import { LogService } from "$types/enums/LogService";
import { DatabaseException } from "$types/exceptions/DatabaseException";
import type { FailResponse, SuccessfulAction } from "$types/types";
import { fail } from "@sveltejs/kit";
import type { ActionFailure } from "@sveltejs/kit";
import type { Actions } from '@sveltejs/kit';
import { superValidate } from "sveltekit-superforms/server";
import type { PageServerLoad } from './$types';
import PublisherService from '$lib/services/publisher.service';
import * as GameService from '$lib/services/game.service';

export const load = (async () => {
	return {
		form: await superValidate(newGameSchema),
		publishers: PublisherService.getAllForDropdown(),
		developers: DeveloperService.getAllForDropdown(),
		genres: GenreService.getAllForDropdown(),
		platforms: PlatformService.getAllForDropdown(),
		storefronts: StorefrontService.getAllForDropdown()
	};
}) satisfies PageServerLoad;


export const actions = {
	default: async ({request}): Promise<ActionFailure<FailResponse> | SuccessfulAction> => {
		const form = await superValidate(request, newGameSchema);

		if (!form.valid) {
			logger.error(
				"New Game creation form validation error",
				{
					service: LogService.NEW_GAME_FORM_ACTION,
					data: form.data,
					errors: form.errors
				});
			return fail(ClientStatusCode.BAD_REQUEST, { form });
		}

		try {
			await GameService.create(form.data);
		} catch (error) {
			if(error instanceof DatabaseException) {
				return fail(ServerStatusCode.INTERNAL_SERVER_ERROR, {form, errorMessage: error.message, severity: error.severity});
			}
		}

		return  {success: true};
	}
} satisfies Actions;
