import type { StorefrontDropdownItem } from "$types/domain/storefront";
import StorefrontRepository from '$lib/server/repositories/storefront.repository';
import { LogService } from '$types/enums/LogService';
import type { Service } from '$types/serverTypes';

export default class StorefrontService implements Service {
	readonly _service = LogService.STOREFRONT_SERVICE;

	async getAllForDropdown(): Promise<StorefrontDropdownItem[]> {
		return await new StorefrontRepository().getAllForDropdown();
	}
}
