import logger from '$lib/helpers/logger';
import prisma from '$lib/server/prisma';
import type { PublisherDropdownItem } from '$types/domain/publisher';
import { LogService } from '$types/enums/LogService';
import { DatabaseException } from '$types/exceptions/DatabaseException';
import type { Repository } from '$types/serverTypes';

export default class PublisherRepository implements Repository {
	readonly _service = LogService.PUBLISHER_REPOSITORY;

	async getAllForDropdown(): Promise<PublisherDropdownItem[]> {
		try {
			return await prisma.publisher.findMany({
				select: { id: true, label: true },
				orderBy: { label: 'asc' }
			});
		} catch (error) {
			if (error instanceof Error) {
				logger.error('Error getting publishers for dropdown', {
					service: this._service,
					errors: error.message
				});
			}

			throw new DatabaseException('Error getting publishers for dropdown');
		}
	}
}
