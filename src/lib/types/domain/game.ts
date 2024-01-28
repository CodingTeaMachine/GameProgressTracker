import type { z } from 'zod';
import type { newGameSchema } from '$lib/validators/schemas/newGame.schema';
import type Prisma from '@prisma/client';

export type CreateGameWithDropdownData = z.infer<typeof newGameSchema>;

export type GameToSave =
	Omit<
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
		| 'collectibles'
		| 'achievements'
	> & {
	franchise: number | null;
	parentTitle: number | null;
	cover: string | undefined;
	developers: { id: number }[];
	publishers: { id: number }[];
	genres: { id: number }[];
	platforms: { id: number }[];
	storefronts: { id: number }[];
}

export type GameDropdownItem = Pick<Prisma.Game, "id" | "title">
