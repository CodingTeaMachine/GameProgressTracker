import type { PublisherDropdownItem } from "$types/domain/publisher";
import PublisherRepository from '$lib/server/repositories/publisher.repository';

export const getAllForDropdown = async (): Promise<PublisherDropdownItem[]> => {
    return PublisherRepository.getAllForDropdown();
};

export default {
  getAllForDropdown
};
