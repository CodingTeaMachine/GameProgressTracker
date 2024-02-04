import type { RepositoryPagination, ServicePagination } from '$/lib/types/serverTypes';

export default class ServicePaginationToRepositoryPaginationAdapter {
	public static getRepositoryPagination(servicePagination: ServicePagination): RepositoryPagination {
		return {
			skip: (servicePagination.page - 1) * servicePagination.perPage,
			take: servicePagination.perPage,
		};
	}
}
