import { removeHTMLFromString } from '$lib/client/misc';
import { MIN_GAME_DESCRIPTION_LENGTH } from '$lib/data/constants';


/**
 * @param data
 * @throws ZodError
 */
export function newGameDescriptionValidator(data: unknown): any {
	if (removeHTMLFromString(data as string).length < MIN_GAME_DESCRIPTION_LENGTH) {
		return false;
	}

	return true;
}
