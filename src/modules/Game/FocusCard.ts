import { playerOneHand } from "@/modules/Game/GameState";
import type { Card } from "@/modules/Cards";
import { CardState } from "@/modules/Cards";

// Interaction function
// Toggles the focus state for a card, which highlights it for the player
export function focusCard({target, enter}: {target:Card, enter:boolean}) {
	playerOneHand.update(hand => {
		let card = hand.find(x => x == target);
		if (enter) card.state |= CardState.Focused;
		else card.state &= ~CardState.Focused;
		return hand;
	});
}