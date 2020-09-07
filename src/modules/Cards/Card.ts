import type { Rank } from "@/modules/Cards/Rank";
import type { Suit } from "@/modules/Cards/Suit";
import type { CardState } from "@/modules/Cards/CardState";

export interface Card {
	rank: Rank,
	suit: Suit
}

export interface StatefulCard extends Card {
	state: CardState
}

// Calculates unique index for a card
export function getCardIndex(card: Card);
export function getCardIndex(rank: Rank, suit: Suit);
export function getCardIndex(x: any, y?: any) {
	if (typeof x == "number" && y != null) {
		// Assume func was given rank and suit
		return y * 100 + x;
	}
	else if (typeof x == "object") {
		// Assume x is a card object
		return x.suit * 100 + x.rank;
	}

	return null;
}

// Compares two cards
export function compareCards(first: Card, second: Card) {
	return first.suit != second.suit 
		? first.suit > second.suit 
			? 1 
			: -1
		: first.rank == second.rank
			? 0
			: first.rank > second.rank 
				? 1 
				: -1;
}