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
	> {
	franchise: string | null;
	parentTitle: number | null;
	developers: { id: number }[];
	publishers: { id: number }[];
	genres: { id: number }[];
	platforms: { id: number }[];
	storefronts: { id: number }[];
}
