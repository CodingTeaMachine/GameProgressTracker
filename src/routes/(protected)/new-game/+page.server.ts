import DeveloperService from "$lib/services/developer.service";
import GenreService from "$lib/services/genre.service";
import PlatformService from "$lib/services/platform.service";
import type { PageServerLoad } from "./$types";
import PublisherService from "$lib/services/publisher.service";

export const load = (() => {
  return {
    publishers: PublisherService.getAllForDropdown(),
    developers: DeveloperService.getAllForDropdown(),
    genres: GenreService.getAllForDropdown(),
    platforms: PlatformService.getAllForDropdown(),
  };
}) satisfies PageServerLoad;
