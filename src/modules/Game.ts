import type { Card } from "./Cards";
import { Suits, Ranks } from "./Cards";
import { waitFor } from "./Fetching";
import { playSound } from "./Audio";
import { guiEnabled, deck, playerOneHand } from "@/stores/datastore";

export async function prepareGame() {
	guiEnabled.set(true);
}

export function requestNewCards() {
	return startDealing()
		.then(dealCard)
		.then(dealCard)
		.then(dealCard)
		.then(dealCard)
		.then(dealCard)
		.then(finishDealing);
}

async function startDealing() {
	// Disable button
	guiEnabled.set(false);

	// Audio feedback
	playSound("blip");

	// Clear player hand
	playerOneHand.set([]);

	// Some sort of anim prep before dealing
	await waitFor(500);
	resetDeck();
	shuffleDeck();
}

async function dealCard() {
	const avgDelay = 400;
	const delayDeviation = 25;
	const audioDelay = 200;
	const delayFrom = avgDelay - delayDeviation - audioDelay;
	const delayTo = avgDelay + delayDeviation - audioDelay;
	
	// Delay before dealing
	await waitFor(randomFromRange(delayFrom, delayTo));
	
	// Remove a random card from deck 
	let drawn: Card;
	deck.update(x => {
		drawn = x.shift();
		return x;
	});

	// Add card to hand
	playerOneHand.update(hand => {
		hand.push(drawn);
		return hand;
	});
	
	// Audio feedback
	await waitFor(audioDelay);
	playSound("card")
}

async function finishDealing() {
	// Enable button
	await waitFor(500);
	guiEnabled.set(true);
}

function randomFromRange(min: number, max: number) : number {
	return Math.random() * (max - min) + min;
}

function resetDeck() {
	// Create new array
	const result: Card[] = [];

	// Iterate over suits and ranks, adding to array
	for (const suit of Suits) {
		for (const rank of Ranks) {
			result.push({ suit, rank });
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
