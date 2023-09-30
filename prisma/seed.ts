import prisma from '../src/lib/server/prisma';
import * as process from 'process';
import {
	setDebugMode,
	genericSeeder,
	logResultToConsole,
	setSeeders,
	runAllSeeders,
	runSpecificSeeders
} from './genericSeeder';

const debugTag = 'seed:debug';
const seederFileBasePath = '../src/lib/data/seedData';

async function seed(...args: string[]) {
	if (args.includes(debugTag)) {
		setDebugMode(true);
		args = args.filter(arg => arg !== debugTag);
	}

	setSeeders({
		genres: () => genericSeeder('genre', () => import('$seedData/genres')),
		publishers: () => genericSeeder('publisher', () => import('$seedData/publishers')),
		developers: () => genericSeeder('developer', () => import('$seedData/developers')),
		platforms: () => genericSeeder('platform', () => import('$seedData/platforms'), 'name'),
		achievementGrade: () => genericSeeder('achievementGrade', () => import('$seedData/achievementGrade'))
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
