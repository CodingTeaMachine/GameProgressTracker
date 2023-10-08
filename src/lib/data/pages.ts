import {
	ListTodo,
	Library,
	Search,
	Heart,
	BarChart2,
	Plus,
	CircleDotDashed,
	LogIn,
	User2,
	UserPlus2
} from 'lucide-svelte';
import type { Link, NavbarLink } from '$types/page.ts';
import { Pages } from '$types/enums/pages';

export const navbarLinks: NavbarLink[] = [
	{
		title: 'Progress',
		icon: ListTodo,
		destination: Pages.PROGRESS,
		protected: true
	},
	{
		title: 'Library',
		icon: Library,
		destination: Pages.LIBRARY,
		protected: true
	},
	{
		title: 'Explore',
		icon: Search,
		destination: Pages.EXPLORE,
		protected: false
	},
	{
		title: 'Wish List',
		icon: Heart,
		destination: Pages.WISH_LIST,
		protected: true
	},
	{
		title: 'Personal Stats',
		icon: BarChart2,
		destination: Pages.PERSONAL_STATS,
		protected: true
	},
	{
		title: 'New Game',
		icon: Plus,
		destination: Pages.NEW_GAME,
		protected: true
	}
];

export const pages: Link[] = [
	...navbarLinks,
	{
		title: 'GameProgressTracker',
		icon: CircleDotDashed,
		destination: Pages.HOME,
	},
	{
		title: 'Login',
		icon: LogIn,
		destination: Pages.LOGIN,
	},
	{
		title: 'Profile',
		icon: User2,
		destination: Pages.PROFILE,
	},
	{
		title: 'Register',
		icon: UserPlus2,
		destination: Pages.REGISTER,
	}
];
