import { GameState, gameState, playerOneHand, requestNewCards } from "@/modules/Game";
import { CardState } from "@/modules/Cards";

let states: string[] = [];
let unsubGameState;

let hands: string[][] = [];
let unsubHands;

beforeEach(() => {
	if (unsubGameState) unsubGameState();
	gameState.set(GameState.Preparing);
	states = [];
	unsubGameState = gameState.subscribe(x => states.push(GameState[x]));

	if (unsubHands) unsubHands();
	playerOneHand.set([]);
	hands = [];
	unsubHands = playerOneHand.subscribe(x => hands.push(x.map(y => CardState[y.state])));
});

test("requestNewCards", async () => {
	expect(states).toStrictEqual(["Preparing"]);
	expect(hands).toStrictEqual([[]]);
	
	await requestNewCards();
	
	expect(states).toMatchSnapshot();
	expect(hands).toMatchSnapshot();
});
