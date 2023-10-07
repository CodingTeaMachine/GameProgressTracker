import { xboxAchievementGrades, playstationAchievementGrades, regularAchievementGrades } from './achievementGrade';

const xboxAchievementGradeConnection = {
	achievement_grades: {
		connect: [...xboxAchievementGrades]
	}
};

const playstationAchievementGradeConnection = {
	achievement_grades: {
		connect: [...playstationAchievementGrades]
	}
};

const regularAchievementGradeConnection = {
	achievement_grades: {
		connect: [...regularAchievementGrades]
	}
};

export const digitalStorefronts = [
	{ name: 'Amazon Game App' },
	{ name: 'Amazon Luna' },
	{ name: 'Apple App Store' },
	{ name: 'Arc' },
	{ name: 'Battle.net', hasAchievements: true, ...regularAchievementGradeConnection },
	{ name: 'Bethesda' },
	{ name: 'Direct Download' },
	{ name: 'Discord' },
	{ name: 'Epic Games', hasAchievements: true, ...regularAchievementGradeConnection },
	{ name: 'GameCenter' },
	{ name: 'Game Jolt' },
	{ name: 'GOG' },
	{ name: 'Google Play' },
	{ name: 'Google Stadia', hasAchievements: true, ...regularAchievementGradeConnection },
	{ name: 'Humble Bundle' },
	{ name: 'IndieGala' },
	{ name: 'itch.io' },
	{ name: 'JAST USA' },
	{ name: 'Kartridge' },
	{ name: 'Legacy Games' },
	{ name: 'Microsoft Store' },
	{ name: 'Nintendo eShop' },
	{ name: 'Oculus' },
	{ name: 'Origin', hasAchievements: true, ...regularAchievementGradeConnection },
	{ name: 'Paradox Games' },
	{ name: 'PlayStation Store', hasAchievements: true, ...playstationAchievementGradeConnection },
	{ name: 'Robot Cache' },
	{ name: 'Rockstar Games', hasAchievements: true, ...regularAchievementGradeConnection },
	{ name: 'Steam', hasAchievements: true, ...regularAchievementGradeConnection },
	{ name: 'Ubisoft Connect', hasAchievements: true, ...regularAchievementGradeConnection },
	{ name: 'Xbox Store', hasAchievements: true, ...xboxAchievementGradeConnection }
].map(digitalStoreFront => ({ ...digitalStoreFront, type: { connect: { name: 'Digital' } } }));

export const physicalStorefronts = [{ name: 'Borrowed' }, { name: 'Physical' }, { name: 'Rented' }].map(
	digitalStoreFront => {
		return { ...digitalStoreFront, type: { connect: { name: 'Physical' } } };
	}
);

export const subscriptionStorefronts = [
	{ name: 'Antstream Arcade' },
	{ name: 'Apple Arcade', hasAchievements: true, ...regularAchievementGradeConnection },
	{ name: 'EA Play', hasAchievements: true, ...regularAchievementGradeConnection },
	{ name: 'Google Play Pass' },
	{ name: 'Google Stadia Pro', hasAchievements: true, ...regularAchievementGradeConnection },
	{ name: 'Netflix' },
	{ name: 'Nintendo Online', hasAchievements: true, ...regularAchievementGradeConnection },
	{ name: 'PlayStation Now', hasAchievements: true, ...playstationAchievementGradeConnection },
	{ name: 'PlayStation Plus', hasAchievements: true, ...regularAchievementGradeConnection },
	{ name: 'Ubisoft+', hasAchievements: true, ...regularAchievementGradeConnection },
	{ name: 'Viveport' },
	{ name: 'Xbox Game Pass', hasAchievements: true, ...xboxAchievementGradeConnection },
	{ name: 'Xbox Games w/ Gold', hasAchievements: true, ...xboxAchievementGradeConnection }
].map(digitalStoreFront => {
	return { ...digitalStoreFront, type: { connect: { name: 'Subscription' } } };
});

const storefronts = [...digitalStorefronts, ...physicalStorefronts, ...subscriptionStorefronts];

export default storefronts;
