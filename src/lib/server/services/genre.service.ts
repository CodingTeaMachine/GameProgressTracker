import type { GenreDropdownItem } from "$types/domain/genre";
import GenreRepository from '$lib/server/repositories/genre.repository';

export const getAllForDropdown = async (): Promise<GenreDropdownItem[]> => {
  return GenreRepository.getAllForDropdown();
};

export default {
  getAllForDropdown
};
