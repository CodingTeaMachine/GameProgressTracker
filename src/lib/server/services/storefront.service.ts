import type { StorefrontDropdownItem } from "$types/domain/storefront";
import StorefrontRepository from '$lib/server/repositories/storefront.repository';


export const getAllForDropdown = async (): Promise<StorefrontDropdownItem[]> => {
	return StorefrontRepository.getAllForDropdown();
};

export default {
	getAllForDropdown
};
