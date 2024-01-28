import type { DeveloperDropdownItem } from "$types/domain/developer";
import DeveloperRepository from '$lib/server/repositories/developer.repository';
import { LogService } from '$types/enums/LogService';
import type { Service } from '$types/serverTypes';

export default class DeveloperService implements Service {
    readonly _service = LogService.DEVELOPER_SERVICE;

    async getAllForDropdown(): Promise<DeveloperDropdownItem[]> {
        return await new DeveloperRepository().getAllForDropdown();
    }
}
