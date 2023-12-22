import { SuperValidateFormMessage } from "$types/enums/errors";
import { DatabaseException } from "$types/exceptions/DatabaseException";
import { fail } from "@sveltejs/kit";
import { superValidate, message } from "sveltekit-superforms/server";

import logger from "$lib/helpers/logger";

import DeveloperService from "$lib/server/services/developer.service";
import GenreService from "$lib/server/services/genre.service";
import PlatformService from "$lib/server/services/platform.service";
import StorefrontService from "$lib/server/services/storefront.service";
import GameService from "$lib/server/services/game.service";

import PublisherService from "$lib/server/services/publisher.service";

import { newGameSchema } from "$lib/validators/schemas/newGame.schema";

import { ClientStatusCode, ServerStatusCode } from "$types/enums/HTTP";
import { LogService } from "$types/enums/LogService";

import type { ActionFailure } from "@sveltejs/kit";
import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { FailResponse, FailResponseWithMessage } from "$types/types";

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
	default: async ({ request }): Promise<ActionFailure<FailResponse> | FailResponseWithMessage> => {
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
			logger.info("Successfully created game", { service: LogService.NEW_GAME_FORM_ACTION });
			return message(form, SuperValidateFormMessage.SUCCESS);
		} catch (error) {
			if (error instanceof Error) {
				logger.error("Error creating new game", {
					service: LogService.NEW_GAME_FORM_ACTION,
					errors: error.message as string
				});
				return fail(
					ServerStatusCode.INTERNAL_SERVER_ERROR,
					{
						form,
						errorMessage: error.message,
						severity: error instanceof DatabaseException ? error.severity : "error"
					});
			}
		}

		return fail(ServerStatusCode.INTERNAL_SERVER_ERROR, { form, errorMessage: "Unknown error", severity: "error" });
	}
} satisfies Actions;
