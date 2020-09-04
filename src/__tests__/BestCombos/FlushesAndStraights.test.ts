import type { Card } from "@/modules/Cards";
import { Suit, Rank } from "@/modules/Cards";
import { Combination, getBestCombination } from "@/modules/Game/Scoring";

// Straight = any five cards of consecutive value, any suit
test("Straight", () => {
	let hand: Card[] = [
		{ rank: Rank.Six, suit: Suit.Diamonds },
		{ rank: Rank.Five, suit: Suit.Clubs },
		{ rank: Rank.Eight, suit: Suit.Spades },
		{ rank: Rank.Seven, suit: Suit.Hearts },
		{ rank: Rank.Nine, suit: Suit.Spades },
	];

	let result = getBestCombination(hand);

	expect(result.combination).toBe(Combination.Straight);

	expect(result.cards).toStrictEqual([
		{ rank: Rank.Five, suit: Suit.Clubs },
		{ rank: Rank.Six, suit: Suit.Diamonds },
		{ rank: Rank.Seven, suit: Suit.Hearts },
		{ rank: Rank.Eight, suit: Suit.Spades },
		{ rank: Rank.Nine, suit: Suit.Spades },
	]);
});

// Straight = any five cards of consecutive value, any suit
test("Five-high straight", () => {
	let hand: Card[] = [
		{ rank: Rank.Five, suit: Suit.Spades },
		{ rank: Rank.Four, suit: Suit.Diamonds },
		{ rank: Rank.Three, suit: Suit.Diamonds },
		{ rank: Rank.Two, suit: Suit.Spades },
		{ rank: Rank.Ace, suit: Suit.Hearts },
	];

	let result = getBestCombination(hand);

	expect(result.combination).toBe(Combination.Straight);

	expect(result.cards).toStrictEqual([
		{ rank: Rank.Ace, suit: Suit.Hearts },
		{ rank: Rank.Two, suit: Suit.Spades },
		{ rank: Rank.Three, suit: Suit.Diamonds },
		{ rank: Rank.Four, suit: Suit.Diamonds },
		{ rank: Rank.Five, suit: Suit.Spades },
	]);
});

// Straight = any five cards of consecutive value, any suit
test("Ace-high straight", () => {
	let hand: Card[] = [
		{ rank: Rank.Ace, suit: Suit.Clubs },
		{ rank: Rank.King, suit: Suit.Clubs },
		{ rank: Rank.Queen, suit: Suit.Diamonds },
		{ rank: Rank.Jack, suit: Suit.Spades },
		{ rank: Rank.Ten, suit: Suit.Spades },
	];

	let result = getBestCombination(hand);

	expect(result.combination).toBe(Combination.Straight);

	expect(result.cards).toStrictEqual([
		{ rank: Rank.Ace, suit: Suit.Clubs },
		{ rank: Rank.Ten, suit: Suit.Spades },
		{ rank: Rank.Jack, suit: Suit.Spades },
		{ rank: Rank.Queen, suit: Suit.Diamonds },
		{ rank: Rank.King, suit: Suit.Clubs },
	]);
});

// Flush = any five cards of the same suit, any order
test("Flush", () => {
	let hand: Card[] = [
		{ rank: Rank.Ace, suit: Suit.Diamonds },
		{ rank: Rank.Two, suit: Suit.Diamonds },
		{ rank: Rank.Nine, suit: Suit.Diamonds },
		{ rank: Rank.Seven, suit: Suit.Diamonds },
		{ rank: Rank.Five, suit: Suit.Diamonds },
	];

	let result = getBestCombination(hand);

	expect(result.combination).toBe(Combination.Flush);

	expect(result.cards).toStrictEqual([
		{ rank: Rank.Ace, suit: Suit.Diamonds },
		{ rank: Rank.Two, suit: Suit.Diamonds },
		{ rank: Rank.Five, suit: Suit.Diamonds },
		{ rank: Rank.Seven, suit: Suit.Diamonds },
		{ rank: Rank.Nine, suit: Suit.Diamonds },
	]);
});

// Straight Flush = five consecutive cards of the same suit
test("Five-high straight flush", () => {
	let hand: Card[] = [
		{ rank: Rank.Ace, suit: Suit.Spades },
		{ rank: Rank.Two, suit: Suit.Spades },
		{ rank: Rank.Three, suit: Suit.Spades },
		{ rank: Rank.Four, suit: Suit.Spades },
		{ rank: Rank.Five, suit: Suit.Spades },
	];

	let result = getBestCombination(hand);

	expect(result.combination).toBe(Combination.StraightFlush);

	expect(result.cards).toStrictEqual([
		{ rank: Rank.Ace, suit: Suit.Spades },
		{ rank: Rank.Two, suit: Suit.Spades },
		{ rank: Rank.Three, suit: Suit.Spades },
		{ rank: Rank.Four, suit: Suit.Spades },
		{ rank: Rank.Five, suit: Suit.Spades },
	]);
});

// Royal Flush = Ten, a Jack, a Queen, a King, and an Ace of the same suit
test("Royal flush", () => {
	let hand: Card[] = [
		{ rank: Rank.Ten, suit: Suit.Hearts },
		{ rank: Rank.Jack, suit: Suit.Hearts },
		{ rank: Rank.Queen, suit: Suit.Hearts },
		{ rank: Rank.King, suit: Suit.Hearts },
		{ rank: Rank.Ace, suit: Suit.Hearts },
	];

	let result = getBestCombination(hand);

	expect(result.combination).toBe(Combination.RoyalFlush);

	expect(result.cards).toStrictEqual([
		{ rank: Rank.Ace, suit: Suit.Hearts },
		{ rank: Rank.Ten, suit: Suit.Hearts },
		{ rank: Rank.Jack, suit: Suit.Hearts },
		{ rank: Rank.Queen, suit: Suit.Hearts },
		{ rank: Rank.King, suit: Suit.Hearts },
	]);
});
