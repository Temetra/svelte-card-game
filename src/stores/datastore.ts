// NOTE: Probably a bug - when using livereload, changes to imported 
// .ts files only propagate to importing modules when saved twice

import { writable } from "svelte/store";
import type { Card } from "@/modules/Cards";

export const controlsEnabled = writable(false);
export const deck = writable<Card[]>([]);
export const playerOneHand = writable<Card[]>([]);
export const loading = writable<{ name:string, progress:number, total:number }>(null);