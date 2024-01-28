import { LogService } from '$/lib/types/enums/LogService';
import FranchiseRepository from '$lib/server/repositories/franchise.repository';
import type { FranchiseDropdownItem } from '$types/domain/franchise';
import type { Service } from '$types/serverTypes';
import type Prisma from '@prisma/client'

export default class FranchiseService implements Service {
    readonly _service = LogService.FRANCHISE_SERVICE;

	/**
	 * Saves the franchise
	 * @param title
	 */
	async save(title: string): Promise<Prisma.Franchise> {
		return await new FranchiseRepository().save(title);
	}

	async getAllForDropdown(): Promise<FranchiseDropdownItem[]> {
		return await new FranchiseRepository().getAllForDropdown();
	}
}
