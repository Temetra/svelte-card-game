import { GameState, gameState, playerOneHand, playerOneScore } from "@/modules/Game/GameState";
import { BestCombination, Combination } from "@/modules/Game/Scoring";
import { Suit, Rank, CardState, Card } from "@/modules/Cards";
import "@/modules/Game/UpdateCombo";

let score: BestCombination;
let scoreUnsub;

beforeEach(() => {
	if (scoreUnsub) scoreUnsub();
	score = null;
	playerOneHand.set([]);
	playerOneScore.set(null);
	scoreUnsub = playerOneScore.subscribe(x => score = x);
});

test("Combo store auto-updating", () => {
	let cards = [
		{ rank:Rank.Five, suit:Suit.Clubs, state:0 },
		{ rank:Rank.Five, suit:Suit.Diamonds, state:0 },
		{ rank:Rank.Queen, suit:Suit.Hearts, state:0 },
		{ rank:Rank.Queen, suit:Suit.Spades, state:0 },
		{ rank:Rank.Seven, suit:Suit.Clubs, state:0 },
	];

	// Check score is null
	expect(score).toStrictEqual(null);

	// Set cards
	playerOneHand.set(cards);

	// Score should still be null
	expect(score).toStrictEqual(null);

	// Change gamestate
	gameState.set(GameState.Selecting);

	// Check score
	expect(score.combination).toStrictEqual(Combination.TwoPairs);
	expect(score.cards).toMatchObject<Card[]>([
		{ rank:Rank.Five, suit:Suit.Clubs },
		{ rank:Rank.Five, suit:Suit.Diamonds },
		{ rank:Rank.Queen, suit:Suit.Hearts },
		{ rank:Rank.Queen, suit:Suit.Spades },
	]);
});

test("Combo score changing on card flip", () => {
	let cards = [
		{ rank:Rank.Five, suit:Suit.Clubs, state:0 },
		{ rank:Rank.Five, suit:Suit.Diamonds, state:0 },
		{ rank:Rank.Queen, suit:Suit.Hearts, state:0 },
		{ rank:Rank.Queen, suit:Suit.Spades, state:0 },
		{ rank:Rank.Seven, suit:Suit.Clubs, state:0 },
	];

	// Set up
	playerOneHand.set(cards);
	gameState.set(GameState.Selecting);

	// Change card
	playerOneHand.update(x => {
		x[0].state ^= CardState.Flipped;
		return x;
	});

	// Score should be two queens
	expect(score.combination).toStrictEqual(Combination.JacksOrBetter);
	expect(score.cards).toMatchObject<Card[]>([
		{ rank:Rank.Queen, suit:Suit.Hearts },
		{ rank:Rank.Queen, suit:Suit.Spades },
	]);
});