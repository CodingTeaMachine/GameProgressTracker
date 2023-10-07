import prisma from '$lib/server/prisma';

interface SeederList {
	[key: string]: () => Promise<void>;
}

const seedResults: { [key: string]: number }[] = [];
let seeders: SeederList = {};
let is_debug = false;
let is_clear_mode = false;

export function setDebugMode(isDebugMode: boolean) {
	is_debug = isDebugMode;
}

export function setClearMode(isClearMode: boolean) {
	is_clear_mode = isClearMode;
}

export function setSeeders(seederList: SeederList) {
	seeders = seederList;
}

export async function genericSeeder(
	model: string,
	collectionImportFunction: () => Promise<{ default: object[] }>
): Promise<void> {
	return collectionImportFunction().then(async ({ default: seedData }) => {
		let effectedRecords = 0;

		if (is_clear_mode) {
			console.log('Cleaning table: ' + model);
			try {
				// @ts-ignore
				await prisma[model].deleteMany({});
				console.log('Cleaned table: ' + model);
			} catch (error) {
				console.log('Error dropping table: ' + model, { error });
			}
		}

		for (const item of seedData) {
			const recordToInsert = { ...item };
			// @ts-ignore
			await prisma[model]
				.upsert({
					where: recordToInsert,
					update: { ...recordToInsert, deleted: false },
					create: recordToInsert
				})
				.then((createdRecord: object) => {
					if (is_debug) {
						console.log(`Created ${model}:`, createdRecord);
					}

					effectedRecords++;
				})
				.catch((error: Error) => {
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

export async function storefrontSeeder() {
	let effectedRecords = 0;
	const { default: storeFronts } = await import('$seedData/storefronts');

	if (is_clear_mode) {
		console.log('Cleaning table: storefront');
		try {
			// @ts-ignore
			await prisma.storefront.deleteMany({});
			console.log('Cleaned table: storefront');
		} catch (error) {
			console.log('Error dropping table: storefront', { error });
		}
	}

	for (const storeFront of storeFronts) {
		await prisma.storefront
			.upsert({
				where: {
					name: storeFront.name
				},
				update: { ...storeFront, deleted: false },
				create: storeFront
			})
			.then(createdRecord => {
				if (is_debug) {
					console.log(`Created storefront:`, createdRecord);
				}

				effectedRecords++;
			})
			.catch((error: Error) => {
				console.log(`😭 Error creating storefront: `, { item: storeFront, error });
			});
	}

	console.log(`✨ Finished seeding table: storefront ✨`);
	seedResults.push({ storefront: effectedRecords });
}
