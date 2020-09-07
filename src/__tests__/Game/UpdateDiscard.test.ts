import { GameState, gameState, playerOneHand, flipCard } from "@/modules/Game";
import { resetDeck, drawFromDeck } from "@/modules/Game/Deck";
import { StatefulCard, Suit, Rank, CardState } from "@/modules/Cards";
import "@/modules/Game/UpdateDiscardState";

let state: GameState;
let stateUnsub;

let cards: StatefulCard[];
let cardsUnsub;

beforeEach(() => {
	if (stateUnsub) stateUnsub();
	if (cardsUnsub) cardsUnsub();

	resetDeck();
	playerOneHand.set(drawFromDeck(5));
	gameState.set(GameState.Selection);

	stateUnsub = gameState.subscribe(x => state = x);
	cardsUnsub = playerOneHand.subscribe(x => cards = x);
});

test("Auto-update gamestate", () => {
	// Check initial state
	expect(state).toBe(GameState.Selection);
	
	expect(cards).toMatchObject<StatefulCard[]>([
		{ suit: Suit.Clubs, rank: Rank.Ace, state: 0 },
		{ suit: Suit.Clubs, rank: Rank.Two, state: 0 },
		{ suit: Suit.Clubs, rank: Rank.Three, state: 0 },
		{ suit: Suit.Clubs, rank: Rank.Four, state: 0 },
		{ suit: Suit.Clubs, rank: Rank.Five, state: 0 },
	]);

	// Flip cards
	flipCard(cards[0]);

	// Check current state
	expect(state).toBe(GameState.Discard);

	expect(cards).toMatchObject<StatefulCard[]>([
		{ suit: Suit.Clubs, rank: Rank.Ace, state: CardState.Flipped },
		{ suit: Suit.Clubs, rank: Rank.Two, state: 0 },
		{ suit: Suit.Clubs, rank: Rank.Three, state: 0 },
		{ suit: Suit.Clubs, rank: Rank.Four, state: 0 },
		{ suit: Suit.Clubs, rank: Rank.Five, state: 0 },
	]);
});
