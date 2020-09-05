import type { Card } from "@/modules/Cards";
import { Suit, Rank } from "@/modules/Cards";
import { Combination, getBestCombination } from "@/modules/Game/Scoring";

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
	expect(result.cards.length).toBe(2);
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
	expect(result.cards.length).toBe(4);
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
	expect(result.cards.length).toBe(3);
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
	expect(result.cards.length).toBe(3);
});