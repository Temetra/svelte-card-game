import { GameState, gameState, deck, playerOneHand } from "@/modules/Game/GameState";
import type { StatefulCard } from "@/modules/Cards";
import { CardState } from "@/modules/Cards";
import { playSound } from "@/modules/Assets";
import { waitFor } from "@/modules/Fetching";
import { randomFromRange } from "@/modules/Rnd";
import * as timing from "@/modules/Game/DealTiming";

// Array to store discarded hands
let discarding: StatefulCard[];

// This is a player-triggered action
// Animates cards being discarded, and draws replacements
export function discardAndDraw() {
	return startDiscarding()
		.then(discardCards)
		.then(dealCards)
		.then(finishDiscarding);
}

async function startDiscarding() {
	// Reset array
	discarding = [];

	// Disable button
	gameState.set(GameState.Drawing);

	// Audio feedback
	playSound("blip");

	// Some sort of anim prep before dealing
	await waitFor(500);
}

async function discardCards() {
	playerOneHand.update(hand => {
		discarding = hand.filter(x => (x.state & CardState.Flipped) != 0);
		discarding.forEach(x => x.state = (x.state &= ~CardState.Flipped) | CardState.Discarding);
		return hand;
	});

	if (discarding) {
		// Audio feedback
		playSound("slide");
	}
}

async function dealCards() {
	for (let card of discarding) {
		await replaceCard(card);
	}
}

async function replaceCard(card: StatefulCard) {
	let drawn: StatefulCard;

	// Delay before dealing
	await waitFor(randomFromRange(timing.delayFrom, timing.delayTo));

	// Draw a card
	deck.update(cards => {
		drawn = cards.shift();
		drawn.state = CardState.Dealing;
		return cards;
	});

	// Update hand
	playerOneHand.update(hand => {
		let idx = hand.indexOf(card);
		hand[idx] = drawn;
		return hand;
	});

	// Audio feedback
	await waitFor(timing.audioDelay);
	playSound("card");
}

async function finishDiscarding() {
	// Wait for last card to finish animating
	await waitFor(timing.delayFinal);

	// Change state of cards
	playerOneHand.update(hand => {
		hand.map(card => card.state &= ~CardState.Dealing);
		return hand;
	});

	// Enable button
	gameState.set(GameState.Summary);
}