import type { StorefrontDropdownItem } from "$types/domain/storefront";
import StorefrontRepository from '../repositories/storefront.repository';

export const getAllForDropdown = async (): Promise<StorefrontDropdownItem[]> => {
	return StorefrontRepository.getAllForDropdown();
};

export default {
	getAllForDropdown
};
