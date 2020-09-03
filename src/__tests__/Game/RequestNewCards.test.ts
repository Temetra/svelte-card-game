import "../Mocks/AudioContext";
import { GameState, gameState, playerOneHand, requestNewCards } from "@/modules/Game";
import { CardState } from "@/modules/Cards";
export{}

let states: GameState[] = [];
let unsubGameState;

let hands: CardState[][] = [];
let unsubHands;

beforeEach(() => {
	if (unsubGameState) unsubGameState();
	gameState.set(GameState.Preparing);
	states = [];
	unsubGameState = gameState.subscribe(x => states.push(x));

	if (unsubHands) unsubHands();
	playerOneHand.set([]);
	hands = [];
	unsubHands = playerOneHand.subscribe(x => hands.push(x.map(y => y.state)));
});

test("requestNewCards", async () => {
	expect(states).toStrictEqual([GameState.Preparing]);
	expect(hands).toStrictEqual([[]]);
	
	await requestNewCards();
	
	expect(states).toStrictEqual([
		GameState.Preparing,
		GameState.Dealing,
		GameState.Selecting
	]);

	// dealAllCards, cards are hidden
	let hand = hands[2];
	expect(hand[0] === CardState.Hidden).toBeTruthy();
	expect(hand[4] === CardState.Hidden).toBeTruthy();

	// animateDealtCard #1, first card is dealing
	hand = hands[3];
	expect(hand[0] === CardState.Dealing).toBeTruthy();
	expect(hand[2] === CardState.Hidden).toBeTruthy();
	expect(hand[4] === CardState.Hidden).toBeTruthy();

	// animateDealtCard #3, 3rd card is dealing
	hand = hands[5];
	expect(hand[0] === CardState.Dealing).toBeTruthy();
	expect(hand[2] === CardState.Dealing).toBeTruthy();
	expect(hand[4] === CardState.Hidden).toBeTruthy();

	// animateDealtCard #5, last card is dealing
	hand = hands[7];
	expect(hand[0] === CardState.Dealing).toBeTruthy();
	expect(hand[2] === CardState.Dealing).toBeTruthy();
	expect(hand[4] === CardState.Dealing).toBeTruthy();

	// finishDealing
	hand = hands[8];
	expect(hand[0] === 0).toBeTruthy();
	expect(hand[2] === 0).toBeTruthy();
	expect(hand[4] === 0).toBeTruthy();
});
