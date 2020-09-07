import { GameState, gameState, deck, playerOneHand } from "@/modules/Game/GameState";
import type { StatefulCard } from "@/modules/Cards";
import { CardState } from "@/modules/Cards";
import { playSound } from "@/modules/Assets";
import { waitFor } from "@/modules/Fetching";

export function discardAndDraw() {
	return startDiscarding()
		.then(replaceCard)
		.then(replaceCard)
		.then(replaceCard)
		.then(replaceCard)
		.then(replaceCard)
		.then(finishDiscarding);
}

async function startDiscarding() {
	// Disable button
	gameState.set(GameState.Drawing);

	// Audio feedback
	playSound("blip");

	// Some sort of anim prep before dealing
	await waitFor(500);
}

async function replaceCard() {
	let card: StatefulCard;
	let drawn: StatefulCard;
	
	playerOneHand.update(hand => {
		card = hand.find(x => (x.state & CardState.Flipped) != 0);
		if (card) card.state = (card.state &= ~CardState.Flipped) | CardState.Hidden;
		return hand;
	});

	if (card) {
		// Some sort of anim prep before dealing
		await waitFor(250);

		// Draw a card
		deck.update(cards => {
			drawn = cards.shift();
			return cards;
		});

		// Update hand
		playerOneHand.update(hand => {
			drawn.state = CardState.Dealing;
			let idx = hand.indexOf(card);
			hand[idx] = drawn;
			return hand;
		});

		// Some sort of anim prep before dealing
		await waitFor(250);
	}
}

async function finishDiscarding() {
	gameState.set(GameState.Summary);
}