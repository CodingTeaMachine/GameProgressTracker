import { DEFAULT_ITEMS_PER_PAGE } from '$/lib/data/constants';
import logger from '$/lib/helpers/logger';
import { isIntShape } from '$/lib/helpers/numberHelpers';
import { LogService } from '$/lib/types/enums/LogService';
import type { ServicePagination, ServicePaginationInput } from '$/lib/types/serverTypes';

export default class QueryToServicePaginationAdapter {
	public static getServicePagination(
		source: URL | ServicePaginationInput,
		defaults: ServicePagination = { page: 1, perPage: DEFAULT_ITEMS_PER_PAGE }
	): ServicePagination {
		let page;
		let perPage;

		if (source instanceof URL) {
			page = source.searchParams.get('page') ?? defaults.page;
			perPage = source.searchParams.get('perPage') ?? defaults.perPage;
		} else {
			page = source.page ?? defaults.page;
			perPage = source.perPage ?? defaults.page;
		}

		logger.debug('QueryToServicePaginationAdapter output', {
			service: LogService.QUERY_TO_SERVICE_PAGINATION_ADAPTER,
			data: {
				input: source,
				output: { page, perPage }
			}
		});

		if (typeof page === 'string' && isIntShape(page)) page = parseInt(page);
		if (typeof perPage === 'string' && isIntShape(perPage)) perPage = parseInt(perPage);

		return { page: page as number, perPage: perPage as number };
	}
}
