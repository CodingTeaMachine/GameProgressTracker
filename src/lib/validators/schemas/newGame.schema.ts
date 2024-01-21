import { FIRST_VIDEO_GAME_RELEASE_DATE, MIN_GAME_DESCRIPTION_LENGTH } from "$lib/data/constants";
import { errorMessages } from "$lib/validators/errorMesages";
import { AreaInputListSchema } from "$types/domain/area";
import { CollectibleSchema } from "$types/domain/collectible";
import { CollectibleTypeSchema } from "$types/domain/collectibleType";
import {
	GeneralDatabaseDropdownItemSchema,
	GeneralDatabaseDropdownItemWithNameSchema,
	GeneralDropdownDataSchema
} from "$types/clientTypes";
import { z } from "zod";

export const newGameSchema = z.object({
	//Cover Image
	coverImage: z.string().optional(), //base64 string

	//General
	title: z.string({
		required_error: errorMessages.newGame.title.required,
		invalid_type_error: errorMessages.newGame.title.invalid_type
	}).min(1),
	description: z.string({
		required_error: errorMessages.newGame.description.required,
		invalid_type_error: errorMessages.newGame.description.invalid_type
	}).min(MIN_GAME_DESCRIPTION_LENGTH, errorMessages.newGame.description.min_length(MIN_GAME_DESCRIPTION_LENGTH)),
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
	storefronts: GeneralDatabaseDropdownItemWithNameSchema.array(),

	// Big lists
	areas: AreaInputListSchema.array(),
	collectibleTypes: CollectibleTypeSchema.array(),
	collectibles: CollectibleSchema.array(),
});
