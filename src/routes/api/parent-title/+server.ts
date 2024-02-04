import logger from '$lib/helpers/logger';
import { jsonResponse } from '$lib/server/response';
import GameService from '$lib/server/services/game.service';
import { LogService } from '$types/enums/LogService';
import { json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

export async function GET({ url }: RequestEvent): Promise<Response> {
	const searchText = url.searchParams.get('searchText');

	logger.info("Searching for parent titles", {service: LogService.API_PARENT_TITLE_GET, data: {searchText}});

	if(searchText === null || searchText === '') return json({data: []});

	const parentTitles = await new GameService().getParentTitles(searchText);

	return jsonResponse(parentTitles);
}
