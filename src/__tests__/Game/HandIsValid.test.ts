import type { Card } from "@/modules/Cards";
import { Suit, Rank } from "@/modules/Cards";
import { scoringInternal as scoring } from "@/modules/Game/Scoring";

test("Invalid hand, duplicate card", () => {
	let hand: Card[] = [
		{ rank: Rank.Five, suit: Suit.Hearts },
		{ rank: Rank.Eight, suit: Suit.Diamonds },
		{ rank: Rank.Nine, suit: Suit.Spades },
		{ rank: Rank.Jack, suit: Suit.Clubs },
		{ rank: Rank.Jack, suit: Suit.Clubs }, // duplicate card
	];

	expect(scoring.handIsValid(hand)).toBeFalsy();
});

test("Valid hand, 4 cards", () => {
	let hand: Card[] = [
		{ rank: Rank.Five, suit: Suit.Hearts },
		{ rank: Rank.Eight, suit: Suit.Diamonds },
		{ rank: Rank.Nine, suit: Suit.Spades },
		{ rank: Rank.Jack, suit: Suit.Clubs },
	];

	expect(scoring.handIsValid(hand)).toBeTruthy();
});

test("Invalid hand, 1 card", () => {
	let hand: Card[] = [
		{ rank: Rank.Five, suit: Suit.Hearts },
	];

	expect(scoring.handIsValid(hand)).toBeFalsy();
});