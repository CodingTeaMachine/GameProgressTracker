import type { DeveloperDropdownItem } from "$types/domain/developer";
import DeveloperRepository from '$lib/server/repositories/developer.repository';

export const getAllForDropdown = async (): Promise<DeveloperDropdownItem[]> => {
    return DeveloperRepository.getAllForDropdown();
};

export default {
  getAllForDropdown
};
