import { z } from 'zod';

export const AchievementGradeSchema = z.object({
	id: z.number(),
	label: z.string(),
});

export type AchievementGrade = z.infer<typeof AchievementGradeSchema>;

export const AchievementSchema = z.object({
	localId: z.number(),
	title: z.string(),
	icon: z.string().optional(),
	description: z.string().nullable(),
	grades: z.map(z.number(),AchievementGradeSchema), // Storefront - AchievementGrade
});

export type Achievement = z.infer<typeof AchievementSchema>;

export type AchievementToSave = Pick<Achievement, "icon" | "title" | "description"> & {game_id: number}
