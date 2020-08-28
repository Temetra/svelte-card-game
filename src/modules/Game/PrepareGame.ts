import { GameState, gameState } from "@/modules/Game/GameState";
import { prepareAudio, prepareCardGraphics } from "@/modules/Assets";

// Loads assets and enables interface
export async function prepareGame() {
	await prepareAudio();
	await prepareCardGraphics();
	gameState.set(GameState.Ready);
}