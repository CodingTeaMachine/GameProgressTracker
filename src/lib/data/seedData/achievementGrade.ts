export const xboxAchievementGrades = [
	{ label: '5G' },
	{ label: '10G' },
	{ label: '15G' },
	{ label: '20G' },
	{ label: '25G' },
	{ label: '30G' },
	{ label: '50G' },
	{ label: '100G' }
];

export const playstationAchievementGrades = [
	{ label: 'Bronze Trophy' },
	{ label: 'Silver Trophy' },
	{ label: 'Gold Trophy' },
	{ label: 'Platinum Trophy' }
];

export const regularAchievementGrades = [{ label: 'Regular' }];

const achievementGrades = [...xboxAchievementGrades, ...playstationAchievementGrades, ...regularAchievementGrades];

export default achievementGrades;
