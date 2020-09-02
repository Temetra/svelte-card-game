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

		switch (card.state) {
			case CardState.Default:
				card.state = CardState.Flipped;
				break;
			case CardState.Flipped:
				card.state = CardState.Default;
				break;
			case CardState.Focused:
				card.state = CardState.FlippedFocused;
				break;
			case CardState.FlippedFocused:
				card.state = CardState.Focused;
				break;
			default:
				card.state = CardState.Default;
		}

		return hand;
	});
}