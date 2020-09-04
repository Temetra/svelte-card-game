import { GameState, gameState, deck, playerOneHand } from "@/modules/Game/GameState";
import type { StatefulCard } from "@/modules/Cards";
import { Suits, Ranks, CardState } from "@/modules/Cards";
import { playSound } from "@/modules/Assets";
import { waitFor } from "@/modules/Fetching";

const avgDealDelay = 400;
const dealDelayDeviation = 25;
const audioDelay = 0;

// Array to store drawn cards
let drawn: StatefulCard[];

// Sequence for dealing a hand from a freshly shuffled deck
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
	deck.update(cards => {
		drawn = cards.splice(0, 5);
		return cards;
	});

	// Change state of cards
	drawn.map(card => card.state |= CardState.Hidden);

	// Add cards to hand
	playerOneHand.update(hand => {
		hand.push(...drawn);
		return hand;
	});
}

async function animateDealtCard() {
	const delayFrom = avgDealDelay - dealDelayDeviation - audioDelay;
	const delayTo = avgDealDelay + dealDelayDeviation - audioDelay;

	// Delay before dealing
	await waitFor(randomFromRange(delayFrom, delayTo));

	// Find first hidden card in hand and change state
	playerOneHand.update(hand => {
		let card = hand.find(x => x.state & CardState.Hidden);
		card.state = (card.state &= ~CardState.Hidden) | CardState.Dealing;
		return hand;
	});

	// Audio feedback
	await waitFor(audioDelay);
	playSound("card")
}

async function finishDealing() {
	// Wait for last card to finish animating
	await waitFor(avgDealDelay + dealDelayDeviation);

	// Change state of cards
	playerOneHand.update(hand => {
		hand.map(card => card.state &= ~CardState.Dealing);
		return hand;
	});

	// Enable button
	gameState.set(GameState.Selecting);
}

function randomFromRange(min: number, max: number) : number {
	return Math.random() * (max - min) + min;
}

function resetDeck() {
	// Create new array
	const result: StatefulCard[] = [];

	// Iterate over suits and ranks, adding to array
	for (const suit of Suits) {
		for (const rank of Ranks) {
			result.push({ suit, rank, state: 0 });
		}
	}

	// Set deck store to array
	deck.set(result);
}

function shuffleDeck() {
	deck.update(array => {
		let currentIndex = array.length;
		let temporaryValue: StatefulCard;
		let randomIndex: number;
		
		while (currentIndex != 0) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		
		return array;
	});
}
