import { writable } from "svelte/store";
import type { Card } from "@/modules/Cards";

export enum GameState {
	Preparing,
	Ready,
	Dealing,
	Selecting,
	Drawing,
	Finished
}

export const gameState = writable<GameState>(GameState.Preparing);
export const deck = writable<Card[]>([]);
export const playerOneHand = writable<Card[]>([]);