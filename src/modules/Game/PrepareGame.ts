import { GameState, gameState } from "@/modules/Game/GameState";
import { prepareAudio, prepareCardGraphics, prepareText } from "@/modules/Assets";

// Called when App is mounted
// Loads assets and enables interface
export async function prepareGame() {
	await prepareAudio();
	await prepareCardGraphics();
	await prepareText();
	gameState.set(GameState.Ready);
}