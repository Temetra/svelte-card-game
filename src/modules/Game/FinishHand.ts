import { GameState, gameState, playerOneHand } from "@/modules/Game/GameState";

// This is a player-triggered action
// Clears the hand and sets ready state for a new game
export function finishHand() {
	playerOneHand.set([]);
	gameState.set(GameState.Ready);
}