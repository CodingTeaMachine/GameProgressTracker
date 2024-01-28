import logger from '$lib/helpers/logger';
import prisma from '$lib/server/prisma';
import type { StorefrontDropdownItem } from '$types/domain/storefront';
import { LogService } from '$types/enums/LogService';
import { DatabaseException } from '$types/exceptions/DatabaseException';
import type { Repository } from '$types/serverTypes';

export default class StorefrontRepository implements Repository {
	readonly _service = LogService.STOREFRONT_REPOSITORY;

	async getAllForDropdown(): Promise<StorefrontDropdownItem[]> {
		try {
			return (await prisma.storefront.findMany({
				select: {
					id: true,
					name: true,
					has_achievements: true,
					Type: { select: { name: true } },
					AchievementGrades: { select: { id: true, label: true } }
				},
				orderBy: { name: 'asc' }
			})) as StorefrontDropdownItem[];
		} catch (error) {
			if (error instanceof Error) {
				logger.error('Error getting all storefronts for dropdown', {
					service: this._service,
					errors: error.message
				});
			}

			throw new DatabaseException('Error getting all storefronts for dropdown');
		}
	}
}
