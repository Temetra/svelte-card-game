import { writable, derived } from "svelte/store";
import type { StatefulCard, BestCombination } from "@/modules/Cards";

export enum GameState {
	Preparing,	// loading content
	Ready,		// waiting for player to start new hand
	Dealing,	// animating new hand being dealt
	Selection,	// player choosing cards to discard
	Discard, 	// player has chosen cards to discard
	Drawing,	// animating drawing of replacement cards
	Summary,	// summary of hand, table of results etc
	Clearing	// animating summary/cards being cleared off screen
}

export const gameState = writable<GameState>(GameState.Preparing);
export const deck = writable<StatefulCard[]>([]);
export const playerOneHand = writable<StatefulCard[]>([]);
export const playerOneScore = writable<BestCombination>(null);
export const gameStateAndHand = derived([gameState, playerOneHand], stores => stores);
