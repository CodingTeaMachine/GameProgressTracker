import logger from '$lib/helpers/logger';
import prisma from '$lib/server/prisma';
import type { AchievementToSave } from '$types/domain/achievement';
import { LogService } from '$types/enums/LogService';
import { DatabaseException } from '$types/exceptions/DatabaseException';
import type { Repository } from '$types/serverTypes';

export default class AchievementRepository implements Repository {
	readonly _service = LogService.ACHIEVEMENT_REPOSITORY;

	async create(achievement: AchievementToSave) {
		try {
			return await prisma.achievement.create({
				data: achievement
			});
		} catch (error) {
			if (error instanceof Error) {
				logger.error(`Error creating achievement: ${achievement.title}`, {
					service: this._service,
					data: achievement,
					errors: error.message
				});
			}

			throw new DatabaseException(`Error saving achievement: ${achievement.title}`);
		}
	}

	async bindAchievementToGradeAndStorefront(binding: {
		achievement_id: number,
		achievement_grade_id: number,
		storefront_id: number
	}) {
		try {
			await prisma.achievementGradeOnStorefrontOnAchievement.create({
				data: binding
			});
		} catch (error) {
			if (error instanceof Error) {
				logger.error("Error bindig achievement to grade and store", {
					service: this._service,
					data: binding,
					errors: error.message
				});
			}

			throw new DatabaseException("Error bindig achievement to grade and store");
		}
	}
}
