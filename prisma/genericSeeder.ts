import type { SeedDataCollection } from '../src/lib/types/types';
import prisma from '../src/lib/server/prisma';

interface SeederList {
	[key: string]: () => Promise<void>;
}

const seedResults: { [key: string]: number }[] = [];
let seeders: SeederList = {};
let is_debug = false;

export function setDebugMode(isDebugMode: boolean) {
	is_debug = isDebugMode;
}

export function setSeeders(seederList: SeederList) {
	seeders = seederList;
}

export async function genericSeeder(
	model: string,
	collectionImportFunction: any,
	modelAttribute = 'label'
): Promise<void> {
	return collectionImportFunction().then(async ({ default: seedData }: { default: SeedDataCollection }) => {
		let effectedRecords = 0;
		for (const item of seedData) {
			const recordToInsert = { [modelAttribute]: item.name };
			// @ts-ignore
			await prisma[model]
				.upsert({
					where: recordToInsert,
					update: recordToInsert,
					create: recordToInsert
				})
				// @ts-ignore
				.then(createdRecord => {
					if (is_debug) {
						console.log(`Created ${model}:`, createdRecord);
					}

					effectedRecords++;
				})
				.catch((error: any) => {
					console.log(`😭 Error creating ${model}: `, { item, error });
				});
		}
		console.log(`✨ Finished seeding table: ${model} ✨`);
		seedResults.push({ [model]: effectedRecords });
	});
}

export function logResultToConsole() {
	const tableNameLengths = seedResults.flatMap(result => Object.keys(result)).map(result => result.length);

	const longestSeededTableName = Math.max(...tableNameLengths);
	const tableHeaderFirstCol = ' Effected Table ';
	const firstColWidth =
		longestSeededTableName > tableHeaderFirstCol.length ? longestSeededTableName : tableHeaderFirstCol.length;
	const tableHeader = tableHeaderFirstCol.padEnd(firstColWidth) + '|' + ' Number of records effected ';

	console.log();
	console.log(tableHeader);
	console.log(''.padEnd(tableHeader.length, '-'));
	for (const seedResult of seedResults) {
		const [[tableName, effectedRecords]] = Object.entries(seedResult);
		console.log(' ' + tableName.padEnd(firstColWidth - 1, ' ') + ': ' + effectedRecords);
		console.log(''.padEnd(tableHeader.length, '-'));
	}
}

export function runAllSeeders() {
	return Promise.all(Object.values(seeders).map(seeder => seeder()));
}

export function runSpecificSeeders(seedersToRun: string[]) {
	const seederKeys = Object.keys(seeders);
	const filteredSeedersToRun = seedersToRun.filter(arg => seederKeys.includes(arg)).map(arg => seeders[arg]);
	return Promise.all(filteredSeedersToRun.map(seeder => seeder()));
}
