import prisma from '$lib/server/prisma';
import type { StorefrontDropdownItem } from '$types/domain/storefront';

export const getAllForDropdown = async (): Promise<StorefrontDropdownItem[]> => {
	return await prisma.storefront.findMany({
		select: {
			id: true, name: true,
			Type: {
				select: { name: true }
			}
		},
		orderBy: { name: 'asc' }
	}) as StorefrontDropdownItem[];
};

export default {
	getAllForDropdown
};
