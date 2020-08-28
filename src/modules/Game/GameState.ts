import { writable } from "svelte/store";
import type { Card } from "@/modules/Cards";

export enum GameState {
	Preparing,
	Dealing,
	Ready,
}

export const gameState = writable<GameState>(GameState.Preparing);
export const deck = writable<Card[]>([]);
export const playerOneHand = writable<Card[]>([]);