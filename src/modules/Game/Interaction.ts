import { GameState, gameState, playerOneHand } from "@/modules/Game/GameState";
import { flipCard } from "@/modules/Game/FlipCard";
import { requestNewCards } from "@/modules/Game/RequestNewCards";
import type { Card } from "@/modules/Cards";

let state: GameState;
gameState.subscribe(x => state = x);

let hand: Card[];
playerOneHand.subscribe(x => hand = x);

// Player clicked on card in hand
export function handleCardClick(event: CustomEvent<Card>) {
	if (state == GameState.Selecting) {
		flipCard(event.detail);
	}
}

// Player pressed key on keyboard
export function handleKeyDown(event: KeyboardEvent) {
	if (event.repeat) return;
	
	if (state == GameState.Ready || state == GameState.Selecting) {
		switch (event.code) {
			case "Space": requestNewCards(); break;
			default: break;
		}
	}
	
	if (state == GameState.Selecting) {
		switch (event.code) {
			case "Digit1": flipCard(hand[0]); break;
			case "Digit2": flipCard(hand[1]); break;
			case "Digit3": flipCard(hand[2]); break;
			case "Digit4": flipCard(hand[3]); break;
			case "Digit5": flipCard(hand[4]); break;
			default: break;
		}
	}
}