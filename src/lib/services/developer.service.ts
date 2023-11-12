import type { DeveloperDropdownItem } from "$types/domain/developer";
import DeveloperRepository from '../repositories/developer.repository';

export const getAllForDropdown = async (): Promise<DeveloperDropdownItem[]> => {
    return DeveloperRepository.getAllForDropdown();
};

export default {
  getAllForDropdown
};
