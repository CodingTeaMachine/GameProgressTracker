import type { PlatformDropdownItem } from '$types/domain/platform';
import PlatformRepository from '$lib/server/repositories/platform.repository';
import { LogService } from '$types/enums/LogService';
import type { Service } from '$types/serverTypes';

export default class PlatformService implements Service {
	readonly _service = LogService.PLATFORM_SERVICE;

	async getAllForDropdown(): Promise<PlatformDropdownItem[]> {
		return await new PlatformRepository().getAllForDropdown();
	}
}
