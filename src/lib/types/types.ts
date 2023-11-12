import type { ListTodo } from 'lucide-svelte';

export type Icon = typeof ListTodo;

export interface GeneralDropdownData {
	label: string;
	value: number;
}


export interface Area {
	id: number;
	title: string;
	description: string;
	image: FileList | undefined;
	imageSrc: string;
}

export type ParentArea = Area & { children: Area[] };

export type AreaInput = ParentArea | Area;

export interface CollectibleType {
	id: number;
	title: string;
	description: string;
	image: FileList | undefined;
	imageSrc: string;
}

export interface Collectible {
	collectibleTypeId: number;
	totalAmount: number;
	localId: number;
}
export type CollectibleWithAreaId = Collectible & { areaId: number };
