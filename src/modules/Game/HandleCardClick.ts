import { playerOneHand } from "@/modules/Game/GameState";
import type { Card } from "@/modules/Cards";
import { CardState } from "@/modules/Cards";
import { playSound } from "@/modules/Assets";

// Player clicked on card in hand
export function handleCardClick(event: CustomEvent<Card>) {
	// Audio feedback
	playSound("card")
	
	// Find card in hand and set state to flipped
	playerOneHand.update(hand => {
		let card = hand.find(x => x == event.detail);
		card.state = card.state == CardState.Default ? CardState.Flipped : CardState.Default;
		return hand;
	});
}
