import { GameState, gameState, playerOneHand } from "@/modules/Game/GameState";
import { resetDeck, shuffleDeck, drawFromDeck } from "@/modules/Game/Deck";
import type { StatefulCard } from "@/modules/Cards";
import { CardState } from "@/modules/Cards";
import { playSound } from "@/modules/Assets";
import { waitFor } from "@/modules/Fetching";
import { randomFromRange } from "@/modules/Rnd";
import * as timing from "@/modules/Game/DealTiming";

// This is a player-triggered action
// Deals a full hand from a freshly shuffled deck
export function requestNewCards() {
	return startDealing()
		.then(dealAllCards)
		.then(animateDealtCard)
		.then(animateDealtCard)
		.then(animateDealtCard)
		.then(animateDealtCard)
		.then(animateDealtCard)
		.then(finishDealing);
}

async function startDealing() {
	// Disable button
	gameState.set(GameState.Dealing);

	// Audio feedback
	playSound("blip");

	// Clear player hand
	playerOneHand.set([]);

	// Some sort of anim prep before dealing
	await waitFor(500);
	resetDeck();
	shuffleDeck();
}

async function dealAllCards() {
	// Draw 5 cards
	let drawn = drawFromDeck(5);

	// Change state of cards
	drawn.map(card => card.state |= CardState.Hidden);

	// Add cards to hand
	playerOneHand.update(hand => {
		hand.push(...drawn);
		return hand;
	});
}

async function animateDealtCard() {
	// Delay before dealing
	await waitFor(randomFromRange(timing.delayFrom, timing.delayTo));

	// Find first hidden card in hand and change state
	playerOneHand.update(hand => {
		let card = hand.find(x => x.state & CardState.Hidden);
		card.state = (card.state &= ~CardState.Hidden) | CardState.Dealing;
		return hand;
	});

	// Audio feedback
	await waitFor(timing.audioDelay);
	playSound("card")
}

async function finishDealing() {
	// Wait for last card to finish animating
	await waitFor(timing.delayFinal);

	// Change state of cards
	playerOneHand.update(hand => {
		hand.map(card => card.state &= ~CardState.Dealing);
		return hand;
	});

	// Enable button
	gameState.set(GameState.Selection);
}
