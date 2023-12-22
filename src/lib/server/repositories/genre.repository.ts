import prisma from '$lib/server/prisma';
import type { GenreDropdownItem } from '$types/domain/genre';

export const getAllForDropdown = async (): Promise<GenreDropdownItem[]> => {
  return await prisma.genre.findMany({
    select: { id: true, label: true },
    orderBy: { label: 'asc' }
  });
};

export default {
  getAllForDropdown
};
