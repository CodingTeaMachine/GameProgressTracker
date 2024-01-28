import logger from '$lib/helpers/logger';
import AchievementToSaveFactory from '$lib/server/factories/AchievementToSaveFactory';
import AchievementRepository from '$lib/server/repositories/achievement.repository';
import type { Achievement } from '$types/domain/achievement';
import { LogService } from '$types/enums/LogService';
import type { Service } from '$types/serverTypes';

export default class AchievementService implements Service{

	readonly _service = LogService.ACHIEVEMENT_SERVICE;

	async save(achievements: Achievement[], gameId: number) {
		const achievementRepository = new AchievementRepository();

		for (const achievement of achievements) {
			const achievementToSave = await AchievementToSaveFactory.create(achievement, gameId);

			logger.info("Saving achievement", {service: this._service, data: achievementToSave});
			const {id} = await achievementRepository.create(achievementToSave);


			for (const [storefront_id, {id: achievement_grade_id, label}] of achievement.grades.entries()) {
				logger.info("Binding achievement to grade and storefront", { service:this._service, data: { achievement_id: id, achievement_grade: {achievement_grade_id, label}, storefront_id }});
				await achievementRepository.bindAchievementToGradeAndStorefront({
					achievement_id: id,
					achievement_grade_id,
					storefront_id
				});
			}
		}

	}

}
