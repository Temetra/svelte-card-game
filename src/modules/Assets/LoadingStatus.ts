import { writable } from "svelte/store";

export interface LoadingStatus { 
	name: string, 
	progress: number, 
	total: number 
}

export const loadingStatus = writable<LoadingStatus>(null);