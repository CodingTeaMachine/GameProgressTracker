import prisma from '$lib/server/prisma';
import type { PublisherDropdownItem } from '$types/domain/publisher';

export const getAllForDropdown = async (): Promise<PublisherDropdownItem[]> => {
	return await prisma.publisher.findMany({
		select: { id: true, label: true },
		orderBy: { label: 'asc' }
	});
};

export default {
	getAllForDropdown
};
