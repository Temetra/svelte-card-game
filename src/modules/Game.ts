import { Card, State } from "./Cards";
import { Suits, Ranks, State as CardState } from "./Cards";
import { waitFor } from "./Fetching";
import { playSound } from "./Audio";
import { controlsEnabled, deck, playerOneHand } from "@/stores/datastore";

export async function prepareGame() {
	controlsEnabled.set(true);
}

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
	controlsEnabled.set(false);

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
	// Array to store drawn cards
	let drawn: Card[];

	// Draw 5 cards
	deck.update(cards => {
		drawn = cards.splice(0, 5);
		return cards;
	});

	// Change state of cards
	drawn.map(card => card.state = CardState.Hidden);

	// Add card to hand
	playerOneHand.update(hand => {
		hand.push(...drawn);
		return hand;
	});
}

async function animateDealtCard() {
	const avgDelay = 400;
	const delayDeviation = 25;
	const audioDelay = 0;
	const delayFrom = avgDelay - delayDeviation - audioDelay;
	const delayTo = avgDelay + delayDeviation - audioDelay;

	// Delay before dealing
	await waitFor(randomFromRange(delayFrom, delayTo));

	// Find first hidden card in hand and change state
	playerOneHand.update(hand => {
		hand.find(x => x.state === State.Hidden).state = State.Dealing;
		return hand;
	});

	// Audio feedback
	await waitFor(audioDelay);
	playSound("card")
}

async function finishDealing() {
	// Enable button
	await waitFor(500);
	controlsEnabled.set(true);
}

function randomFromRange(min: number, max: number) : number {
	return Math.random() * (max - min) + min;
}

function resetDeck() {
	// Create new array
	const result: Card[] = [];
	const state = CardState.Default;

	// Iterate over suits and ranks, adding to array
	for (const suit of Suits) {
		for (const rank of Ranks) {
			result.push({ suit, rank, state });
		}
	}

	// Set deck store to array
	deck.set(result);
}

function shuffleDeck() {
	deck.update(array => {
		let currentIndex = array.length;
		let temporaryValue: Card;
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
