import type { GeneralDropdownData } from "$types/types";
import type { z } from 'zod';
import type { newGameSchema } from '$lib/validators/schemas/newGame.schema';

export type CreateGameWithDropdownData = z.infer<typeof newGameSchema>;

export interface CreateGame
	extends Omit<
		CreateGameWithDropdownData,
		| 'franchise'
		| 'parentTitle'
		| 'developers'
		| 'publishers'
		| 'genres'
		| 'platforms'
		| 'storefronts'
		| 'coverImage'
		| 'areas'
		| 'collectibleTypes'
	> {
	franchise: GeneralDropdownData | null;
	parentTitle: number | null;
	cover: string | undefined;
	developers: { id: number }[];
	publishers: { id: number }[];
	genres: { id: number }[];
	platforms: { id: number }[];
	storefronts: { id: number }[];
}
