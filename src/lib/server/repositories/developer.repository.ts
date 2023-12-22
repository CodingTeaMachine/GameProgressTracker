import prisma from '$lib/server/prisma';
import type { DeveloperDropdownItem } from '$types/domain/developer';

export const getAllForDropdown = async (): Promise<DeveloperDropdownItem[]> => {
	return await prisma.developer.findMany({
		select: { id: true, label: true },
		orderBy: { label: 'asc' }
	});
};

export default {
	getAllForDropdown
};
