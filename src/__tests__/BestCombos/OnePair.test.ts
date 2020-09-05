import type { Card } from "@/modules/Cards";
import { Suit, Rank } from "@/modules/Cards";
import { Combination, getBestCombination } from "@/modules/Game/Scoring";

test("One pair, but not jacks or better", () => {
	let hand: Card[] = [
		{ rank: Rank.Ten, suit: Suit.Clubs },
		{ rank: Rank.Ten, suit: Suit.Diamonds },
		{ rank: Rank.Five, suit: Suit.Hearts },
		{ rank: Rank.Eight, suit: Suit.Spades },
		{ rank: Rank.Nine, suit: Suit.Spades },
	];

	let result = getBestCombination(hand);

	expect(result.combination).toBe(Combination.Nothing);
	expect(result.cards).toStrictEqual(null);
});

test("Jacks or better with jacks (2 cards)", () => {
	let hand: Card[] = [
		{ rank: Rank.Jack, suit: Suit.Clubs },
		{ rank: Rank.Jack, suit: Suit.Diamonds },
	];

	let result = getBestCombination(hand);

	expect(result.combination).toBe(Combination.JacksOrBetter);
	expect(result.cards.length).toBe(2);
});

test("Jacks or better with jacks", () => {
	let hand: Card[] = [
		{ rank: Rank.Five, suit: Suit.Hearts },
		{ rank: Rank.Jack, suit: Suit.Clubs },
		{ rank: Rank.Jack, suit: Suit.Diamonds },
		{ rank: Rank.Eight, suit: Suit.Spades },
		{ rank: Rank.Nine, suit: Suit.Spades },
	];

	let result = getBestCombination(hand);

	expect(result.combination).toBe(Combination.JacksOrBetter);
	expect(result.cards.length).toBe(2);
});

test("Jacks or better with queens", () => {
	let hand: Card[] = [
		{ rank: Rank.Five, suit: Suit.Hearts },
		{ rank: Rank.Eight, suit: Suit.Spades },
		{ rank: Rank.Queen, suit: Suit.Clubs },
		{ rank: Rank.Nine, suit: Suit.Spades },
		{ rank: Rank.Queen, suit: Suit.Diamonds },
	];

	let result = getBestCombination(hand);

	expect(result.combination).toBe(Combination.JacksOrBetter);
	expect(result.cards.length).toBe(2);
});

test("Jacks or better with aces", () => {
	let hand: Card[] = [
		{ rank: Rank.Ace, suit: Suit.Hearts },
		{ rank: Rank.Ace, suit: Suit.Spades },
		{ rank: Rank.Two, suit: Suit.Clubs },
		{ rank: Rank.Three, suit: Suit.Spades },
		{ rank: Rank.Four, suit: Suit.Diamonds },
	];

	let result = getBestCombination(hand);

	expect(result.combination).toBe(Combination.JacksOrBetter);
	expect(result.cards.length).toBe(2);
});

test("Jacks or better (2 kings)", () => {
	let hand: Card[] = [
		{ rank: Rank.King, suit: Suit.Hearts },
		{ rank: Rank.Eight, suit: Suit.Spades },
		{ rank: Rank.King, suit: Suit.Diamonds },
		{ rank: Rank.Three, suit: Suit.Clubs },
		{ rank: Rank.Ace, suit: Suit.Spades },
	];

	let result = getBestCombination(hand);

	expect(result.combination).toBe(Combination.JacksOrBetter);
	expect(result.cards.length).toBe(2);
});