import { Card, getCardIndex } from "@/modules/Cards/Card";
import { Rank } from "@/modules/Cards/Rank";
import { Suit } from "@/modules/Cards/Suit";
import { compareArrays } from "@/modules/Collections";

export enum Combination {
	Nothing,
	JacksOrBetter,
	TwoPairs,
	ThreeOfAKind,
	Straight,
	Flush,
	FullHouse,
	FourOfAKind,
	StraightFlush,
	RoyalFlush
}

export interface BestCombination {
	combination: Combination;
	cards: Card[]
}

interface GroupedCards extends Array<Array<Card>> {}

const fiveHigh = [Rank.Ace, Rank.Two, Rank.Three, Rank.Four, Rank.Five];
const aceHigh = [Rank.Ace, Rank.Ten, Rank.Jack, Rank.Queen, Rank.King];
const nothing: BestCombination = { 
	combination: Combination.Nothing, 
	cards: null 
};

export function getBestCombination(input: Card[]): BestCombination {
	// Check hand
	if (!handIsValid(input)) return nothing;
	
	// Sort input hand by rank, removing jokers
	let hand = input.filter(x => x.suit != Suit.Joker)
		.sort((a, b) => a.rank - b.rank);

	// Straight and flush results are used for multiple combinations
	let straight = isAcesStraight(hand) || isStraight(hand);
	let flush = isFlush(hand);

	// Check royal/straight flush
	let result = isRoyalFlush(straight, flush) || isStraightFlush(straight, flush);

	// More data is needed
	if (!result) {
		// Group cards by rank to find pairs etc
		let groupedCards = groupCardsByRank(hand);

		// Check remaining combinations
		result = isFourOfAKind(groupedCards)
			|| isFullHouse(groupedCards)
			|| flush
			|| straight
			|| isThreeOfAKind(groupedCards)
			|| isTwoPairs(groupedCards)
			|| isJacksOrBetter(groupedCards)
			|| nothing;
	}

	// Finished
	return result;
}

function handIsValid(hand: Card[]) {
	// Check array
	if (hand == null) return false;

	// Filter jokers, create array of card ids
	let ids = hand.filter(x => x.suit != Suit.Joker)
		.map(x => getCardIndex(x));

	// Check for duplicate cards
	let uniques = new Set(ids);

	// Should have at least 2 cards
	return uniques.size == ids.length && uniques.size >= 2;
}

// Straight = five-high or aces-high
function isAcesStraight(hand: Card[]): BestCombination {
	// Ensure hand is 5 cards
	if (hand.length < 5) return;

	// Get ranks for valid hands
	const handRanks = hand.map(x => x.rank);

	// Check hand
	if (compareArrays(handRanks, fiveHigh) || compareArrays(handRanks, aceHigh)) {
		return {
			combination: Combination.Straight,
			cards: [...hand]
		};
	}
}

// Straight = any five cards of consecutive value, any suit
function isStraight(hand: Card[]): BestCombination {
	// Ensure hand is 5 cards
	if (hand.length < 5) return;

	// Compare to previous card rank
	for (let idx = 1; idx < hand.length; idx++) {
		// Get current rank
		let prev = hand[idx - 1].rank;
		let curr = hand[idx].rank;
		
		// Exit early if current card is not 1 higher than previous
		if (curr - prev != 1) return null;
	}

	// Success
	return {
		combination: Combination.Straight,
		cards: [...hand]
	};
}

// Flush = any five cards of the same suit, any order
function isFlush(hand: Card[]): BestCombination {
	// Ensure hand is 5 cards
	if (hand.length < 5) return;

	// Get suit of first card
	let suit = hand[0].suit;

	// Compare all cards to first
	if (hand.every(x => x.suit == suit)) {
		return {
			combination: Combination.Flush,
			cards: [...hand]
		};
	}
}

// Straight Flush = five consecutive cards of the same suit
function isStraightFlush(straight: BestCombination, flush: BestCombination): BestCombination {
	if (straight && flush) {
		return {
			combination: Combination.StraightFlush,
			cards: straight.cards
		};
	}
}

// Royal Flush = Ten, a Jack, a Queen, a King, and an Ace of the same suit
function isRoyalFlush(straight: BestCombination, flush: BestCombination): BestCombination {
	if (straight && flush && straight.cards[4].rank == Rank.King) {
		return {
			combination: Combination.RoyalFlush,
			cards: straight.cards
		};
	}
}

// Four of a Kind = four cards of the same value
function isFourOfAKind(groupedCards: GroupedCards): BestCombination {
	if (groupedCards[0].length == 4) {
		return {
			combination: Combination.FourOfAKind,
			cards: [...groupedCards[0]]
		};
	}
}

// Full House = a pair and a three of a kind
function isFullHouse(groupedCards: GroupedCards): BestCombination {
	if (groupedCards.length == 2 && groupedCards[0].length == 3 && groupedCards[1].length == 2) {
		return {
			combination: Combination.FullHouse,
			cards: [...groupedCards[0], ...groupedCards[1]]
		};
	}
}

// Three of a Kind = three cards same value
function isThreeOfAKind(groupedCards: GroupedCards): BestCombination {
	if (groupedCards[0].length == 3) {
		return {
			combination: Combination.ThreeOfAKind,
			cards: [...groupedCards[0]]
		};
	}
}

// Two Pair = a pair is two cards with same value, two pairs
function isTwoPairs(groupedCards: GroupedCards): BestCombination {
	if (groupedCards.length >= 2 && groupedCards[0].length == 2 && groupedCards[1].length == 2) {
		return {
			combination: Combination.TwoPairs,
			cards: [...groupedCards[0], ...groupedCards[1]]
		};
	}
}

// Jacks or Better = a pair of high cards (J/Q/K/A)
function isJacksOrBetter(groupedCards: GroupedCards): BestCombination {
	if (groupedCards[0].length == 2) {
		let firstCardRank = groupedCards[0][0].rank;
		if (firstCardRank >= Rank.Jack || firstCardRank == Rank.Ace) {
			return {
				combination: Combination.JacksOrBetter,
				cards: [...groupedCards[0]]
			};
		}
	} 
}

// Groups cards by counting same ranks, sorted by most to least frequent
function groupCardsByRank(hand: Card[]): GroupedCards {
	let result: GroupedCards = [];
	
	for (let card of hand) {
		let existing = result.find(x => x[0].rank == card.rank);
		if (existing) existing.push(card);
		else result.push([card]);
	}
	
	return result.sort((a, b) => b.length - a.length);
}

export const scoringInternal = {
	handIsValid, 
	isAcesStraight, 
	isStraight, 
	isFlush, 
	isStraightFlush, 
	isRoyalFlush, 
	isFourOfAKind, 
	isFullHouse, 
	isThreeOfAKind, 
	isTwoPairs,
	isJacksOrBetter,
	groupCardsByRank
};