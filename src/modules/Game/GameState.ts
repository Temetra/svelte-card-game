import { writable } from "svelte/store";
import type { StatefulCard } from "@/modules/Cards";

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