import type { Icon } from '$types/types.ts';
import type { Pages } from '$types/enums/pages.ts';

export type Link = {
	icon: Icon;
	title: string;
	destination: Pages;
};

export type NavbarLink = Link & {protected: boolean}
