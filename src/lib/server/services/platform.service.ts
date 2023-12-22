import type { PlatformDropdownItem } from "$types/domain/platform";
import PlatformRepository from '$lib/server/repositories/platform.repository';

export const getAllForDropdown = async (): Promise<PlatformDropdownItem[]> => {
    return PlatformRepository.getAllForDropdown();
};

export default {
  getAllForDropdown
};
