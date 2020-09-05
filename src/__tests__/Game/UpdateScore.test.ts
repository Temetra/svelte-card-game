import { GameState, gameState, playerOneHand, playerOneScore } from "@/modules/Game";
import { Suit, Rank, CardState, Card, BestCombination, Combination } from "@/modules/Cards";
import "@/modules/Game/UpdateScore";

let score: BestCombination;
let scoreUnsub;

beforeEach(() => {
	if (scoreUnsub) scoreUnsub();
	scoreUnsub = null;
	gameState.set(GameState.Preparing);
	playerOneHand.set([]);
	playerOneScore.set(null);
	score = null;
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
		{ rank:Rank.Four, suit:Suit.Diamonds, state:0 },
		{ rank:Rank.Jack, suit:Suit.Spades, state:0 },
		{ rank:Rank.Two, suit:Suit.Diamonds, state:0 },
		{ rank:Rank.Jack, suit:Suit.Diamonds, state:0 },
		{ rank:Rank.King, suit:Suit.Clubs, state:0 },
	];

	// Set up
	playerOneHand.set(cards);
	gameState.set(GameState.Selecting);

	// Change card
	playerOneHand.update(x => {
		x[0].state ^= CardState.Flipped;
		x[2].state ^= CardState.Flipped;
		return x;
	});

	// Score should be two jacks
	expect(score.combination).toStrictEqual(Combination.JacksOrBetter);
	expect(score.cards).toMatchObject<Card[]>([
		{ rank:Rank.Jack, suit:Suit.Spades },
		{ rank:Rank.Jack, suit:Suit.Diamonds },
	]);
});
