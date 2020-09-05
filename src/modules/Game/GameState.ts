import { writable, derived } from "svelte/store";
import type { StatefulCard, BestCombination } from "@/modules/Cards";

export enum GameState {
	Preparing,
	Ready,
	Dealing,
	Selecting,
	Drawing,
	Finished
}

export const gameState = writable<GameState>(GameState.Preparing);
export const deck = writable<StatefulCard[]>([]);
export const playerOneHand = writable<StatefulCard[]>([]);
export const playerOneScore = writable<BestCombination>(null);
export const gameStateAndHand = derived([gameState, playerOneHand], stores => stores);