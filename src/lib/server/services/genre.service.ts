import type { GenreDropdownItem } from '$types/domain/genre';
import GenreRepository from '$lib/server/repositories/genre.repository';
import { LogService } from '$types/enums/LogService';
import type { Service } from '$types/serverTypes';

export default class GenreService implements Service {
	readonly _service = LogService.GENRE_SERVICE;

	async getAllForDropdown(): Promise<GenreDropdownItem[]> {
		return await new GenreRepository().getAllForDropdown();
	}
}
