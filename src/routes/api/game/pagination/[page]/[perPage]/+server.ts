import QueryToServicePaginationAdapter from '$/lib/server/adapters/QueryToServicePaginationAdapter';
import URLQueryToSearchAdapter from '$/lib/server/adapters/explore/URLQueryToSearchAdapter';
import { errorResponse, jsonResponse } from '$/lib/server/response';
import GameService from '$/lib/server/services/game.service';
import type { ServicePaginationInput } from '$/lib/types/serverTypes';
import type { RequestEvent } from '@sveltejs/kit';

export async function GET({ params, url }: RequestEvent<ServicePaginationInput>) {
	const pagination = QueryToServicePaginationAdapter.getServicePagination(params);
	const search = URLQueryToSearchAdapter.getSearch(url);

	try {
		const games = await new GameService().getForExplorePage(pagination, search);
		const totalAmount = await new GameService().getTotalAmount(search);
		return jsonResponse({games, totalAmount});
	} catch (e) {
		return errorResponse('Could not load games');
	}
}
