import { writable } from 'svelte/store';
import type { Icon } from '$types/clientTypes';

export const pageTitle = writable('');
export const pageIcon = writable<Icon>();
