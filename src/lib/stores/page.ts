import { writable } from 'svelte/store';
import type { Icon } from '$types/types';

export const pageTitle = writable('');
export const pageIcon = writable<Icon>();
