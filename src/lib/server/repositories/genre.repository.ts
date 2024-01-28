import logger from '$lib/helpers/logger';
import prisma from '$lib/server/prisma';
import type { GenreDropdownItem } from '$types/domain/genre';
import { LogService } from '$types/enums/LogService';
import { DatabaseException } from '$types/exceptions/DatabaseException';
import type { Repository } from '$types/serverTypes';

export default class GenreRepository implements Repository {
	readonly _service = LogService.GENRE_REPOSITORY;

	async getAllForDropdown(): Promise<GenreDropdownItem[]> {
		try {
			return await prisma.genre.findMany({
				select: { id: true, label: true },
				orderBy: { label: 'asc' }
			});
		} catch (error) {
			if (error instanceof Error) {
				logger.error('Error getting all genres for dropdown', { service: this._service, errors: error.message });
			}

			throw new DatabaseException('Error getting all genres for dropdown');
		}
	}
}
