import { writable } from "svelte/store";
import type { StatefulCard } from "@/modules/Cards";
import { Suits, Ranks } from "@/modules/Cards";

const deck = writable<StatefulCard[]>([]);

export function resetDeck(): void {
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

export function shuffleDeck(): void {
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

export function drawFromDeck(count: number):  StatefulCard[] {
	let drawn: StatefulCard[] = [];

	deck.update(cards => {
		if (count > 0 && count <= cards.length) {
			drawn = cards.splice(0, count);
		}
		return cards;
	});

	return drawn;
}
