import prisma from '$lib/server/prisma';
import type { PlatformDropdownItem } from "$types/domain/platform";

export const getAllForDropdown = async (): Promise<PlatformDropdownItem[]> => {
	return await prisma.platform.findMany({
		select: { id: true, name: true },
		orderBy: { name: 'asc' }
	});
};

export default {
	getAllForDropdown
};
