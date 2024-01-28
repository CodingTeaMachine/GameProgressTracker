import { xboxAchievementGrades, playstationAchievementGrades, regularAchievementGrades } from './achievementGrade';

const xboxAchievementGradeConnection = {
	AchievementGrades: {
		connect: [...xboxAchievementGrades]
	}
};

const playstationAchievementGradeConnection = {
	AchievementGrades: {
		connect: [...playstationAchievementGrades]
	}
};

const regularAchievementGradeConnection = {
	AchievementGrades: {
		connect: [...regularAchievementGrades]
	}
};

export const digitalStorefronts = [
	{ name: 'Amazon Game App' },
	{ name: 'Amazon Luna' },
	{ name: 'Apple App Store' },
	{ name: 'Arc' },
	{ name: 'Battle.net', has_achievements: true, ...regularAchievementGradeConnection },
	{ name: 'Bethesda' },
	{ name: 'Direct Download' },
	{ name: 'Discord' },
	{ name: 'Epic Games', has_achievements: true, ...regularAchievementGradeConnection },
	{ name: 'GameCenter' },
	{ name: 'Game Jolt' },
	{ name: 'GOG' },
	{ name: 'Google Play' },
	{ name: 'Google Stadia', has_achievements: true, ...regularAchievementGradeConnection },
	{ name: 'Humble Bundle' },
	{ name: 'IndieGala' },
	{ name: 'itch.io' },
	{ name: 'JAST USA' },
	{ name: 'Kartridge' },
	{ name: 'Legacy Games' },
	{ name: 'Microsoft Store' },
	{ name: 'Nintendo eShop' },
	{ name: 'Oculus' },
	{ name: 'Origin', has_achievements: true, ...regularAchievementGradeConnection },
	{ name: 'Paradox Games' },
	{ name: 'PlayStation Store', has_achievements: true, ...playstationAchievementGradeConnection },
	{ name: 'Robot Cache' },
	{ name: 'Rockstar Games', has_achievements: true, ...regularAchievementGradeConnection },
	{ name: 'Steam', has_achievements: true, ...regularAchievementGradeConnection },
	{ name: 'Ubisoft Connect', has_achievements: true, ...regularAchievementGradeConnection },
	{ name: 'Xbox Store', has_achievements: true, ...xboxAchievementGradeConnection }
].map(digitalStoreFront => ({ ...digitalStoreFront, Type: { connect: { name: 'Digital' } } }));

export const physicalStorefronts = [{ name: 'Borrowed' }, { name: 'Physical' }, { name: 'Rented' }].map(
	digitalStoreFront => {
		return { ...digitalStoreFront, Type: { connect: { name: 'Physical' } } };
	}
);

export const subscriptionStorefronts = [
	{ name: 'Antstream Arcade' },
	{ name: 'Apple Arcade', has_achievements: true, ...regularAchievementGradeConnection },
	{ name: 'EA Play', has_achievements: true, ...regularAchievementGradeConnection },
	{ name: 'Google Play Pass' },
	{ name: 'Google Stadia Pro', has_achievements: true, ...regularAchievementGradeConnection },
	{ name: 'Netflix' },
	{ name: 'Nintendo Online', has_achievements: true, ...regularAchievementGradeConnection },
	{ name: 'PlayStation Now', has_achievements: true, ...playstationAchievementGradeConnection },
	{ name: 'PlayStation Plus', has_achievements: true, ...playstationAchievementGradeConnection },
	{ name: 'Ubisoft+', has_achievements: true, ...regularAchievementGradeConnection },
	{ name: 'Viveport' },
	{ name: 'Xbox Game Pass', has_achievements: true, ...xboxAchievementGradeConnection },
	{ name: 'Xbox Games w/ Gold', has_achievements: true, ...xboxAchievementGradeConnection }
].map(digitalStoreFront => {
	return { ...digitalStoreFront, Type: { connect: { name: 'Subscription' } } };
});

const storefronts = [...digitalStorefronts, ...physicalStorefronts, ...subscriptionStorefronts];

export default storefronts;
