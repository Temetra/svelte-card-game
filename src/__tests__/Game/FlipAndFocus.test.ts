import { GameState, gameState, playerOneHand, requestNewCards, discardAndDraw, flipCard, focusCard } from "@/modules/Game";
import { CardState, Suit, Rank, StatefulCard } from "@/modules/Cards";

let cards: StatefulCard[];
let unsubCards;

beforeEach(() => {
	if (unsubCards) unsubCards();
	unsubCards = playerOneHand.subscribe(x => cards = x);
	playerOneHand.set([
		{ suit: Suit.Clubs, rank: Rank.Ace, state: 0 },
		{ suit: Suit.Clubs, rank: Rank.Two, state: 0 },
		{ suit: Suit.Clubs, rank: Rank.Three, state: 0 },
		{ suit: Suit.Clubs, rank: Rank.Four, state: 0 },
		{ suit: Suit.Clubs, rank: Rank.Five, state: 0 },
	]);
});

test("Flip card", async () => {
	flipCard(cards[1]);

	expect(cards).toMatchObject<StatefulCard[]>([
		{ suit: Suit.Clubs, rank: Rank.Ace, state: 0 },
		{ suit: Suit.Clubs, rank: Rank.Two, state: CardState.Flipped },
		{ suit: Suit.Clubs, rank: Rank.Three, state: 0 },
		{ suit: Suit.Clubs, rank: Rank.Four, state: 0 },
		{ suit: Suit.Clubs, rank: Rank.Five, state: 0 },
	]);
});

test("Focus card", async () => {
	focusCard({ target: cards[1], enter: true });

	expect(cards).toMatchObject<StatefulCard[]>([
		{ suit: Suit.Clubs, rank: Rank.Ace, state: 0 },
		{ suit: Suit.Clubs, rank: Rank.Two, state: CardState.Focused },
		{ suit: Suit.Clubs, rank: Rank.Three, state: 0 },
		{ suit: Suit.Clubs, rank: Rank.Four, state: 0 },
		{ suit: Suit.Clubs, rank: Rank.Five, state: 0 },
	]);
});

test("De-focus card", async () => {
	focusCard({ target: cards[1], enter: true });

	expect(cards).toMatchObject<StatefulCard[]>([
		{ suit: Suit.Clubs, rank: Rank.Ace, state: 0 },
		{ suit: Suit.Clubs, rank: Rank.Two, state: CardState.Focused },
		{ suit: Suit.Clubs, rank: Rank.Three, state: 0 },
		{ suit: Suit.Clubs, rank: Rank.Four, state: 0 },
		{ suit: Suit.Clubs, rank: Rank.Five, state: 0 },
	]);

	focusCard({ target: cards[1], enter: false });

	expect(cards).toMatchObject<StatefulCard[]>([
		{ suit: Suit.Clubs, rank: Rank.Ace, state: 0 },
		{ suit: Suit.Clubs, rank: Rank.Two, state: 0 },
		{ suit: Suit.Clubs, rank: Rank.Three, state: 0 },
		{ suit: Suit.Clubs, rank: Rank.Four, state: 0 },
		{ suit: Suit.Clubs, rank: Rank.Five, state: 0 },
	]);
});

test("Focus and flip card", async () => {
	focusCard({ target: cards[1], enter: true });
	flipCard(cards[1]);

	expect(cards).toMatchObject<StatefulCard[]>([
		{ suit: Suit.Clubs, rank: Rank.Ace, state: 0 },
		{ suit: Suit.Clubs, rank: Rank.Two, state: (CardState.Flipped | CardState.Focused) },
		{ suit: Suit.Clubs, rank: Rank.Three, state: 0 },
		{ suit: Suit.Clubs, rank: Rank.Four, state: 0 },
		{ suit: Suit.Clubs, rank: Rank.Five, state: 0 },
	]);
});
