import { GameState, gameState, gameStateAndHand } from "@/modules/Game/GameState";
import type { StatefulCard } from "@/modules/Cards";
import { CardState } from "@/modules/Cards";

// Subscribe to store
gameStateAndHand.subscribe(updateGameState);

// Automatic action, changes gamestate when cards are flipped during selection stage
function updateGameState([state, hand]: [GameState, StatefulCard[]]) {
	if (state == GameState.Selection || state == GameState.Discard) {
		// Check for flipped cards
		let flippedCards = hand.filter(x => (x.state & CardState.Flipped) != 0).length > 0;

		// If cards are flipped, update gamestate
		if (flippedCards) gameState.set(GameState.Discard);
		else gameState.set(GameState.Selection);
	}
}