import { GameState, gameState, playerOneHand } from "@/modules/Game/GameState";

export function finishHand() {
	playerOneHand.set([]);
	gameState.set(GameState.Ready);
}