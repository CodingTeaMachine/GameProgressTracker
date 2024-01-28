import { FIRST_VIDEO_GAME_RELEASE_DATE, MIN_GAME_DESCRIPTION_LENGTH } from '$lib/data/constants';
import { newGameDescriptionValidator } from '$lib/validators';
import { errorMessages } from "$lib/validators/errorMesages";
import { AchievementSchema } from '$types/domain/achievement';
import { AreaSchema } from "$types/domain/area";
import { CollectibleSchema } from "$types/domain/collectible";
import { CollectibleTypeSchema } from "$types/domain/collectibleType";
import {
	GeneralDatabaseDropdownItemSchema,
	GeneralDatabaseDropdownItemWithNameSchema,
	GeneralDropdownDataSchema
} from "$types/clientTypes";
import { StorefrontSelectSchema } from '$types/domain/storefront';
import { z } from "zod";

/**
 * Required fields with user input
 * - Title
 * - Description
 * - Cover Image
 */

export const newGameSchema = z.object({
	//Cover Image
	coverImage: z.string().min(1, errorMessages.newGame.coverImage.required), //base64 string

	//General
	title: z.string({
		required_error: errorMessages.newGame.title.required,
		invalid_type_error: errorMessages.newGame.title.invalid_type
	}).min(1, errorMessages.newGame.title.required),
	description: z.custom<string>(newGameDescriptionValidator, errorMessages.newGame.description.min_length(MIN_GAME_DESCRIPTION_LENGTH)),
	isDLC: z.boolean({
		required_error: errorMessages.newGame.dlc.required,
		invalid_type_error: errorMessages.newGame.dlc.invalid_type
	}),
	franchise: GeneralDropdownDataSchema.nullable(),
	parentTitle: GeneralDropdownDataSchema.nullable(),

	//Developers
	developers: GeneralDatabaseDropdownItemSchema.array(),
	releaseDate: z.date({
		invalid_type_error: errorMessages.newGame.releaseDate.invalid_type
	}).min(new Date(FIRST_VIDEO_GAME_RELEASE_DATE)).nullable(),
	publishers: GeneralDatabaseDropdownItemSchema.array(),

	//Miscellaneous
	genres: GeneralDatabaseDropdownItemSchema.array(),
	platforms: GeneralDatabaseDropdownItemWithNameSchema.array(),
	storefronts: StorefrontSelectSchema.array(),

	// Big lists
	areas: AreaSchema.array(),
	collectibleTypes: CollectibleTypeSchema.array(),
	collectibles: CollectibleSchema.array(),
	achievements: AchievementSchema.array(),
});
