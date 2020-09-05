import type { Card } from "@/modules/Cards";
import { Suit, Rank } from "@/modules/Cards";
import { scoringInternal as scoring } from "@/modules/Game/Scoring";
export{}

test("One of each", () => {
	let hand: Card[] = [
		{ rank: Rank.Ace, suit: Suit.Clubs },
		{ rank: Rank.Two, suit: Suit.Clubs },
		{ rank: Rank.Three, suit: Suit.Clubs },
		{ rank: Rank.Four, suit: Suit.Clubs },
		{ rank: Rank.Five, suit: Suit.Clubs },
	];
	
	let result = scoring.groupCardsByRank(hand);

	expect(result.map(x => x.cards.length)).toStrictEqual([1,1,1,1,1]);
});

test("One pair", () => {
	let hand: Card[] = [
		{ rank: Rank.Ace, suit: Suit.Clubs },
		{ rank: Rank.Ace, suit: Suit.Diamonds },
		{ rank: Rank.Three, suit: Suit.Clubs },
		{ rank: Rank.Four, suit: Suit.Clubs },
		{ rank: Rank.Five, suit: Suit.Clubs },
	];
	
	let result = scoring.groupCardsByRank(hand);

	expect(result.map(x => x.cards.length)).toStrictEqual([2,1,1,1]);
});

test("Two pairs", () => {
	let hand: Card[] = [
		{ rank: Rank.Ace, suit: Suit.Clubs },
		{ rank: Rank.Ace, suit: Suit.Diamonds },
		{ rank: Rank.Three, suit: Suit.Hearts },
		{ rank: Rank.Three, suit: Suit.Spades },
		{ rank: Rank.Five, suit: Suit.Clubs },
	];
	
	let result = scoring.groupCardsByRank(hand);

	expect(result.map(x => x.cards.length)).toStrictEqual([2,2,1]);
});

test("Three of a kind", () => {
	let hand: Card[] = [
		{ rank: Rank.Ace, suit: Suit.Clubs },
		{ rank: Rank.Ace, suit: Suit.Diamonds },
		{ rank: Rank.Ace, suit: Suit.Hearts },
		{ rank: Rank.Three, suit: Suit.Spades },
		{ rank: Rank.Five, suit: Suit.Clubs },
	];
	
	let result = scoring.groupCardsByRank(hand);

	expect(result.map(x => x.cards.length)).toStrictEqual([3,1,1]);
});

test("Four of a kind", () => {
	let hand: Card[] = [
		{ rank: Rank.Ace, suit: Suit.Clubs },
		{ rank: Rank.Ace, suit: Suit.Diamonds },
		{ rank: Rank.Ace, suit: Suit.Hearts },
		{ rank: Rank.Ace, suit: Suit.Spades },
		{ rank: Rank.Five, suit: Suit.Clubs },
	];
	
	let result = scoring.groupCardsByRank(hand);

	expect(result.map(x => x.cards.length)).toStrictEqual([4,1]);
});

test("Three of a kind and one pair", () => {
	let hand: Card[] = [
		{ rank: Rank.Ace, suit: Suit.Clubs },
		{ rank: Rank.Ace, suit: Suit.Diamonds },
		{ rank: Rank.Ace, suit: Suit.Hearts },
		{ rank: Rank.Five, suit: Suit.Spades },
		{ rank: Rank.Five, suit: Suit.Clubs },
	];
	
	let result = scoring.groupCardsByRank(hand);

	expect(result.map(x => x.cards.length)).toStrictEqual([3,2]);
});