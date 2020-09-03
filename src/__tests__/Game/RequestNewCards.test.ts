import "../Mocks/AudioContext";
import { GameState, gameState, playerOneHand, requestNewCards } from "@/modules/Game";
import type { CardState } from "@/modules/Cards";
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
	
	expect(hands).toMatchSnapshot();
});
