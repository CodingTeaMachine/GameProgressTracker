import type { PublisherDropdownItem } from "$types/domain/publisher";
import PublisherRepository from '$lib/server/repositories/publisher.repository';
import { LogService } from '$types/enums/LogService';
import type { Service } from '$types/serverTypes';

export default class PublisherService implements Service{
    readonly _service = LogService.PUBLISHER_SERVICE;

    async getAllForDropdown(): Promise<PublisherDropdownItem[]> {
        return await new PublisherRepository().getAllForDropdown();
    };
}
