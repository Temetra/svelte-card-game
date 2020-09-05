import type { Card } from "@/modules/Cards";
import { Suit, Rank } from "@/modules/Cards";
import { Combination, getBestCombination } from "@/modules/Game/Scoring";

test("Nothing", () => {
	let hand: Card[] = [
		{ rank: Rank.Jack, suit: Suit.Clubs },
		{ rank: Rank.Three, suit: Suit.Clubs },
		{ rank: Rank.Five, suit: Suit.Hearts },
		{ rank: Rank.Eight, suit: Suit.Spades },
		{ rank: Rank.Nine, suit: Suit.Spades },
	];

	let result = getBestCombination(hand);

	expect(result.combination).toBe(Combination.Nothing);
	expect(result.cards).toStrictEqual(null);
});

test("Two pairs", () => {
	let hand: Card[] = [
		{ rank: Rank.Jack, suit: Suit.Clubs },
		{ rank: Rank.Jack, suit: Suit.Diamonds },
		{ rank: Rank.Five, suit: Suit.Hearts },
		{ rank: Rank.Five, suit: Suit.Spades },
		{ rank: Rank.Nine, suit: Suit.Spades },
	];

	let result = getBestCombination(hand);

	expect(result.combination).toBe(Combination.TwoPairs);
	expect(result.cards.length).toBe(4);
});

test("Three of a kind", () => {
	let hand: Card[] = [
		{ rank: Rank.Five, suit: Suit.Clubs },
		{ rank: Rank.Two, suit: Suit.Spades },
		{ rank: Rank.Five, suit: Suit.Diamonds },
		{ rank: Rank.Five, suit: Suit.Hearts },
		{ rank: Rank.Three, suit: Suit.Spades },
	];

	let result = getBestCombination(hand);

	expect(result.combination).toBe(Combination.ThreeOfAKind);
	expect(result.cards.length).toBe(3);
});

test("Three of a kind (3 cards)", () => {
	let hand: Card[] = [
		{ rank: Rank.Five, suit: Suit.Clubs },
		{ rank: Rank.Five, suit: Suit.Diamonds },
		{ rank: Rank.Five, suit: Suit.Hearts },
	];

	let result = getBestCombination(hand);

	expect(result.combination).toBe(Combination.ThreeOfAKind);
	expect(result.cards.length).toBe(3);
});

test("Full house", () => {
	let hand: Card[] = [
		{ rank: Rank.Five, suit: Suit.Clubs },
		{ rank: Rank.Five, suit: Suit.Diamonds },
		{ rank: Rank.Five, suit: Suit.Hearts },
		{ rank: Rank.Two, suit: Suit.Spades },
		{ rank: Rank.Two, suit: Suit.Clubs },
	];

	let result = getBestCombination(hand);

	expect(result.combination).toBe(Combination.FullHouse);
	expect(result.cards.length).toBe(5);
});

test("Four of a kind", () => {
	let hand: Card[] = [
		{ rank: Rank.Five, suit: Suit.Clubs },
		{ rank: Rank.Five, suit: Suit.Diamonds },
		{ rank: Rank.Five, suit: Suit.Hearts },
		{ rank: Rank.Five, suit: Suit.Spades },
		{ rank: Rank.Two, suit: Suit.Spades },
	];

	let result = getBestCombination(hand);

	expect(result.combination).toBe(Combination.FourOfAKind);
	expect(result.cards.length).toBe(4);
});

test("Four of a kind with 1 joker", () => {
	let hand: Card[] = [
		{ rank: Rank.Five, suit: Suit.Clubs },
		{ rank: Rank.Five, suit: Suit.Diamonds },
		{ rank: Rank.Five, suit: Suit.Hearts },
		{ rank: Rank.Five, suit: Suit.Spades },
		{ rank: Rank.Ace, suit: Suit.Joker },
	];

	let result = getBestCombination(hand);

	expect(result.combination).toBe(Combination.FourOfAKind);
	expect(result.cards.length).toBe(4);
});
