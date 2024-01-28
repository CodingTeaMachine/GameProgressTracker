import logger from '$lib/helpers/logger';
import prisma from '$lib/server/prisma';
import type { PlatformDropdownItem } from "$types/domain/platform";
import { LogService } from '$types/enums/LogService';
import { DatabaseException } from '$types/exceptions/DatabaseException';
import type { Repository } from '$types/serverTypes';

export default class PlatformRepository implements Repository {
	readonly _service = LogService.PLATFORM_REPOSITORY;

	async getAllForDropdown(): Promise<PlatformDropdownItem[]> {
		try {
			return await prisma.platform.findMany({
				select: { id: true, name: true },
				orderBy: { name: 'asc' }
			});
		} catch (error) {
			if (error instanceof Error) {
				logger.error('Error getting all platforms for dropdown', { service: this._service, errors: error.message });
			}

			throw new DatabaseException('Error getting all platforms for dropdown');
		}
	}
}
