import prisma from '$lib/server/prisma';
import * as process from 'process';
import {
	setDebugMode,
	setClearMode,
	genericSeeder,
	logResultToConsole,
	setSeeders,
	runAllSeeders,
	runSpecificSeeders,
	storefrontSeeder
} from './seedHelper';

const debugTag = 'seed:debug';
const clearTableTag = 'seed:clean';
async function seed(...args: string[]) {
	if (args.includes(debugTag)) {
		setDebugMode(true);
		args = args.filter(arg => arg !== debugTag);
	}

	if (args.includes(clearTableTag)) {
		setClearMode(true);
		args = args.filter(arg => arg !== clearTableTag);
	}

	setSeeders({
		genres: () => genericSeeder('genre', () => import('$seedData/genres')),
		publishers: () => genericSeeder('publisher', () => import('$seedData/publishers')),
		developers: () => genericSeeder('developer', () => import('$seedData/developers')),
		platforms: () => genericSeeder('platform', () => import('$seedData/platforms')),
		achievementGrades: () =>
			genericSeeder('achievementGrade', () => import('../src/lib/data/seedData/achievementGrade')),
		storefrontTypes: () => genericSeeder('storefrontType', () => import('$seedData/storefrontTypes')),
		storefronts: () => storefrontSeeder()
	});

	if (args.length === 0) {
		return runAllSeeders();
	}

	return runSpecificSeeders(args);
}

seed(...process.argv.slice(2))
	.then(async () => {
		await prisma.$disconnect();
		logResultToConsole();
	})
	.catch(async error => {
		console.log(error);
		await prisma.$disconnect();
		process.exit(1);
	});
