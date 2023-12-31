export type Collectible = {
  collectibleTypeId: number;
  totalAmount: number;
  localId: number;
}
export type CollectibleWithAreaId = Collectible & { areaId: number };
