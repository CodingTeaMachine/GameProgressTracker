import logger from '$lib/helpers/logger';
import prisma from '$lib/server/prisma';
import type { DeveloperDropdownItem } from '$types/domain/developer';
import { LogService } from '$types/enums/LogService';
import { DatabaseException } from '$types/exceptions/DatabaseException';
import type { Repository } from '$types/serverTypes';

export default class DeveloperRepository implements Repository {

	readonly _service = LogService.DEVELOPER_REPOSITORY;

	async getAllForDropdown(): Promise<DeveloperDropdownItem[]> {
		try {
			return await prisma.developer.findMany({
				select: { id: true, label: true },
				orderBy: { label: 'asc' }
			});
		} catch (error) {
			if (error instanceof Error) {
				logger.error('Error getting all developers for dropdown', { service: this._service, errors: error.message });
			}

			throw new DatabaseException('Error getting all developers for dropdown');
		}
	}
}
