import { playerOneHand } from "@/modules/Game/GameState";
import type { StatefulCard } from "@/modules/Cards";
import { CardState } from "@/modules/Cards";
import { playSound } from "@/modules/Assets";

export function flipCard(target: StatefulCard) {
	// Audio feedback
	playSound("card")
	
	// Find card in hand and set state
	playerOneHand.update(hand => {
		let card = hand.find(x => x == target);
		card.state ^= CardState.Flipped;
		return hand;
	});
}