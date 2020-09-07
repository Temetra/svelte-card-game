import { playerOneHand } from "@/modules/Game/GameState";
import type { StatefulCard } from "@/modules/Cards";
import { CardState } from "@/modules/Cards";
import { playSound } from "@/modules/Assets";

// Interaction function
// Player can choose a card to discard by flipping it
export function flipCard(target: StatefulCard) {
	// Audio feedback
	playSound("card");
	
	// Update hand
	playerOneHand.update(hand => {
		// Find card and toggle flip
		let card = hand.find(x => x == target);
		card.state ^= CardState.Flipped;

		// Update finished
		return hand;
	});
}