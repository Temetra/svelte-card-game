import { playerOneHand } from "@/modules/Game/GameState";
import type { Card } from "@/modules/Cards";
import { CardState } from "@/modules/Cards";

export function focusCard({target, enter}: {target:Card, enter:boolean}) {
	// Find card in hand and set state
	playerOneHand.update(hand => {
		let card = hand.find(x => x == target);

		switch (card.state) {
			case CardState.Default:
			case CardState.Focused:
				card.state = enter ? CardState.Focused : CardState.Default;
				break;
			case CardState.Flipped:
			case CardState.FlippedFocused:
				card.state = enter ? CardState.FlippedFocused : CardState.Flipped;
				break;
			default:
				card.state = CardState.Default;
		}

		return hand;
	});
}