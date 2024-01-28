import { ACHIEVEMENT_IMAGE_PATH } from '$lib/data/constants';
import { getSavedImageName } from '$lib/server/imageHandler';
import type { Achievement, AchievementToSave } from '$types/domain/achievement';
import type { Factory } from '$types/serverTypes';

export default class AchievementToSaveFactory implements Factory<AchievementToSave> {

	static async create(achievement: Achievement, game_id: number): Promise<AchievementToSave> {

		const achievementToSave: AchievementToSave = {
			title: achievement.title,
			icon: achievement.icon,
			description: achievement.description,
			game_id
		};

		if(achievementToSave.icon){
			achievementToSave.icon = await getSavedImageName(achievementToSave.icon, ACHIEVEMENT_IMAGE_PATH);
		}

		return achievementToSave;
	}

}
