import FranchiseService from '$lib/server/services/franchise.service';
import { errorMessages } from '$lib/validators/errorMesages';
import { ErrorSeverity, SuperValidateFormMessage } from '$types/enums/errors';
import { DatabaseException } from '$types/exceptions/DatabaseException';
import { fail } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms/server';

import logger from '$lib/helpers/logger';

import DeveloperService from '$lib/server/services/developer.service';
import GenreService from '$lib/server/services/genre.service';
import PlatformService from '$lib/server/services/platform.service';
import StorefrontService from '$lib/server/services/storefront.service';
import GameService from '$lib/server/services/game.service';

import PublisherService from '$lib/server/services/publisher.service';

import { newGameSchema } from '$lib/validators/schemas/newGame.schema';

import { ClientStatusCode, ServerStatusCode } from '$types/enums/HTTP';
import { LogService } from '$types/enums/LogService';

import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	return {
		form: await superValidate(newGameSchema),
		publishers: await new PublisherService().getAllForDropdown(),
		developers: await new DeveloperService().getAllForDropdown(),
		genres: await new GenreService().getAllForDropdown(),
		platforms: await new PlatformService().getAllForDropdown(),
		storefronts: await new StorefrontService().getAllForDropdown(),
		franchises: await new FranchiseService().getAllForDropdown()
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, newGameSchema);

		if (!form.valid) {
			logger.error('New Game creation form validation error', {
				service: LogService.NEW_GAME_FORM_ACTION,
				data: form.data,
				errors: form.errors
			});
			return fail(ClientStatusCode.BAD_REQUEST, { form });
		}

		try {
			await new GameService().save(form.data);
			logger.info('Successfully created game', { service: LogService.NEW_GAME_FORM_ACTION });
			return message(form, SuperValidateFormMessage.SUCCESS);
		} catch (error) {
			if (error instanceof Error) {
				logger.error('Error creating new game', {
					service: LogService.NEW_GAME_FORM_ACTION,
					errors: error.message as string,
					trace: error.stack
				});
				return fail(ServerStatusCode.INTERNAL_SERVER_ERROR, {
					form,
					errorMessage: error.message,
					severity: error instanceof DatabaseException ? error.severity : ErrorSeverity.ERROR
				});
			}
		}

		return fail(ServerStatusCode.INTERNAL_SERVER_ERROR, {
			form,
			errorMessage: errorMessages.unknown,
			severity: ErrorSeverity.ERROR
		});
	}
} satisfies Actions;
