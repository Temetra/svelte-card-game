import { playerOneHand } from "@/modules/Game/GameState";
import type { Card } from "@/modules/Cards";
import { CardState } from "@/modules/Cards";

export function focusCard({target, enter}: {target:Card, enter:boolean}) {
	// Find card in hand and set state
	playerOneHand.update(hand => {
		let card = hand.find(x => x == target);
		if (enter) card.state |= CardState.Focused;
		else card.state &= ~CardState.Focused;
		return hand;
	});
}