import type { Icon } from '$types/clientTypes';
import type { Pages } from '$types/enums/pages';

export type Link = {
	icon: Icon;
	title: string;
	destination: Pages;
};

export type NavbarLink = Link & {protected: boolean}
