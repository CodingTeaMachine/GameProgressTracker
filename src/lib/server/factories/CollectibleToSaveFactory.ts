import type { CollectibleToSave, Collectible } from "$types/domain/collectible";
import type { Factory, Store } from "$types/serverTypes";

export default class CollectibleToSaveFactory implements Factory<CollectibleToSave> {

	private readonly collectableTypeStore: Store<number>;
	private readonly areaStore: Store<number | null>;

	constructor(collectableTypeStore: Store<number>, areaStore: Store<number | null>) {
		this.collectableTypeStore = collectableTypeStore;
		this.areaStore = areaStore;
	}

	async create(gameId: number, collectible: Collectible): Promise<CollectibleToSave> {
		return ({
			game_id: gameId,
			totalAmount: collectible.totalAmount,
			collectible_type_id: await this.collectableTypeStore.get(collectible.collectibleTypeId),
			title: collectible.title,
			description: collectible.description,
			area_id: await this.areaStore.get(collectible.areaId),
		});
	}
}
