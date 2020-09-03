import type { Card } from "@/modules/Cards";
import { Rank } from "@/modules/Cards";

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

interface CardsByRank {
	rank: Rank;
	cards: Card[];
}

export function getBestCombination(input: Card[]): BestCombination {
	let nothing: BestCombination = { combination: Combination.Nothing, cards: null };
	
	if (!handIsValid(input)) return nothing;

	// Sort input hand by rank
	let hand = [...input].sort((a, b) => a.rank - b.rank);

	// Group cards by rank to find pairs etc
	let rankCounts = groupCardsByRank(hand);

	// Just card counts to simplify array comparison
	let rawCounts = rankCounts.map(x => x.cards.length);

	// Straight and flush results are used for multiple combinations
	let straight = isStraight(hand);
	let flush = isFlush(hand);

	return isRoyalFlush(flush)
		|| isStraightFlush(straight, flush)
		|| isFourOfAKind(rankCounts, rawCounts)
		|| isFullHouse(hand, rawCounts)
		|| flush
		|| straight
		|| isThreeOfAKind(rankCounts, rawCounts)
		|| isTwoPairs(rankCounts, rawCounts)
		|| isJacksOrBetter(rankCounts)
		|| nothing;
}

export function handIsValid(hand: Card[]) {
	let ids = hand.map(x => x.suit + x.rank);
	let uniques = new Set(ids);
	return uniques.size == hand.length && hand.length == 5;
}

// Straight = any five cards of consecutive value, any suit
function isStraight(hand: Card[]): BestCombination {
	// Get first card rank as number
	let prev = hand[0].rank as number;
	
	// Exit early if current card is not 1 higher than previous
	for (let idx = 1; idx < hand.length; idx++) {
		let curr = hand[idx].rank as number;
		if (curr - prev != 1) return null;
		prev = curr;
	}

	// Success
	return {
		combination: Combination.Straight,
		cards: [...hand]
	};
}

// Flush = any five cards of the same suit, any order
function isFlush(hand: Card[]): BestCombination {
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
const royalFlushTarget = [Rank.Ace, Rank.Ten, Rank.Jack, Rank.Queen, Rank.King];
function isRoyalFlush(flush: BestCombination): BestCombination {
	if (flush) {
		let match = compareArrays(flush.cards.map(x => x.rank), royalFlushTarget);
		
		if (match) {
			return {
				combination: Combination.RoyalFlush,
				cards: flush.cards
			};
		}
	}
}

// Four of a Kind = four cards of the same value
function isFourOfAKind(rankCounts: CardsByRank[], rawCounts: number[]): BestCombination {
	if (compareArrays(rawCounts, [4,1])) {
		return {
			combination: Combination.FourOfAKind,
			cards: [...rankCounts[0].cards]
		};
	}
}

// Full House = a pair and a three of a kind
function isFullHouse(hand: Card[], rawCounts: number[]): BestCombination {
	if (compareArrays(rawCounts, [3,2])) {
		return {
			combination: Combination.FullHouse,
			cards: [...hand]
		};
	}
}

// Three of a Kind = three cards same value
function isThreeOfAKind(rankCounts: CardsByRank[], rawCounts: number[]): BestCombination {
	if (compareArrays(rawCounts, [3,1,1])) {
		return {
			combination: Combination.ThreeOfAKind,
			cards: [...rankCounts[0].cards]
		};
	}
}

// Two Pair = a pair is two cards with same value, two pairs
function isTwoPairs(rankCounts: CardsByRank[], rawCounts: number[]): BestCombination {
	if (compareArrays(rawCounts, [2,2,1])) {
		return {
			combination: Combination.TwoPairs,
			cards: [...rankCounts[0].cards, ...rankCounts[1].cards]
		};
	}
}

// Jacks or Better = a pair, restricted to Jacks or higher
function isJacksOrBetter(rankCounts: CardsByRank[]): BestCombination {
	if (rankCounts[0].cards.length == 2 && rankCounts[0].rank >= Rank.Jack) {
		return {
			combination: Combination.JacksOrBetter,
			cards: [...rankCounts[0].cards]
		};
	}
}

export function groupCardsByRank(arr: Card[]): CardsByRank[] {
	let result: CardsByRank[] = [];
	
	for (let value of arr) {
		let existing = result.find(x => x.rank == value.rank);
		if (existing) existing.cards.push(value);
		else result.push({ rank:value.rank, cards:[value] });
	}
	
	return result.sort((a, b) => b.cards.length - a.cards.length);
}

function compareArrays<T>(first: T[], second: T[]) {
	return first.length == second.length 
		&& first.every((value, index) => value === second[index]);
}
