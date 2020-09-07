import { playerOneHand, gameState, GameState } from "@/modules/Game/GameState";
import type { StatefulCard } from "@/modules/Cards";
import { CardState } from "@/modules/Cards";
import { playSound } from "@/modules/Assets";

// Player can discard a card by flipping it
export function flipCard(target: StatefulCard) {
	// Audio feedback
	playSound("card");

	// Test for gamestate change later
	let flippedCards = false;
	
	// Update hand
	playerOneHand.update(hand => {
		// Find card and toggle flip
		let card = hand.find(x => x == target);
		card.state ^= CardState.Flipped;

		// Check for flipped cards
		flippedCards = hand.filter(x => (x.state & CardState.Flipped) != 0).length > 0;

		// Update finished
		return hand;
	});

	// If cards are flipped, update gamestate
	if (flippedCards) gameState.set(GameState.Discard);
	else gameState.set(GameState.Selection);
}