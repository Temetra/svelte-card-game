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

	expect(result.cards).toStrictEqual([
		{ rank: Rank.Jack, suit: Suit.Clubs },
		{ rank: Rank.Jack, suit: Suit.Diamonds },
	]);
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

	expect(result.cards).toStrictEqual([
		{ rank: Rank.Jack, suit: Suit.Clubs },
		{ rank: Rank.Jack, suit: Suit.Diamonds },
	]);
});

test("Jacks or better with jacks and jokers", () => {
	let hand: Card[] = [
		{ rank:Rank.Ace, suit:Suit.Joker },
		{ rank:Rank.Jack, suit:Suit.Spades },
		{ rank:Rank.Ace, suit:Suit.Joker },
		{ rank:Rank.Jack, suit:Suit.Diamonds },
		{ rank:Rank.King, suit:Suit.Clubs },
	];

	let result = getBestCombination(hand);

	expect(result.combination).toBe(Combination.JacksOrBetter);

	expect(result.cards).toStrictEqual([
		{ rank: Rank.Jack, suit: Suit.Spades },
		{ rank: Rank.Jack, suit: Suit.Diamonds },
	]);
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

	expect(result.cards).toStrictEqual([
		{ rank: Rank.Queen, suit: Suit.Clubs },
		{ rank: Rank.Queen, suit: Suit.Diamonds },
	]);
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

	expect(result.cards).toStrictEqual([
		{ rank: Rank.Ace, suit: Suit.Hearts },
		{ rank: Rank.Ace, suit: Suit.Spades },
	]);
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

	expect(result.cards).toStrictEqual([
		{ rank: Rank.Five, suit: Suit.Hearts },
		{ rank: Rank.Five, suit: Suit.Spades },
		{ rank: Rank.Jack, suit: Suit.Clubs },
		{ rank: Rank.Jack, suit: Suit.Diamonds },
	]);
});

test("Two pairs with a joker", () => {
	let hand: Card[] = [
		{ rank: Rank.Jack, suit: Suit.Clubs },
		{ rank: Rank.Jack, suit: Suit.Diamonds },
		{ rank: Rank.Five, suit: Suit.Hearts },
		{ rank: Rank.Five, suit: Suit.Spades },
		{ rank: Rank.Ace, suit: Suit.Joker },
	];

	let result = getBestCombination(hand);

	expect(result.combination).toBe(Combination.TwoPairs);

	expect(result.cards).toStrictEqual([
		{ rank: Rank.Five, suit: Suit.Hearts },
		{ rank: Rank.Five, suit: Suit.Spades },
		{ rank: Rank.Jack, suit: Suit.Clubs },
		{ rank: Rank.Jack, suit: Suit.Diamonds },
	]);
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

	expect(result.cards).toStrictEqual([
		{ rank: Rank.Five, suit: Suit.Clubs },
		{ rank: Rank.Five, suit: Suit.Diamonds },
		{ rank: Rank.Five, suit: Suit.Hearts },
	]);
});

test("Three of a kind (3 cards)", () => {
	let hand: Card[] = [
		{ rank: Rank.Five, suit: Suit.Clubs },
		{ rank: Rank.Five, suit: Suit.Diamonds },
		{ rank: Rank.Five, suit: Suit.Hearts },
	];

	let result = getBestCombination(hand);

	expect(result.combination).toBe(Combination.ThreeOfAKind);

	expect(result.cards).toStrictEqual([
		{ rank: Rank.Five, suit: Suit.Clubs },
		{ rank: Rank.Five, suit: Suit.Diamonds },
		{ rank: Rank.Five, suit: Suit.Hearts },
	]);
});

test("Three of a kind with jokers", () => {
	let hand: Card[] = [
		{ rank: Rank.Five, suit: Suit.Clubs },
		{ rank: Rank.Ace, suit: Suit.Joker },
		{ rank: Rank.Five, suit: Suit.Diamonds },
		{ rank: Rank.Five, suit: Suit.Hearts },
		{ rank: Rank.Ace, suit: Suit.Joker },
	];

	let result = getBestCombination(hand);

	expect(result.combination).toBe(Combination.ThreeOfAKind);

	expect(result.cards).toStrictEqual([
		{ rank: Rank.Five, suit: Suit.Clubs },
		{ rank: Rank.Five, suit: Suit.Diamonds },
		{ rank: Rank.Five, suit: Suit.Hearts },
	]);
});

test("Three of a kind with 1 joker", () => {
	let hand: Card[] = [
		{ rank: Rank.Five, suit: Suit.Clubs },
		{ rank: Rank.Ace, suit: Suit.Joker },
		{ rank: Rank.Five, suit: Suit.Diamonds },
		{ rank: Rank.Five, suit: Suit.Hearts },
		{ rank: Rank.Ace, suit: Suit.Spades },
	];

	let result = getBestCombination(hand);

	expect(result.combination).toBe(Combination.ThreeOfAKind);

	expect(result.cards).toStrictEqual([
		{ rank: Rank.Five, suit: Suit.Clubs },
		{ rank: Rank.Five, suit: Suit.Diamonds },
		{ rank: Rank.Five, suit: Suit.Hearts },
	]);
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

	expect(result.cards).toStrictEqual([
		{ rank: Rank.Two, suit: Suit.Spades },
		{ rank: Rank.Two, suit: Suit.Clubs },
		{ rank: Rank.Five, suit: Suit.Clubs },
		{ rank: Rank.Five, suit: Suit.Diamonds },
		{ rank: Rank.Five, suit: Suit.Hearts },
	]);
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

	expect(result.cards).toStrictEqual([
		{ rank: Rank.Five, suit: Suit.Clubs },
		{ rank: Rank.Five, suit: Suit.Diamonds },
		{ rank: Rank.Five, suit: Suit.Hearts },
		{ rank: Rank.Five, suit: Suit.Spades },
	]);
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

	expect(result.cards).toStrictEqual([
		{ rank: Rank.Five, suit: Suit.Clubs },
		{ rank: Rank.Five, suit: Suit.Diamonds },
		{ rank: Rank.Five, suit: Suit.Hearts },
		{ rank: Rank.Five, suit: Suit.Spades },
	]);
});

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
test("Straight flush", () => {
	let hand: Card[] = [
		{ rank: Rank.Two, suit: Suit.Spades },
		{ rank: Rank.Three, suit: Suit.Spades },
		{ rank: Rank.Four, suit: Suit.Spades },
		{ rank: Rank.Five, suit: Suit.Spades },
		{ rank: Rank.Ace, suit: Suit.Spades },
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
