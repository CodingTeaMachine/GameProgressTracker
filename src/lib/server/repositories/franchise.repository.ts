import logger from '$lib/helpers/logger';
import prisma from '$lib/server/prisma';
import type { FranchiseDropdownItem } from '$types/domain/franchise';
import { LogService } from '$types/enums/LogService';
import { DatabaseException } from '$types/exceptions/DatabaseException';
import type { Repository } from '$types/serverTypes';
import type Prisma from "@prisma/client";


export default class FranchiseRepository implements Repository {
	readonly _service = LogService.FRANCHISE_REPOSITORY;

	async save(title: string): Promise<Prisma.Franchise> {
		try {
			return await prisma.franchise.create({ data: {title}});
		} catch (error) {
			if(error instanceof Error) {
				logger.error('Error creating franchise', { service: this._service, data: {title}, errors: error.message});
			}

			throw new DatabaseException('Error saving franchise');
		}
	}

	async getAllForDropdown(): Promise<FranchiseDropdownItem[]> {
		try {
			return await prisma.franchise.findMany({
				select: {id: true, title: true},
				orderBy: {title: 'asc'}
			});
		} catch (error) {
			if (error instanceof Error) {
				logger.error('Error getting all franchises for dropdown', { service: this._service, errors: error.message });
			}

			throw new DatabaseException('Error getting all franchises for dropdown');
		}
	}
}
